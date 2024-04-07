using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using UnityGameFramework.Runtime;

namespace  Abyss.Core
{
    public class MainMenuLogic : UIFormLogic
    {   
        
        [SerializeField]
        private Button BtnStart;
        private void Awake()
        {
        }
        private void Start()
        {
            // Debug.LogError(" 有没有那个entity" + Entry.Entity.GetEntity(EntityPath.Mage).gameObject.name);
            // BtnStart.onClick.AddListener(OnStartClick);
        }

        protected override void OnInit(object userData)
        {
            base.OnInit(userData);
        }

        protected override void OnCover()
        {
            base.OnCover();
        }

        private void OnStartClick()
        {
        }
    }
    
}
