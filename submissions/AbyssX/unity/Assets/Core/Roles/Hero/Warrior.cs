using System;
using Unity.VisualScripting;
using UnityEngine;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    public class Warrior : Hero
    {
        public override void InitCardSet()
        {
            
        }
        
        protected override void  OnDisable()
        {
            base.OnDisable();
            Log.Info(23232131);
        }

        private void OnDestroy()
        {
        Log.Info(322222222232);
        }
    }
}