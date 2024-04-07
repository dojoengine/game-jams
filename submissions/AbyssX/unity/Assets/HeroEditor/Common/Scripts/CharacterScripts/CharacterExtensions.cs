using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.Common.Scripts.CharacterScripts.Firearms;
using HeroEditor.Common;
using HeroEditor.Common.Enums;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.CharacterScripts
{
    /// <summary>
    /// You can extend 'CharacterBase' class here. Alternatively, you can just use derived class 'Character' for adding new features.
    /// </summary>
    public static class CharacterExtensions
    {
        public static Color RandomColor => new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f), 1f);

        public static void Randomize(this CharacterBase character)
        {
            character.ResetEquipment();

            character.SetBody(character.SpriteCollection.Hair.Random(), BodyPart.Hair, RandomColor);
            character.SetBody(character.SpriteCollection.Eyebrows.Random(), BodyPart.Eyebrows);
            character.SetBody(character.SpriteCollection.Eyes.Random(), BodyPart.Eyes, RandomColor);
            character.SetBody(character.SpriteCollection.Mouth.Random(), BodyPart.Mouth);

            character.Equip(character.SpriteCollection.Helmet.Random(), EquipmentPart.Helmet);
            character.Equip(character.SpriteCollection.Armor.Random(), EquipmentPart.Armor);
            character.Equip(character.SpriteCollection.MeleeWeapon1H.Random(), EquipmentPart.MeleeWeapon1H);
            character.Equip(character.SpriteCollection.Shield.Random(), EquipmentPart.Shield);
        }

        public static Firearm GetFirearm(this CharacterBase character)
        {
            return ((Character) character).Firearm;
        }
    }
}