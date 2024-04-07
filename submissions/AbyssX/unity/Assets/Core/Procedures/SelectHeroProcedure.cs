using GameFramework.Fsm;
using GameFramework.Procedure;
using UnityEngine;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    public class SelectHeroProcedure : ProcedureBase
    {
        protected override void OnEnter(IFsm<IProcedureManager> procedureOwner)
        {
            base.OnInit(procedureOwner);
            Entry.UI.OpenUIForm(UiFormPath.SelectHeroForm, "Bottom");
        }
        protected override void OnLeave(IFsm<IProcedureManager> procedureOwner, bool isShutdown)
        {   
            base.OnLeave(procedureOwner, isShutdown);
        }
    }
}