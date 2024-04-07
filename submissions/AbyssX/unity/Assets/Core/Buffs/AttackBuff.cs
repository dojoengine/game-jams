using System;
using GameFramework.Resource;
using UnityEngine;

namespace Abyss.Core
{
    public class AttackBuff : BaseBuff
    {
        public override void Init(IRole owner)
        {
        }

        public override void Apply(IRole sender, IRole[] targets, int a = 0, int b = 0, int c = 0)
        {
            
            int originDmg = a;
            foreach (var target in targets)
            {
                if (target.Properties.ContainsKey(GameResource.Wounded))
                {
                    originDmg = (int)(originDmg * 1.25f);
                }

                if (target.Properties.ContainsKey(GameResource.Armor))
                {
                    originDmg -= target.Properties[GameResource.Armor];
                }
                target.Properties[GameResource.Hp] = Math.Max(0, target.Properties[GameResource.Hp] - originDmg);
                
                Entry.Event.Fire(sender, PropertyModifyEventArgs.Create(target, GameResource.Hp, target.Properties[GameResource.Hp]));;
            }
        }
    }
}