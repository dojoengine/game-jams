// using GameFramework.Entity;
//
// namespace Abyss.Core
// {
//     public abstract class SkillCard : BaseCard, ISkillCard
//     {
//         public sealed override void Apply(IRole[] targets)
//         {
//             if (isUpgraded)
//             {
//                 AddBuffUpgraded(targets, this.buff);
//             }
//             else
//             {
//                 AddBuffSimple(targets, this.buff);
//             }
//         }
//
//
//
//         public abstract void AddBuffSimple(IRole[] role, IBuff buff);
//
//         public abstract void AddBuffUpgraded(IRole[] target, IBuff buff);
//
//     }
// }