using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.Common;
using HeroEditor.Common.Enums;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.ExampleScripts
{
    /// <summary>
    /// An example of how to change character's equipment.
    /// </summary>
    public class EquipmentExample : MonoBehaviour
    {
        public Character Character;
        public AppearanceExample AppearanceExample;

        public void EquipRandomArmor()
        {
            var randomIndex = Random.Range(0, Character.SpriteCollection.Armor.Count);
            var randomItem = Character.SpriteCollection.Armor[randomIndex];

            Character.Equip(randomItem, EquipmentPart.Armor);
        }

        public void RemoveArmor()
        {
            Character.UnEquip(EquipmentPart.Armor);
        }

        public void EquipRandomHelmet()
        {
            Character.Equip(Character.SpriteCollection.Helmet.Random(), EquipmentPart.Helmet);
            AppearanceExample.Refresh();
        }

        public void RemoveHelmet()
        {
            Character.UnEquip(EquipmentPart.Helmet);
            AppearanceExample.Refresh();
        }

        public void EquipRandomShield()
        {
            Character.Equip(Character.SpriteCollection.Shield.Random(), EquipmentPart.Shield);
        }

        public void RemoveShield()
        {
            Character.UnEquip(EquipmentPart.Shield);
        }

        public void EquipRandomWeapon()
        {
            Character.Equip(Character.SpriteCollection.MeleeWeapon1H.Random(), EquipmentPart.MeleeWeapon1H);
        }

        public void RemoveWeapon()
        {
            Character.UnEquip(EquipmentPart.MeleeWeapon1H);
        }

        public void EquipRandomBow()
        {
            Character.Equip(Character.SpriteCollection.Bow.Random(), EquipmentPart.Bow);
        }

        public void RemoveBow()
        {
            Character.UnEquip(EquipmentPart.Bow);
        }

        public void Reset()
        {
            Character.ResetEquipment();
            AppearanceExample.Appearance = new CharacterAppearance();
            AppearanceExample.Refresh();
        }
    }
}