using GameFramework;
using GameFramework.Entity;
using GameFramework.Event;
using GameFramework.Resource;

namespace Abyss.Core
{   
    /// <summary>
    /// 属性改变
    /// </summary>
    public sealed class MainGameArgs : GameEventArgs
    {   
        public static readonly int EventId = typeof(MainGameArgs).GetHashCode();
        public override void Clear()
        {
        }

        public IRole target
        {
            private set;
            get;
        }

        public int finalValue
        {
            private set;
            get;
        }

        public string modifiedField
        {
            private set;
            get;
        }

        public override int Id => EventId;

        public MainGameArgs()
        {
        }

        public static MainGameArgs Create(IRole role, string modifiedField, int finalValue)
        {
            var mainGameArgs = ReferencePool.Acquire<MainGameArgs>();
            mainGameArgs.target = role;
            mainGameArgs.finalValue = finalValue;
            mainGameArgs.modifiedField = modifiedField;
            return mainGameArgs;
        }
    }
    
    

}
