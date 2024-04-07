using GameFramework;
using GameFramework.Entity;
using GameFramework.Event;
using GameFramework.Resource;

namespace Abyss.Core
{   
    /// <summary>
    /// 属性改变
    /// </summary>
    public sealed class PropertyModifyEventArgs : GameEventArgs
    {   
        public static readonly int EventId = typeof(PropertyModifyEventArgs).GetHashCode();
        public override void Clear()
        {
            throw new System.NotImplementedException();
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

        public PropertyModifyEventArgs()
        {
        }

        public static PropertyModifyEventArgs Create(IRole role, string modifiedField, int finalValue)
        {
            var propertyModifyEventArgs = ReferencePool.Acquire<PropertyModifyEventArgs>();
            propertyModifyEventArgs.target = role;
            propertyModifyEventArgs.finalValue = finalValue;
            propertyModifyEventArgs.modifiedField = modifiedField;
            return propertyModifyEventArgs;
        }
    }
    
    

}