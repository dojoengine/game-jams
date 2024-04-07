namespace Abyss.Core
{
    public interface IAtkCard : ICard
    {
        protected void AddAtk(IRole[] target);
        protected void AddAtkUpgraded(IRole[] target);

        public void Attack(IRole[] target)
        {
            if (isUpgraded)
            {
                AddAtkUpgraded(target);
            }
            else
            {
                AddAtk(target);
            }
        }
    }
}