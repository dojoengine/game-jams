using GameFramework;
using GameFramework.Entity;
using GameFramework.Event;
using GameFramework.Resource;

namespace Abyss.Core
{
    /// <summary>
    /// ³öÅÆ
    /// </summary>
    public sealed class CardOutArgs : GameEventArgs
    {
        public static readonly int EventId = typeof(CardOutArgs).GetHashCode();
        public override void Clear()
        {
            throw new System.NotImplementedException();
        }
        public long CardId {
            get;
            private set;
        }
        public IRole[] roles {
            get;
            private set;
        }

        public override int Id => EventId;

        public CardOutArgs()
        {
            
        }

        public static CardOutArgs Create(long CardId, IRole[] target )
        {
            var cardOutArgs = ReferencePool.Acquire<CardOutArgs>();
            cardOutArgs.roles = target;
            cardOutArgs.CardId = CardId;
            return cardOutArgs;
        }
    }
}