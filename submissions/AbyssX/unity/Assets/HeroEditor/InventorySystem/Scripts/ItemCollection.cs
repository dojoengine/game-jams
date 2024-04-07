using System;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.Collections;
using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.Common.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;
using HeroEditor.Common;
using HeroEditor.Common.Data;
using UnityEngine;

namespace Assets.HeroEditor.InventorySystem.Scripts
{
    [CreateAssetMenu(fileName = "ItemCollection", menuName = "HeroEditor/ItemCollection")]
    public class ItemCollection : ScriptableObject
    {
        [Header("Main")]
        public List<SpriteCollection> SpriteCollections;
        public List<IconCollection> IconCollections;
        public List<ItemParams> Items;

        [Header("Extra")]
        public Sprite BackgroundBlue;
        public Sprite BackgroundBrown;
        public Sprite BackgroundGreen;
        public Sprite BackgroundGrey;
        public Sprite BackgroundPurple;
        public Sprite BackgroundRed;

        public static ItemCollection Active;

        private Dictionary<string, ItemSprite> _itemSprites;
        private Dictionary<string, ItemIcon> _itemIcons;

        public ItemParams GetItemParams(Item item)
        {
            var itemParams = Items.SingleOrDefault(i => i.Id == item.Id);

            if (itemParams == null)
            {
                throw new Exception($"Item params not found: {item.Id}");
            }

            return itemParams;
        }

        public ItemSprite GetItemSprite(Item item)
        {
            if (_itemSprites == null)
            {
                _itemSprites = CacheSprites();
            }

            var itemParams = GetItemParams(item);

            if (itemParams.SpriteId == null) return null;

            if (_itemSprites.ContainsKey(itemParams.SpriteId))
            {
                return _itemSprites[itemParams.SpriteId];
            }

            Debug.LogWarning($"Sprite not found: {itemParams.SpriteId}");

            return null;
        }

        public ItemIcon GetItemIcon(Item item)
        {
            if (_itemIcons == null)
            {
                _itemIcons = CacheIcons();
            }

            var itemParams = GetItemParams(item);

            if (itemParams.IconId == null) return null;

            if (_itemIcons.ContainsKey(itemParams.IconId))
            {
                return _itemIcons[itemParams.IconId];
            }

            Debug.LogWarning($"Icon not found: {itemParams.IconId}");

            return null;
        }

        /// <summary>
        /// Can be used to find sprites directly, with no existing items needed.
        /// </summary>
        public Sprite FindSprite(string spriteId)
        {
            if (_itemSprites == null)
            {
                _itemSprites = CacheSprites();
            }

            if (spriteId != null && _itemSprites.ContainsKey(spriteId))
            {
                return _itemSprites[spriteId].Sprite;
            }

            Debug.LogWarning($"Sprite not found: {spriteId}");

            return null;
        }

        /// <summary>
        /// Can be used to find icons directly, with no existing items needed.
        /// </summary>
        public Sprite FindIcon(string iconId)
        {
            if (_itemIcons == null)
            {
                _itemIcons = CacheIcons();
            }

            if (iconId != null && _itemIcons.ContainsKey(iconId))
            {
                return _itemIcons[iconId].Sprite;
            }

            Debug.LogWarning($"Icon not found: {iconId}");

            return null;
        }

        public Func<Item, Sprite> GetBackgroundCustom;

        public Sprite GetBackground(Item item)
        {
            if (GetBackgroundCustom != null) return GetBackgroundCustom(item) ?? BackgroundBrown;

            switch (item.Params.Rarity)
            {
                case ItemRarity.Legacy: return BackgroundGrey;
                case ItemRarity.Basic: return BackgroundGrey;
                case ItemRarity.Common: return BackgroundBrown;
                case ItemRarity.Rare: return BackgroundRed;
                case ItemRarity.Epic: return BackgroundBlue;
                case ItemRarity.Legendary: return BackgroundPurple;
                default: throw new NotImplementedException();
            }
        }

        public void Reset()
        {
            _itemSprites = null;
            _itemIcons = null;
        }

        private Dictionary<string, ItemSprite> CacheSprites()
        {
            var dict = new Dictionary<string, ItemSprite>();

            foreach (var sprite in SpriteCollections.SelectMany(i => i.GetAllSprites()))
            {
                if (!dict.ContainsKey(sprite.Id))
                {
                    dict.Add(sprite.Id, sprite);
                }
            }

            return dict;
        }

        private Dictionary<string, ItemIcon> CacheIcons()
        {
            var dict = new Dictionary<string, ItemIcon>();

            foreach (var icon in IconCollections.SelectMany(i => i.Icons))
            {
                if (!dict.ContainsKey(icon.Id))
                {
                    dict.Add(icon.Id, icon);
                }
            }

            return dict;
        }
    }
}