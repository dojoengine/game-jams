use starknet::ContractAddress;
use dojo_starter::models::{property::{Property,BaseProperty,PropertyTrait},stage::{StageCategory}};

#[derive(Serde, Copy, Drop, Introspect,PartialEq)]
enum RoleCategory {
    None,
    Warrior,
    Rogue,
    Mage
}

#[derive(Model, Copy, Drop, Serde)]
struct Role {
    #[key]
    player: ContractAddress,
    seed:u64,
    cur_stage:u32,
    stage_category:StageCategory,

    category:RoleCategory,
    gold:u32,

    card_slot:u256,
    blessing_slot:u256,

    property:Property,
}

impl U32IntoRoleCategory of Into<u32, RoleCategory> {
    fn into(self: u32) -> RoleCategory {
        match self.into() {
            0 => RoleCategory::None,
            1 => RoleCategory::Warrior,
            2 => RoleCategory::Rogue,
            3 => RoleCategory::Mage,
            _ => RoleCategory::None
 
        }
    }
}

impl RoleCategoryIntoU32 of Into<RoleCategory, u32> {
    fn into(self: RoleCategory) -> u32{
        match self {
            RoleCategory::None => 0,
            RoleCategory::Warrior => 1,
            RoleCategory::Rogue => 2,
            RoleCategory::Mage => 3,
           
        }
    }
}

trait RoleTrait {
    fn init_role(player: ContractAddress,seed:u64,category:RoleCategory) -> Role;
}

impl RoleImpl of RoleTrait {
    fn init_role(player: ContractAddress,seed:u64,category:RoleCategory) -> Role{
        let mut role = Role{
            player: player,
            seed:seed,
            cur_stage:0,
            stage_category:StageCategory::None,
            category:category,
            gold:100,

            card_slot:1023,
            blessing_slot:1,
            property:PropertyTrait::init_property(),
        };
        return role;
    }
 
}