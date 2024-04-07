namespace Abyss.Core
{
    public interface ISkillCard : ICard
    {
        public void AddBuffSimple(IRole[] role, int[] value);
        public void AddBuffUpgraded(IRole[] target, int[] upgradedValue);
    }
}