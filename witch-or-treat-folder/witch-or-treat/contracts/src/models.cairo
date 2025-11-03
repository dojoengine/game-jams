use starknet::ContractAddress;

#[derive(Serde, Copy, Drop, Introspect)]
#[dojo::model]
pub struct TreatBag {
   #[key]
  pub player: ContractAddress,
  pub pulpy_pumpkin : u32,
  pub choco_skull : u32,
  pub vampire_lollipop : u32,
  pub ghost_candy : u32,
  pub latest_treat : u8,
  pub total_treats : u32,
}

#[derive(Serde, Copy, Drop, Introspect)]
#[dojo::model]
pub struct PotionBar {
   #[key]
   pub player: ContractAddress,
   pub witch_bribe : u32,
   pub bribe_count : u8,
   pub witch_bribe_active : bool,
   pub treat_multiplier : u32,
   pub treat_multiplier_active : bool,
   pub witch_slayer : u32,
   pub slain_count : u8,
   pub witch_slayer_active : bool,
   pub latest_brew : u8,
   pub latest_guzzle : u8,
   pub total_potions : u32,
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
pub enum PotionChoice {
   Bribe,
   Multiplier,
   Slayer,
}

 #[derive(Serde, Copy, Drop, PartialEq, Introspect)]
   pub enum TreatType {
      None,
   	ChocoSkull,
   	WitchCurse,
   	VampireLollipop,
   	PulpyPumpkin,
   	GhostCandy,
 	}


