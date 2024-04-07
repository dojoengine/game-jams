using System;
using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.Common.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;
using HeroEditor.Common.Data;

namespace Assets.HeroEditor.InventorySystem.Scripts.Data
{
    /// <summary>
    /// Represents item object for storing with game profile (please note, that item params are stored separately in params database).
    /// </summary>
    [Serializable]
    public class Item
    {
        public string Id; // Id is not unique. Use Hash to compare items!
        public Modifier Modifier;
        public int Count;

        public Item()
        {
        }

        public Item(string id, int count = 1)
        {
            Id = id;
            Count = count;
        }

        public Item(string id, Modifier modifier, int count = 1)
        {
            Id = id;
            Count = count;
            Modifier = modifier;
        }

        public Item Clone()
        {
            return (Item) MemberwiseClone();
        }

        public ItemParams Params => ItemCollection.Active.GetItemParams(this);
        public ItemSprite Sprite => ItemCollection.Active.GetItemSprite(this);
        public ItemIcon Icon => ItemCollection.Active.GetItemIcon(this);

        public int Hash => $"{Id}.{Modifier?.Id}.{Modifier?.Level}".GetHashCode();
        public bool IsEquipment => Params.Type == ItemType.Armor || Params.Type == ItemType.Helmet || Params.Type == ItemType.Weapon || Params.Type == ItemType.Shield;
        public bool IsWeapon => Params.Type == ItemType.Weapon;
        public bool IsShield => Params.Type == ItemType.Shield;
        public bool IsDagger => Params.Class == ItemClass.Dagger;
        public bool IsSword => Params.Class == ItemClass.Sword;
        public bool IsAxe => Params.Class == ItemClass.Axe;
        public bool IsWand => Params.Class == ItemClass.Wand;
        public bool IsBlunt => Params.Class == ItemClass.Blunt;
        public bool IsLance => Params.Class == ItemClass.Lance;
        public bool IsMelee => Params.Type == ItemType.Weapon && Params.Class != ItemClass.Bow;
        public bool IsBow => Params.Class == ItemClass.Bow;
        public bool IsFirearm => Params.Class == ItemClass.Firearm;
        public bool IsOneHanded => !IsTwoHanded;
        public bool IsTwoHanded => Params.Class == ItemClass.Bow || Params.Tags.Contains(ItemTag.TwoHanded);
    }
}