using UnityEngine;

namespace Abyss.Core
{
    public class BloodThristCard : BaseCard
    {
        public override bool NeedSelect { get; set; } = false;
        // public CardData modelData { get;  set; }
        public override IBuff[] buffs { get; protected set; }
        public override void Apply(IRole[] targets)
        {
            int value = isUpgraded ? modelData.valueX[1] : modelData.valueX[0];
            buffs[0].Apply(this.owner, targets, value);
        }

        public override void InitCardBuffs()
        {
            var atkBuff = new AttackBuff();
            atkBuff.Init(this.owner);
            this.buffs = new[] { new AttackBuff()};
        }
    }
}