use starknet::ContractAddress;
use starknet::Event;

#[derive(Serde, Copy, Drop, Introspect,PartialEq)]
enum EventCode{
    None,
    Login,
    StartGame,
    GiveUpGame,
    SelectNextStage,
    CheckBattleResult,
    ChooseEventBonus,
}


 
 

const MAX_STAGE:u32 = 12_u32;