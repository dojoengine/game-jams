using GameFramework;
using GameFramework.Entity;
using GameFramework.Event;
using GameFramework.Resource;

namespace Abyss.Core
{
    /// <summary>
    /// ÊôÐÔ¸Ä±ä
    /// </summary>
    public sealed class CardInHandArgs : GameEventArgs
    {
        public static readonly int EventId = typeof(CardInHandArgs).GetHashCode();
        public override void Clear()
        {
            throw new System.NotImplementedException();
        }
        public long CardId
        {
            get;
            private set;
        }
        public int finalCardNum {
            get;
            private set;
        }

        public override int Id => EventId;

        public CardInHandArgs()
        {
        }

        public static CardInHandArgs Create(long CardId, int finalCardNum)
        {
            var cardOutArgs = ReferencePool.Acquire<CardInHandArgs>();
            cardOutArgs.CardId = CardId;
            cardOutArgs.finalCardNum = finalCardNum;
            return cardOutArgs;
        }
    }



}