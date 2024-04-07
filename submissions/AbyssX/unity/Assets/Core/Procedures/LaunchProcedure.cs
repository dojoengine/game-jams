using GameFramework.Fsm;
using GameFramework.Procedure;
using Unity.VisualScripting;
using UnityEngine;

namespace Abyss.Core
{

    public class LaunchProcedure : ProcedureBase
    {
        private bool m_InitResourceComplete = false;
        protected override void OnLeave(IFsm<IProcedureManager> procedureOwner, bool isShutdown)
        {
            base.OnLeave(procedureOwner, isShutdown);
        }

        protected override void OnEnter(IFsm<IProcedureManager> procedureOwner)
        {
            base.OnInit(procedureOwner);
            Entry.UI.OpenUIForm(UiFormPath.MainMenuForm, "Bottom");
            ChangeState<SelectHeroProcedure>(procedureOwner);
        }

        private void OnResourcesInitComplete()
        {
            m_InitResourceComplete = true;
        }

        protected override void OnUpdate(IFsm<IProcedureManager> procedureOwner, float elapseSeconds, float realElapseSeconds)
        {
            base.OnUpdate(procedureOwner, elapseSeconds, realElapseSeconds);
            if (m_InitResourceComplete)
            {
                ChangeState<SelectHeroProcedure>(procedureOwner);
            }
        }
    }
}