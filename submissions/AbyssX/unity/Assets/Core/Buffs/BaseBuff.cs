namespace Abyss.Core
{
    public abstract class BaseBuff : IBuff
    {
        
        public abstract void Init(IRole owner);
        public abstract void Apply(IRole sender, IRole[] target, int a = 0, int b = 0, int c = 0);
    }
}