using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Abyss.Utils;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    /// <summary>
    /// 游戏入口
    /// </summary>
    public partial class Entry : MonoBehaviour
    {
        private void Start()
        {
            // 初始化内置组件
            InitBuiltinComponents();
 
            // 初始化自定义组件
            InitCustomComponents();
 
            // 初始化自定义调试器
            InitCustomDebuggers();
            
            // Log.Info("8 > 3" + 8.IsHave(3));
            // Log.Info("8 > 2" + 8.IsHave(2));
            // Log.Info("16 > 3" + 16.IsHave(3));
            // Log.Info("16 > 3" + 16.IsHave(3));
            // Log.Info("85 > 2" + 85.IsHave(2));
            // Log.Info("85 > 3" + 85.IsHave(3));
            // Log.Info("3 > 0" + 3.IsHave(0));
            // Log.Info("2 > 0" + 2.IsHave(0));
            // Log.Info("4 > 0" + 4.IsHave(0));
        }
    }
}

