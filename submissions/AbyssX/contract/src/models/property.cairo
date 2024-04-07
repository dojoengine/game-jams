 
#[derive(Copy, Drop, Serde, Introspect,PartialEq)]
struct BaseProperty {
    hp: u32,
    max_hp: u32,
    energy:u32,
    max_energy:u32,

    armor:u32,
    power:u32,

    fragile:u32,
    weak:u32,
    fear:u32,
    maintain_armor:u32,
}

#[derive(Copy, Drop, Serde, Introspect,PartialEq)]
struct Property {
    cur_property:BaseProperty,
    round_begin_buff:BaseProperty,
    round_begin_debuff:BaseProperty,
    round_end_buff:BaseProperty,
    round_end_debuff:BaseProperty,
}

trait PropertyTrait {
    fn init_property()->Property;
    fn add(ref self:BaseProperty,other:BaseProperty);
    fn sub(ref self:BaseProperty,other:BaseProperty);
    fn round_begin_action(ref self:Property);
    fn round_end_action(ref self:Property);

}

impl PropertyImpl of PropertyTrait {
     fn init_property()->Property{
        return Property{
            cur_property:BaseProperty{
                    hp: 80,
                    max_hp: 80,
                    energy:3,
                    max_energy:3,

                    armor:0,
                    power:0,

                    fragile:0,
                    weak:0,
                    fear:0,
                    maintain_armor:0
            },
            round_begin_buff:BaseProperty{
                    hp: 0,
                    max_hp: 0,
                    energy:0,
                    max_energy:0,

                    armor:0,
                    power:0,

                    fragile:0,
                    weak:0,
                    fear:0,
                    maintain_armor:0
            },
            round_begin_debuff:BaseProperty{
                    hp: 0,
                    max_hp: 0,
                    energy:0,
                    max_energy:0,

                    armor:0,
                    power:0,

                    fragile:0,
                    weak:0,
                    fear:0,
                    maintain_armor:0
            },
            round_end_buff:BaseProperty{
                    hp: 0,
                    max_hp: 0,
                    energy:0,
                    max_energy:0,

                    armor:0,
                    power:0,

                    fragile:0,
                    weak:0,
                    fear:0,
                    maintain_armor:0
            },round_end_debuff:BaseProperty{
                    hp: 0,
                    max_hp: 0,
                    energy:0,
                    max_energy:0,

                    armor:0,
                    power:0,

                    fragile:0,
                    weak:0,
                    fear:0,
                    maintain_armor:0
            }
        };
    }
    fn add(ref self:BaseProperty,other:BaseProperty){
        self.hp += other.hp;
        self.max_hp += other.max_hp;
        self.energy += other.energy;
        self.max_energy += other.max_energy;
        if(self.fear != 0){
            self.armor += other.armor/2;
        }else{
            self.armor += other.armor;
        }
        self.armor += other.armor;
        self.power += other.power;
        self.fragile += other.fragile;
        self.weak += other.weak;
        self.fear += other.fear;
        self.maintain_armor += other.maintain_armor;
    }
    fn sub(ref self:BaseProperty,other:BaseProperty){
        if(other.hp >= self.hp){
            self.hp = 0;
        }else{
             self.hp -= other.hp;
        }

        if(other.max_hp >= self.max_hp){
            self.max_hp = 0;
        }else{
             self.max_hp -= other.max_hp ;
        }

        if(other.energy >= self.energy){
            self.energy = 0;
        }else{
            self.energy -= other.energy ;
        }

        if(other.max_energy >= self.max_energy){
            self.max_energy = 0;
        }else{
             self.max_energy -= other.max_energy ;
        }

        if(other.armor >= self.armor){
            self.armor = 0;
        }else{
             self.armor -= other.armor ;
        }

        if(other.power >= self.power){
            self.power = 0;
        }else{
             self.power -= other.power ;
        }
        if(other.fragile >= self.fragile){
            self.fragile = 0;
        }else{
             self.fragile -= other.fragile;
        }
        if(other.weak >= self.weak){
            self.weak = 0;
        }else{
             self.weak -= other.weak;
        }

        if(other.fear >= self.fear){
            self.fear = 0;
        }else{
             self.fear -= other.fear;
        }

        if(other.maintain_armor >= self.maintain_armor){
            self.maintain_armor = 0;
        }else{
             self.maintain_armor -= other.maintain_armor;
        }
    }
    fn round_begin_action(ref self:Property){
        if(self.cur_property.maintain_armor == 0){
            self.cur_property.armor = 0; 
        }
 
        self.cur_property.energy = self.cur_property.max_energy;
        
        self.cur_property.add(self.round_begin_buff);
        self.cur_property.sub(self.round_begin_debuff);

        if(self.cur_property.fragile != 0){
            self.cur_property.fragile -= 1;
        }
        if(self.cur_property.weak != 0){
            self.cur_property.weak -= 1;
        }
        if(self.cur_property.fear != 0){
            self.cur_property.fear -= 1;
        }
    }
    fn round_end_action(ref self:Property){
        self.cur_property.add(self.round_end_buff);
        self.cur_property.sub(self.round_end_debuff);
    }
}