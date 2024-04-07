 
 
use dojo_starter::utils::{mathtools::{Vec2}};
// define the interface
#[dojo::interface]
trait IActions {
    fn login();
    fn start_game(role_category:u32);
    fn giveup_game();
    fn select_next_stage(option:u64);
    fn check_battle_result(opts:Array<Array<Vec2>>,value:u32);
    fn choose_event_bonus(opt:u64,value:Vec2);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use core::nullable::NullableTrait;
    use core::traits::Index;
    use core::dict::Felt252DictTrait;
    use core::clone::Clone;
    use core::option::OptionTrait;
    use core::traits::Into;
    use core::num::traits::one::One;
    
    use super::{IActions};

    use starknet::{ContractAddress, get_caller_address,get_contract_address,get_block_timestamp};
     use dojo_starter::models::{
    user::{User,UserState},
    role::{Role,RoleCategory,RoleTrait},
    enemy::{Enemy,EnemyTrait},
    card::{Card,CardID,CardTarget,CardTrait},
    stage::{StageCategory,StageTrait},
    property::{Property,BaseProperty,PropertyTrait}
    };

    use dojo_starter::utils::{
        random::{RandomTrait},
        mathtools::{Vec2,MathToolsTrait},
        constant::{MAX_STAGE,EventCode}
    };
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        ActionEvent:ActionEvent,
    }
    #[derive(Drop, starknet::Event)]
    struct ActionEvent {
        player: ContractAddress,
        event: EventCode
    }

    // impl: implement functions specified in trait
    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn login(world: IWorldDispatcher) {
       
            let player = get_caller_address();
 
            let user = get!(world, player, (User));

            if(user.state == UserState::None){
                set!(
                    world,
                    (
                        User { player, state: UserState::Free,score:0}
                    )
                );
            }
            emit!(world,ActionEvent { player:player, event:EventCode::Login});
        }

        fn start_game(world:IWorldDispatcher,role_category: u32) {
          
            let player = get_caller_address();

            let mut user:User = get!(world, player, (User));

            assert(user.state == UserState::Free, 'user start game state is wrong');

            user.state = UserState::StageBegin;
        
            let seed = RandomTrait::create_random_seed(get_contract_address().into(),get_block_timestamp().into(),player.into());
        
            let mut role = RoleTrait::init_role(player,seed,role_category.into());
            role.cur_stage = 0;
            role.stage_category = StageCategory::Normal;

            let mut card_arr:Array<CardID> = CardTrait::create_role_init_card(role_category.into());
            let car_arr_len = card_arr.len();
            let mut i:u32 = 0;
             
            loop{
                if(i >= car_arr_len){
                    break;
                }

                let card:Card = CardTrait::create_role_card(player,i,*card_arr[i]);
                set!(world,(card));
                i +=1;
            };

            set!(world,(user));
            set!(world,(role));
            emit!(world,ActionEvent { player:player, event:EventCode::StartGame});
        }

        fn giveup_game(world:IWorldDispatcher){
           
            let player = get_caller_address();

            let mut user:User = get!(world, player, (User));

            assert(user.state == UserState::StageBegin || user.state == UserState::StageEnd, 'user give up state is wrong');

            user.state == UserState::Free;
 

            set!(world,(user));

            let role = get!(world, player, (Role));
     
            let mut i:u256 = role.card_slot;
            let mut p:u256 = 0;
            loop{
                if(MathToolsTrait::pow(2,p) > i){
                    break;
                }
                if(MathToolsTrait::checkbit(i,p) == true){
                    let card:Card = get!(world, (player,p), (Card));
                    delete!(world,(card));
                }
                p += 1;
            };

            delete!(world,(role));

            emit!(world, ActionEvent { player:player, event:EventCode::GiveUpGame});
        }

        fn select_next_stage(world:IWorldDispatcher,option:u64){

            let player = get_caller_address();

            let mut user:User = get!(world, player, (User));

            assert(user.state == UserState::StageEnd, 'select stage state is wrong');
   
            let mut role:Role = get!(world, player, (Role));

            assert(role.cur_stage < MAX_STAGE, 'stage state is wrong');


            let stage_arr = StageTrait::get_stage_category(role.seed,role.cur_stage);
            let mut i = 0;
            let stage_arr_len = stage_arr.len();
            let mut check_select_opt_flag = false;
            loop{
                if(i > stage_arr_len){
                    break;
                }
                if(option == (*stage_arr[i]).into()){
                    check_select_opt_flag = true;
                    break;
                }
            };
            assert(check_select_opt_flag == true, 'select option state is wrong');

            role.stage_category = option.into();
            role.seed = RandomTrait::create_random_seed(role.seed.into(),get_block_timestamp().into(),option.into());
            role.cur_stage +=1;

            user.state = UserState::StageBegin;
            set!(world,(user));
            set!(world,(role));

            emit!(world,ActionEvent { player, event:EventCode::SelectNextStage});
        }

        fn check_battle_result(world:IWorldDispatcher,opts:Array<Array<Vec2>>,value:u32){

            let player = get_caller_address();

            let mut user:User = get!(world, player, (User));
            assert(user.state == UserState::StageBegin, 'state is wrong');

            let mut role:Role = get!(world, player, (Role));

            assert(role.cur_stage%2 == 0, 'stage category is wrong');

            let round_len = opts.len();
            let mut i = 0;
           // let mut enemies = EnemyTrait::get_enemy_by_stage_id(0);
            let mut enemies:Felt252Dict<Nullable<Enemy>> =  EnemyTrait::get_enemies(role.cur_stage);
            let enemies_len = EnemyTrait::get_enemies_number(role.cur_stage);
            loop{
                if(i >= round_len){
                    break;
                }
                let opt_arr:Array<Vec2> = opts[i].clone();
                let opt_arr_len = opt_arr.len();

                //user action
                let mut j = 0;
                PropertyTrait::round_begin_action(ref role.property);
                loop{
                    if(j >= opt_arr_len){
                        break;
                    }
                    let opt:Vec2 = *opt_arr[j];
                    let card = get!(world, (player,opt.x), (Card));

                    assert(card.id != CardID::None, 'card is void');
                    let energy = CardTrait::get_card_energy(card);

                    assert(role.property.cur_property.energy >= energy, 'energy not enough');

                    
                    role.property.cur_property.energy -= energy;
          
                    let card_target:CardTarget = CardTrait::get_card_target(card);
                    if(card_target == CardTarget::Self){
                            CardTrait::calculate_card(ref role.property,ref role.property,card);   
                    }else if (card_target == CardTarget::SingleEnemy){
                        let mut enemy = enemies.get(opt.y.into());
                        assert(enemy.is_null() == false, 'target is void');

                        let mut e1 = enemy.deref();
                        CardTrait::calculate_card(ref role.property,ref e1.property,card);
                        enemies.insert(opt.y.into(),NullableTrait::new(e1));
                    }else if(card_target == CardTarget::Enemies){
                        let mut k = 0;
                        loop{
                            if(k >= enemies_len){
                                break;
                            }
                             
                            let mut enemy = enemies.get(k.into());
                            assert(enemy.is_null() == false, 'target is void');
                            let mut e1 = enemy.deref();
                            if(e1.property.cur_property.hp != 0){
                                CardTrait::calculate_card(ref role.property,ref e1.property,card);
                                enemies.insert(opt.y.into(),NullableTrait::new(e1));
                            }
                            k += 1;
                        }
                    }
                    else{

                    }
                    j += 1;
                };
              
                PropertyTrait::round_end_action(ref role.property);
 
                //enemy action
                let mut k = 0;
                loop{
                    if(k >= enemies_len){
                        break;
                    }
                    let mut enemy = enemies.get(k.into());
                    assert(enemy.is_null() == false, 'target is void');

                    let mut e1 = enemy.deref();
                    if(e1.property.cur_property.hp != 0){
                         PropertyTrait::round_begin_action(ref e1.property);
                        let enemy_card:Card = EnemyTrait::get_enemy_action(i,e1.category);
                        let enemy_card_target:CardTarget = CardTrait::get_card_target(enemy_card);
                        if(enemy_card_target == CardTarget::Self){
                            CardTrait::calculate_card(ref e1.property,ref e1.property,enemy_card);
                        }else{
                            CardTrait::calculate_card(ref e1.property,ref role.property,enemy_card);
                        }
                        PropertyTrait::round_end_action(ref e1.property);
                        enemies.insert(k.into(),NullableTrait::new(e1));
                    }
                    k +=1;
                };
                i +=1;
            };

            if(role.property.cur_property.hp == 0 || role.cur_stage == MAX_STAGE){
                let mut i:u256 = role.card_slot;
                let mut p:u256 = 0;
                loop{
                    if(MathToolsTrait::pow(2,p) > i){
                        break;
                    }
                    if(MathToolsTrait::checkbit(i,p) == true){
                        let card:Card = get!(world, (player,p), (Card));
                        delete!(world,(card));
                    }
                p += 1;
                };

                if(role.cur_stage == MAX_STAGE){
                    user.score += 1;
                }

                user.state == UserState::Free;
                set!(world,(user));
                delete!(world,(role));
            }else{
                user.state == UserState::StageEnd;
                set!(world,(user));
                set!(world,(role));
            }

            emit!(world,ActionEvent { player, event:EventCode::CheckBattleResult});
        }

        fn choose_event_bonus(world:IWorldDispatcher,opt:u64,value:Vec2){

            let player = get_caller_address();

            let mut user:User = get!(world, player, (User));

            assert(user.state == UserState::StageBegin, 'check stage ops state is wrong');

            let mut role:Role = get!(world, player, (Role));

            assert(role.cur_stage%2 != 0, 'stage category is wrong');

            let stage_category:StageCategory = opt.into();
            let stage_arr = StageTrait::get_stage_category(role.seed,role.cur_stage);
            let mut i = 0;
            let mut stage_arr_len = stage_arr.len();
            let mut check_flag = false;
            loop{
                if(i >= stage_arr_len){
                    break;
                }
                if(*stage_arr[i] == stage_category){
                    check_flag = true;
                }
                i +=1;
            };
            assert(check_flag == true, 'event opt is wrong');

            if(stage_category == StageCategory::Camp){
                if(value.x == 0){
                    //rest
                    let add_hp = role.property.cur_property.max_hp/4;
                    if(role.property.cur_property.hp + add_hp >=role.property.cur_property.max_hp){
                        role.property.cur_property.hp = role.property.cur_property.max_hp;
                    }else{
                        role.property.cur_property.hp += add_hp;
                    }
                     
                }else{
                    //upgrade
                    let mut card:Card = get!(world, (player,value.y), (Card));
                    assert(card.id != CardID::None, 'card is void');
                    if(card.id == CardID::InfiniteStrike){
                        card.level += 1;
                    }
                    assert(card.level == 0, 'upgrade card is void');
                    card.level = 1;

                    set!(world,(card));
                }
            }else if(stage_category == StageCategory::Cave){
                if(value.x == 0){
                    //add card
                    let mut i:u32 = 0;
                    let mut card_slot = role.card_slot;
                    loop{
                        let check:bool = MathToolsTrait::checkbit(card_slot,i.into());
                        if(check == false){
                            let card:Card = CardTrait::create_role_card(player,i.into(),value.y.into());
                             set!(world,(card));
                             break;
                        }
                        if(MathToolsTrait::pow(2,i.into()) > card_slot){
                            break;
                        }
                        i +=1;
                    };
                }else{
                    //delete card
                    let mut card_slot = role.card_slot;
                    let check:bool = MathToolsTrait::checkbit(card_slot,value.y.into());
                    assert(check == true, 'delete card is void');
                    card_slot = MathToolsTrait::setbit(card_slot,value.y.into(),false);
                }
            }else if(stage_category == StageCategory::Idol){
                
            }else{

            }
            set!(world,(user));
            set!(world,(role));
            emit!(world,ActionEvent { player, event:EventCode::ChooseEventBonus});
        }
    }
}
 