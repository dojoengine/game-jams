use core::array::ArrayTrait;
use core::option::OptionTrait;
use core::traits::TryInto;
use core::traits::Into;
use core::dict::Felt252DictTrait;
use poseidon::PoseidonTrait;
use hash::HashStateTrait;
use debug::PrintTrait;

trait RandomTrait {
    fn random(seed:u64,min:u64,max:u64) -> u64;
    fn random_r(ref seed:u64,min:u64,max:u64) -> u64;
    fn create_random_seed(p1:felt252,p2:felt252,p3:felt252)->u64;
    fn create_random_sequence(ref seed:u64,data_arr:@Array<u64>)->Array<u64>;
}

impl RandomImpl of RandomTrait {
     fn random(seed:u64,min:u64,max:u64) -> u64{
        let s:u128 = (seed.into() * 1103515245 + 12345) & 0x7fffffff;
        return min + s.try_into().unwrap() % (max - min + 1);
    }
    fn random_r(ref seed:u64,min:u64,max:u64) -> u64{
        let s:u128 = (seed.into() * 1103515245 + 12345) & 0x7fffffff;
        seed = s.try_into().unwrap();
        return min + seed % (max - min + 1);
    }
    fn create_random_seed(p1:felt252,p2:felt252,p3:felt252)->u64{
        let mut state = PoseidonTrait::new();
        state = state.update(p1);
        state = state.update(p2);
        state = state.update(p3);
        let mut v:u256 = state.finalize().into();
        v = v & 0x7fffffff;
        return v.try_into().unwrap();
    }
    fn create_random_sequence(ref seed:u64,data_arr:@Array<u64>)->Array<u64>{
 
        let arr_size = data_arr.len();

        assert(arr_size > 1, 'random sequence len error');

        let mut dict: Felt252Dict<u64> = Default::default();
        let mut i = 0;

        loop{
            if(i == arr_size){
                break;
            }
            dict.insert(i.into(),*data_arr.at(i));
            i += 1;
        };

        let mut cur_pos:u64 = arr_size.into()-1;
        loop{
            if(cur_pos == 0){
                break;
            }
             
            let rand_pos:u64 = RandomTrait::random_r(ref seed,0,cur_pos);
            let v:u64 = dict.get(rand_pos.into());
            dict.insert(rand_pos.into(),dict.get(cur_pos.into()));
            dict.insert(cur_pos.into(),v);
            cur_pos -= 1;
        };

        let mut arr = array![];
        i = 0;
        loop{
            if(i == arr_size){
                break;
            }
            arr.append(dict.get(i.into()));
            i += 1;
        };
        return arr;
    }
}


#[cfg(test)]
mod tests {
    use core::dict::Felt252DictTrait;
    use core::option::OptionTrait;
    use core::traits::TryInto;
    use debug::PrintTrait;
    use core::traits::Into;
    use super::{RandomTrait};

    #[test]
    #[available_gas(100000000)]
    fn test_random() {
        let mut seed = RandomTrait::create_random_seed(1,2,3);
        let mut arr = ArrayTrait::<u64>::new();
        arr.append(0);
        arr.append(2);
        arr.append(3);
        arr.append(4);
        arr.append(5);


        let dict = RandomTrait::create_random_sequence(ref seed,@arr);
    }
 
}
