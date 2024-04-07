using System;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.Common;
using HeroEditor.Common;
using HeroEditor.Common.Data;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.CharacterScripts
{
    [Serializable]
    public class CharacterAppearance
    {
        public string Hair = "Common.Basic.Hair.BuzzCut";
        public string Beard = null;
        public string Ears = "Common.Basic.Ears.HumanEars";
        public string Eyebrows = "Common.Basic.Eyebrows.Eyebrows1";
        public string Eyes = "Common.Basic.Eyes.Male";
        public string Mouth = "Common.Basic.Mouth.Normal";
        public string Head = "Common.Basic.Head.Human";

        public Color32 HairColor = new Color32(150, 50, 0, 255);
        public Color32 BeardColor = new Color32(150, 50, 0, 255);
        public Color32 EyesColor = new Color32(0, 200, 255, 255);
        public Color32 BodyColor = new Color32(255, 200, 120, 255);
        
        public void Setup(CharacterBase character, bool initialize = true)
        {
            var hairSprite = Hair.IsEmpty() ? null : character.SpriteCollection.Hair.Single(i => i.Id == Hair);

            character.Hair = hairSprite?.Sprite;
            character.HideEars = hairSprite != null && hairSprite.Tags.Contains("HideEars");
            character.HairRenderer.color = hairSprite == null || hairSprite.Tags.Contains("NoPaint") ? Color.white : (Color) HairColor;
            character.Beard = Beard.IsEmpty() ? null : character.SpriteCollection.Beard.Single(i => i.Id == Beard)?.Sprite;
            character.BeardRenderer.color = BeardColor;
            character.Ears = Ears.IsEmpty() ? null : character.SpriteCollection.Ears.Single(i => i.Id == Ears)?.Sprite;

            if (character.Expressions.Count > 0)
            {
                character.Expressions[0] = new Expression { Name = "Default" };
                character.Expressions[0].Eyebrows = Eyebrows == null ? null : character.SpriteCollection.Eyebrows.Single(i => i.Id == Eyebrows)?.Sprite;
                character.Expressions[0].Eyes = Eyes == null ? null : character.SpriteCollection.Eyes.Single(i => i.Id == Eyes)?.Sprite;
                character.Expressions[0].Mouth = Mouth == null ? null : character.SpriteCollection.Mouth.Single(i => i.Id == Mouth)?.Sprite;

                foreach (var expression in character.Expressions)
                {
                    if (expression.Name != "Dead") expression.EyesColor = EyesColor;
                }
            }

            character.EyesRenderer.color = EyesColor;
            character.HeadRenderer.color = BodyColor;
            character.BodyRenderers.ForEach(i => i.color = BodyColor);
            character.EarsRenderer.color = BodyColor;

            var head = character.SpriteCollection.Head.Single(i => i.Id == Head);
            
            character.Head = head.Sprite;
            
            if (initialize) character.Initialize();
        }

        public string ToJson()
        {
            return JsonUtility.ToJson(this);
        }

        public static CharacterAppearance FromJson(string json)
        {
            return JsonUtility.FromJson<CharacterAppearance>(json);
        }
    }
}