using GameFramework.Entity;

namespace Abyss.Core
{
    public interface ICard : IEntity
    {
        public IRole owner
        {
            set;
            get;
        }

        public bool FaceUp
        {
            get;
            set;
        }

        public bool isUpgraded
        {
            set;
            get;
        }

        public void Upgrade()
        {
            isUpgraded = true;
        }
    }
}

