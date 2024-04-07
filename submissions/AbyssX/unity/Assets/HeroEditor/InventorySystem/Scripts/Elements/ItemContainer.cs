using System.Collections.Generic;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using UnityEngine;

namespace Assets.HeroEditor.InventorySystem.Scripts.Elements
{
    /// <summary>
    /// Abstract item container. It can be inventory bag, player equipment or trader goods.
    /// </summary>
    public abstract class ItemContainer : MonoBehaviour
    {
        /// <summary>
        /// List of items.
        /// </summary>
        public List<Item> Items { get; protected set; } = new List<Item>();

        [Header("Settings")]
        public bool Stacked = true;
        public bool AutoSelect = true;

        public abstract void Refresh(Item selected);

        public void Initialize(ref List<Item> items, Item selected = null)
        {
            Items = items;
            Refresh(selected);
        }
    }
}