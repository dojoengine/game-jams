use crate::models::PotionChoice;
use starknet::ContractAddress;

#[starknet::interface]
pub trait IActions<T> {
    fn treat_generator(ref self: T);
    fn potion_brewery(ref self: T, potionMap: PotionChoice);
    fn guzzle_potion(ref self: T, potionMap: PotionChoice);
    fn gameover(ref self: T);
}

#[starknet::interface]
trait IVrfProvider<T> {
    fn request_random(self: @T, caller: ContractAddress, source: Source);
    fn consume_random(ref self: T, source: Source) -> felt252;
}

#[derive(Serde, Copy, Drop, Clone)]
pub enum Source {
    Nonce: ContractAddress,
    Salt: felt252,
}

//Event Defintions
//    #[derive(Serde, Copy, Drop, Introspect)]
//    #[dojo::event]
//    pub struct TreatGenerated {
//  	#[key]
//  	pub player: ContractAddress,
//  	pub treat: TreatType,
//     }

//    #[derive(Serde, Copy, Drop, Introspect)]
//    #[dojo::event]
//    pub struct PotionBrewed {
//  	#[key]
//  	pub player: ContractAddress,
//  	pub potion: PotionChoice,
//  	}

//    #[derive(Serde, Copy, Drop, Introspect)]
//    #[dojo::event]
//    pub struct PotionGuzzled {
//  	#[key]
//  	pub player: ContractAddress,
//  	pub potion: PotionChoice,
//  	}

//    #[derive(Serde, Copy, Drop, Introspect)]
//    #[dojo::event]
//    pub struct GameoverEvent {
//  	#[key]
//  	pub player: ContractAddress,
//  	pub current_pulpy_pumpkin : u32,
//     pub current_choco_skull : u32,
//     pub current_vampire_lollipop : u32,
//    	pub current_ghost_candy : u32,
//  	}




#[dojo::contract]
pub mod actions {
   use dojo::prelude::*;
   use super::{ IActions, IVrfProviderDispatcher, IVrfProviderDispatcherTrait, Source };
   use crate::models::{ PotionChoice, TreatBag, PotionBar };
   use core::num::traits::{SaturatingAdd, SaturatingSub};
   use dojo::model::ModelStorage;
   //use dojo::event::EventStorage;

   const VRF_PROVIDER_ADDRESS: felt252 = 0x15f542e25a4ce31481f986888c179b6e57412be340b8095f72f75a328fbb27b;

   #[abi(embed_v0)]
   impl ActionsImpl of IActions<ContractState> {

    fn treat_generator(ref self: ContractState) {
 	let mut world = self.world_default();
 	let player = starknet::get_caller_address();
 	let mut treatbag : TreatBag = world.read_model(player);

 	let vrf_provider = IVrfProviderDispatcher{contract_address: VRF_PROVIDER_ADDRESS.try_into().unwrap()};
 	let random_value: u256 = vrf_provider.consume_random(Source::Nonce(player)).into();
 	let random_treat: felt252 = (random_value % 12).try_into().unwrap();

 	match random_treat {
 		0 | 1 => {
 				treatbag.choco_skull = treatbag.choco_skull.saturating_add(1);
 				treatbag.latest_treat = 1;
 			},
 		2 | 3 => {
				treatbag.latest_treat = 2;
 			},
 		4 | 5 => {
 				treatbag.vampire_lollipop = treatbag.vampire_lollipop.saturating_add(1);
 				treatbag.latest_treat = 3;
 			},
 		6 | 7 => {
 				treatbag.pulpy_pumpkin = treatbag.pulpy_pumpkin.saturating_add(1);
 				treatbag.latest_treat = 4;
 			},
 		8 | 9 => {
 				treatbag.ghost_candy = treatbag.ghost_candy.saturating_add(1);
 				treatbag.latest_treat = 5;
 			},
 		10 | 11 => {
 				treatbag.latest_treat = 0;
 			},
 		_ => panic!("Impossible Outcome"),
 	};

    treatbag.total_treats = treatbag.total_treats.saturating_add(1);
 	world.write_model(@treatbag);
    }

    fn potion_brewery(ref self: ContractState, potionMap: PotionChoice) {
 	let mut world = self.world_default();
 	let player = starknet::get_caller_address();

 	let mut treatbag: TreatBag = world.read_model(player);
 	let mut potion_bar: PotionBar = world.read_model(player);

 	match potionMap {
	      PotionChoice::Bribe => { if treatbag.pulpy_pumpkin > 1 {
					potion_bar.witch_bribe = potion_bar.witch_bribe.saturating_add(1);
					potion_bar.total_potions = potion_bar.total_potions.saturating_add(1);
					treatbag.total_treats = treatbag.total_treats.saturating_sub(2);
					treatbag.pulpy_pumpkin = treatbag.pulpy_pumpkin.saturating_sub(2);
					potion_bar.latest_brew = 0;
				 	}
				},
	      PotionChoice::Multiplier => { if treatbag.ghost_candy > 3 {
					potion_bar.treat_multiplier = potion_bar.treat_multiplier.saturating_add(1);
					potion_bar.total_potions = potion_bar.total_potions.saturating_add(1);
					treatbag.total_treats = treatbag.total_treats.saturating_sub(4);
					treatbag.ghost_candy = treatbag.ghost_candy.saturating_sub(4);
					potion_bar.latest_brew = 1;
					}
				},
	      PotionChoice::Slayer => { if treatbag.vampire_lollipop > 2 {
					potion_bar.witch_slayer = potion_bar.witch_slayer.saturating_add(1);
					potion_bar.total_potions = potion_bar.total_potions.saturating_add(1);
					treatbag.total_treats = treatbag.total_treats.saturating_sub(3);
					treatbag.vampire_lollipop = treatbag.vampire_lollipop.saturating_sub(3);
					potion_bar.latest_brew = 2;
					}
				},
	}

 	world.write_model(@treatbag);
 	world.write_model(@potion_bar);
    }

