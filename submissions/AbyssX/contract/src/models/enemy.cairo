use core::clone::Clone;
use core::array::ArrayTrait;
use core::nullable::{NullableTrait, match_nullable, FromNullableResult};
 
use starknet::{ContractAddress, get_caller_address,get_contract_address,get_block_timestamp};

use dojo_starter::models::{property::{Property,BaseProperty,PropertyTrait},card::{Card,CardID,CardTrait}};
use dojo_starter::utils::constant::{MAX_STAGE};

#[derive(Serde, Copy, Drop, Introspect,PartialEq)]
enum EnemyCategory {
    None,
    Goblin,
    Hercules,
    Boss1
}

#[derive(Copy, Drop, Serde)]
struct Enemy {
    id:u32,
    category:EnemyCategory,
    property:Property
}
 

trait EnemyTrait {
    fn init_enemy(id:u32,category:EnemyCategory) -> Enemy;
    fn get_enemy_action(round:u32,category:EnemyCategory)->Card;
    fn get_enemies(stage_process:u32)->Felt252Dict<Nullable<Enemy>>;
    fn get_enemies_number(stage_process:u32)->u32;
}

impl EnemyImpl of EnemyTrait {
    fn init_enemy(id:u32,category:EnemyCategory) -> Enemy{
        let mut enemy = Enemy{
            id:id,
            category:category,
            property:PropertyTrait::init_property(),
        };
        if (category == EnemyCategory::Goblin){
            enemy.property.cur_property.hp = 30;
        }else if(category == EnemyCategory::Hercules){
            enemy.property.cur_property.hp = 50;
        }else if(category == EnemyCategory::Boss1){
            enemy.property.cur_property.hp = 120;
        } 
        else{
            enemy.property.cur_property.hp = 50;
        };
         
        return enemy;
    }
     fn get_enemy_action(round:u32,category:EnemyCategory)->Card{
        if(category == EnemyCategory::Goblin){
            if(round %2 == 0){
                return  CardTrait::create_enemy_card(CardID::Attack,0);
            }else{
                return CardTrait::create_enemy_card(CardID::Defence,0);
            }
        }else if(category == EnemyCategory::Hercules){
            if(round == 0){
                return  CardTrait::create_enemy_card(CardID::BerserkerStance,0);
            }else{
                return CardTrait::create_enemy_card(CardID::Attack,0);
            }
        }else if(category == EnemyCategory::Boss1){
            if(round == 0){
                return  CardTrait::create_enemy_card(CardID::BerserkerStance,0);
            }else{
                if(round %2 == 0){
                    return CardTrait::create_enemy_card(CardID::Attack,0);
                }else{
                    return CardTrait::create_enemy_card(CardID::Defence,0);
                }
            }
        }
        else{
            return CardTrait::create_role_card(get_contract_address(),0,CardID::Attack);
        }
     }
 
    fn get_enemies(stage_process:u32)->Felt252Dict<Nullable<Enemy>>{
        let temp = stage_process %2;
        assert(temp == 0, 'stage process is wrong');
        let mut dict: Felt252Dict<Nullable<Enemy>> = Default::default();
        if (stage_process == MAX_STAGE){
            dict.insert(0,NullableTrait::new(EnemyTrait::init_enemy(0,EnemyCategory::Boss1)));
        }else{
            dict.insert(0,NullableTrait::new(EnemyTrait::init_enemy(0,EnemyCategory::Goblin)));
            dict.insert(1,NullableTrait::new(EnemyTrait::init_enemy(1,EnemyCategory::Goblin)));
            dict.insert(2,NullableTrait::new(EnemyTrait::init_enemy(2,EnemyCategory::Hercules)));
        }
         
         
        return dict;
    }
    fn get_enemies_number(stage_process:u32)->u32{
        let temp = stage_process %2;
        assert(temp == 0, 'stage process is wrong');
        if(stage_process == MAX_STAGE){
            return 1;
        }else{
            return 3;
        }
    }
}

#[cfg(test)]
mod tests {
    use core::dict::Felt252DictTrait;
use core::option::OptionTrait;
use core::traits::TryInto;
use core::nullable::{NullableTrait, match_nullable, FromNullableResult};
    use core::traits::Into;
    use super::{Enemy, EnemyTrait};

    #[test]
    #[available_gas(100000)]
    fn test_get_enemy_by_stage_id() {
       //
     //  let mut enemy_dict = EnemyTrait::get_enemy_by_stage_id(0);
      // let mut val = enemy_dict.get(0);
        
       // assert(val.is_null() == false,'error');
       // let mut dd:Enemy = val.deref();
       // assert(dd.id != 0,'error 2');
       // dd.property.cur_property.hp = 10;
       // enemy_dict.insert(0,NullableTrait::new(dd));

       // val = enemy_dict.get(0);
        
       // dd = val.deref();
       // assert(dd.property.cur_property.hp == 10,'error 3');
    }
 
}
