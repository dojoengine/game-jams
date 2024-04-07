use core::option::OptionTrait;
use starknet::ContractAddress;
use dojo_starter::utils::{
    constant::{MAX_STAGE},
    random::{RandomTrait},
};
 
#[derive(Serde, Copy, Drop, Introspect,PartialEq)]
enum StageCategory {
    None,
    Normal,
    Boss,
    Camp,
    Cave,
    Idol
}

#[derive(Copy, Drop, Serde)]
struct Stage {
    seed:felt252,
}

impl StageCategoryIntoU64 of Into<StageCategory, u64> {
    fn into(self: StageCategory) -> u64 {
        match self {
            StageCategory::None => 0,
            StageCategory::Normal => 1,
            StageCategory::Boss => 2,
            StageCategory::Camp => 3,
            StageCategory::Cave => 4,
            StageCategory::Idol => 5
        }
    }
}
impl U64IntoStageCategory of Into<u64, StageCategory> {
    fn into(self: u64) -> StageCategory {
        match self.into() {
            0 => StageCategory::None,
            1 => StageCategory::Normal,
            2 => StageCategory::Boss,
            3 => StageCategory::Camp,
            4 => StageCategory::Cave,
            5 => StageCategory::Idol,
            _ => StageCategory::None
        }
    }
}

trait StageTrait {
    fn create_stage_by_id(id:u32,seed:felt252,category:StageCategory) -> Stage;
    fn get_stage_category(seed:u64,stage_process:u32)->Array<StageCategory>;
}

impl StageImpl of StageTrait {
    fn create_stage_by_id(id:u32,seed:felt252,category:StageCategory)->Stage{
        return Stage{
            seed:seed,
        };
    }
     fn get_stage_category(seed:u64,stage_process:u32)->Array<StageCategory>{
        let mut arr = ArrayTrait::<StageCategory>::new();
        if(stage_process == 0){
            arr.append(StageCategory::Normal);
           
        } else if(stage_process == MAX_STAGE){
            arr.append(StageCategory::Boss);
        } else{
            if(stage_process % 2 == 0){
                arr.append(StageCategory::Normal);
            }else{
                let mut s1:u64 = 0;
                let mut seed_r:u64 = seed;
                let min:u64 = StageCategory::Normal.into();
                let max:u64 = StageCategory::Idol.into();
                let mut i = 0;
                s1 = RandomTrait::random_r(ref seed_r,min,max);
                arr.append(s1.into());
                loop{
                    let s2 = RandomTrait::random_r(ref seed_r,min,max);
                    if(s2 != s1){
                        arr.append(s2.into());
                        break;
                    }
                    i += 1;
                };   
            }
        }
        return arr;
     }
}