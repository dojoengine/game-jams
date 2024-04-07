using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using GameFramework;
using GameFramework.Fsm;

namespace Abyss.Core.States
{
    public class RoleStateReady : FsmState<RoleBase> , IReference
    {
        public void Clear()
        {
            
        }

        protected override void OnEnter(IFsm<RoleBase> fsm)
        {
            base.OnEnter(fsm);
            fsm.Owner.GetComponent<Character>().Relax();
        }
    }
}