namespace Abyss.Core
{
    public interface IBuff
    {

        void Apply(IRole sender, IRole[] passive,  int a = 0, int b = 0, int c = 0);
    }
}