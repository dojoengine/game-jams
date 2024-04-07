using System.Collections.Generic;

namespace Abyss.Core
{
    public abstract class Hero : RoleBase,  IHero
    {
        public abstract void InitCardSet();
    }
}