    fn guzzle_potion(ref self: ContractState, potionMap: PotionChoice) {
 	let mut world = self.world_default();
 	let player = starknet::get_caller_address();

 	let mut potion_bar: PotionBar = world.read_model(player);
 	
    match potionMap {
	      PotionChoice::Bribe => { if potion_bar.witch_bribe > 0 {
					potion_bar.witch_bribe = potion_bar.witch_bribe.saturating_sub(1);
					potion_bar.total_potions = potion_bar.total_potions.saturating_sub(1);
					potion_bar.bribe_count = 3;
					potion_bar.witch_bribe_active = true;
					potion_bar.latest_guzzle = 0;
				 	}
				},
	      PotionChoice::Multiplier => { if potion_bar.treat_multiplier > 0 {					
                    potion_bar.treat_multiplier = potion_bar.treat_multiplier.saturating_sub(1);
					potion_bar.total_potions = potion_bar.total_potions.saturating_sub(1);
					potion_bar.treat_multiplier_active = true;
					potion_bar.latest_guzzle = 1;
					}
				},
	      PotionChoice::Slayer => { if potion_bar.witch_slayer > 0 {
					potion_bar.witch_slayer = potion_bar.witch_slayer.saturating_sub(1);
					potion_bar.total_potions = potion_bar.total_potions.saturating_sub(1);
					potion_bar.slain_count = 2;
					potion_bar.witch_slayer_active = true;
					potion_bar.latest_guzzle = 2;
					}
				},
	}

 	world.write_model(@potion_bar);
    }

    fn gameover(ref self: ContractState) {
 	let mut world = self.world_default();
 	let player = starknet::get_caller_address();

 	let mut treatbag: TreatBag = world.read_model(player);
 	let mut potion_bar: PotionBar = world.read_model(player);

	//Doubling player treats if multiplier potion is active
 	if potion_bar.treat_multiplier_active {
 		if treatbag.pulpy_pumpkin > 0 {
 				treatbag.pulpy_pumpkin = treatbag.pulpy_pumpkin * 4;
 		}
 		if treatbag.choco_skull > 0 {
 				treatbag.choco_skull = treatbag.choco_skull * 4;
 		}
 		if treatbag.vampire_lollipop > 0 {
 				treatbag.vampire_lollipop = treatbag.vampire_lollipop * 4;
 		}
 		if treatbag.ghost_candy > 0 {
 				treatbag.ghost_candy = treatbag.ghost_candy * 4;
 		}
		potion_bar.treat_multiplier_active = false;
 	}

 	//Treat reduction on gameover if no life-saving potion is active
 	if !( (potion_bar.witch_bribe_active && treatbag.choco_skull > 0) || potion_bar.witch_slayer_active ) {
 		if treatbag.pulpy_pumpkin > 0 {treatbag.pulpy_pumpkin = treatbag.pulpy_pumpkin / 2};
 		if treatbag.choco_skull > 0 {treatbag.choco_skull = treatbag.choco_skull / 2};
 		if treatbag.vampire_lollipop > 0 {treatbag.vampire_lollipop = treatbag.vampire_lollipop / 2};
 		if treatbag.ghost_candy > 0 {treatbag.ghost_candy = treatbag.ghost_candy / 2};
 	}

	//Using life-saving potions if active
 	if potion_bar.witch_bribe_active && treatbag.choco_skull > 0 && potion_bar.bribe_count > 0 {
 		treatbag.choco_skull = treatbag.choco_skull.saturating_sub(1);
 		potion_bar.bribe_count = potion_bar.bribe_count.saturating_sub(1);
 	}

	//Deactivating witch bribe potion if no bribes are left
 	if potion_bar.bribe_count == 0 {
 		potion_bar.witch_bribe_active = false;
	}

 	if potion_bar.witch_slayer_active && potion_bar.slain_count > 0 {
 		potion_bar.slain_count = potion_bar.slain_count.saturating_sub(1);
 	}

	//Witch slayer potion deactivation if no slays are left
 	if potion_bar.slain_count == 0 {
 		potion_bar.witch_slayer_active = false;
 	}
 	
	treatbag.total_treats = treatbag.pulpy_pumpkin + treatbag.choco_skull + treatbag.vampire_lollipop + treatbag.ghost_candy;
 	world.write_model(@treatbag);
 	world.write_model(@potion_bar);
    }
  }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"witch_or_treat")
        }
    }
}


