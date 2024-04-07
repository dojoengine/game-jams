using System;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;
using HeroEditor.Common.Enums;
using UnityEngine;

namespace Assets.HeroEditor.InventorySystem.Scripts.Helpers
{
    public class CharacterInventorySetup
    {
        public static void Setup(Character character, List<Item> equipped)
        {
            character.ResetEquipment();
            
            foreach (var item in equipped)
            {
                try
                {
                    switch (item.Params.Type)
                    {
                        case ItemType.Helmet:
                            var helmet = character.SpriteCollection.Helmet.Single(i => i.Id == item.Params.SpriteId);

                            character.Helmet = helmet.Sprite;
                            character.FullHair = helmet.Tags.Contains("FullHair");
                            break;
                        case ItemType.Armor:
                            character.Armor = character.SpriteCollection.Armor.FindSpritesById(item.Params.SpriteId);
                            break;
                        case ItemType.Shield:
                            character.Shield = character.SpriteCollection.Shield.FindSpriteById(item.Params.SpriteId);
                            character.WeaponType = WeaponType.Melee1H;
                            break;
                        case ItemType.Weapon:

                            switch (item.Params.Class)
                            {
                                case ItemClass.Bow:
                                    character.WeaponType = WeaponType.Bow;
                                    character.Bow = character.SpriteCollection.Bow.FindSpritesById(item.Params.SpriteId);
                                    break;
                                default:
                                    if (item.IsFirearm)
                                    {
                                        throw new NotImplementedException("Firearm equipping is not implemented. Implement if needed.");
                                    }
                                    else
                                    {
                                        character.WeaponType = item.Params.Tags.Contains(ItemTag.TwoHanded) ? WeaponType.Melee2H : WeaponType.Melee1H;
                                        character.PrimaryMeleeWeapon = (character.WeaponType == WeaponType.Melee1H ? character.SpriteCollection.MeleeWeapon1H : character.SpriteCollection.MeleeWeapon2H).FindSpriteById(item.Params.SpriteId);
                                    }
                                    break;
                            }
                            break;
                    }
                }
                catch (Exception e)
                {
                    Debug.LogErrorFormat("Unable to equip {0} ({1})", item.Params.Id, e.Message);
                }
            }

            character.Initialize();
        }
    }
}