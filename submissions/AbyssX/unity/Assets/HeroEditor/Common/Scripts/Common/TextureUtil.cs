using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.Common
{
    public static class TextureUtil
    {
        public static void PremultiplyAlpha(this Texture2D texture)
        {
            var pixels = texture.GetPixels();

            for (var i = 0; i < pixels.Length; i++) pixels[i] = Premultiply(pixels[i]);

            texture.SetPixels(pixels);
            texture.Apply();
        }

        private static Color Premultiply(Color color)
        {
            return new Color(color.r * color.a, color.g * color.a, color.b * color.a, color.a);
        }
    }
}