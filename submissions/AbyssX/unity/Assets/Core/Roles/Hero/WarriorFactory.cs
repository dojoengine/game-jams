namespace Abyss.Core
{
    public class WarriorFactory : HeroFactory
    {
        public override IHero CreateHero()
        {
            IHero rtn = new Warrior();
            return rtn;
        }
    }
}