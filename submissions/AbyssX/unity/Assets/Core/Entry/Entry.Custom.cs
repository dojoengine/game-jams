using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    public partial class Entry
    {
        public static CardComponent Card
        {
            get;
            private set;
        }

        public static GameMgrComponent GameMgr
        {
            get;
            private set;
        }

        private static void InitCustomComponents()
        {
            // 将来在这里注册自定义的组件
            Card = GameEntry.GetComponent<CardComponent>();
            GameMgr = GameEntry.GetComponent<GameMgrComponent>();
        }
 
        private static void InitCustomDebuggers()
        {
            // 将来在这里注册自定义的调试器
        }
    }
}


