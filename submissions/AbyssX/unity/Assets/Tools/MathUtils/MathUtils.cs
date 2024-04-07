using System.Numerics;

namespace Abyss.Utils
{
    public static class MathUtils
    {
        public static bool IsHave(this int origin, int target)
        {
            if (origin < target)
            {
                return false;
            }

            return ((1 << target) & origin) != 0;
        }
    }
}