using System;
using System.Collections.Generic;
using GameFramework;
using GameFramework.Fsm;

namespace Abyss.Core.States
{
    public class RoleStateHold : FsmState<RoleBase>, IReference
    {
        protected override void OnInit(IFsm<RoleBase> fsm)
        {
            base.OnInit(fsm);
        }

        public void Clear()
        {
            
        }
    }
}