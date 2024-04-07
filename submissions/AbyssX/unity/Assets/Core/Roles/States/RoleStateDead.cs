using System;
using System.Collections.Generic;
using GameFramework;
using GameFramework.Fsm;

namespace Abyss.Core.States
{
    public class RoleStateDead : FsmState<RoleBase>
    {
        protected override void OnInit(IFsm<RoleBase> fsm)
        {
            base.OnInit(fsm);
        }
        
    }
}