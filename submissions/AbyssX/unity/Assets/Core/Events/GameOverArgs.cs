using GameFramework.Event;

namespace Abyss.Core
{
    public class GameOverArgs : GameEventArgs
    {
        public static readonly int EventId = typeof(GameOverArgs).GetHashCode();
        public  override int Id => EventId;
        public override void Clear()
        {
            
        }
    }
}