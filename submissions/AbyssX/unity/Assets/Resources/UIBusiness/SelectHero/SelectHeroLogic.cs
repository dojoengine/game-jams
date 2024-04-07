using System;
using UnityEngine;
using UnityEngine.UI;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    public class SelectHeroLogic : UIFormLogic
    {
        [SerializeField]
        private Button btn_warrior;
        [SerializeField]
        private Button btn_rogue;
        [SerializeField]
        private Button btn_mage;

        private void Awake()
        {
            btn_warrior.onClick.AddListener(() => { OnHeroSelect(E_Hero.Warrior); });
            btn_rogue.onClick.AddListener(() => { OnHeroSelect(E_Hero.Rogue); });
            btn_mage.onClick.AddListener(() => { OnHeroSelect(E_Hero.Mage); });
        }

        private void OnHeroSelect(E_Hero heroType)
        {
           Entry.GameMgr.Init(heroType);
        }
    }
}

