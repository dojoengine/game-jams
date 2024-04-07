using System;
using System.Linq;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using UnityEngine;

namespace Assets.HeroEditor.InventorySystem.Scripts.Elements
{
    /// <summary>
    /// Abstract item workspace. It can be shop or player inventory. Items can be managed here (selected, moved and so on).
    /// </summary>
    public abstract class ItemWorkspace : MonoBehaviour
    {
        public ItemCollection ItemCollection;
        public ItemInfo ItemInfo;

        public static float SfxVolume = 1;
        public const string CurrencyId = "Gold";

        public Item SelectedItem { get; protected set; }
        
        public abstract void Refresh();

        protected void Reset()
        {
            SelectedItem = null;
            ItemInfo.Reset();
        }

        protected void MoveItem(Item item, ItemContainer from, ItemContainer to, int amount = 1, string currencyId = null)
        {
            MoveItemSilent(item, from, to, amount);
            
            var moved = to.Items.Last(i => i.Hash == item.Hash);

            if (from.Stacked)
            {
                if (item.Count == 0)
                {
                    SelectedItem = currencyId == null ? moved : from.Items.Single(i => i.Id == currencyId);
                }
            }
            else
            {
                SelectedItem = from.Items.LastOrDefault(i => i.Hash == item.Hash) ?? moved;
            }

            Refresh();
            from.Refresh(SelectedItem);
            to.Refresh(SelectedItem);
        }

        public void MoveItemSilent(Item item, ItemContainer from, ItemContainer to, int amount = 1)
        {
            if (item.Count <= 0) throw new ArgumentException("item.Count <= 0");
            if (amount <= 0) throw new ArgumentException("amount <= 0");
            if (item.Count < amount) throw new ArgumentException("item.Count < amount");

            if (to.Stacked)
            {
                var target = to.Items.SingleOrDefault(i => i.Hash == item.Hash);

                if (target == null)
                {
                    to.Items.Add(new Item(item.Id, item.Modifier, amount));
                }
                else
                {
                    target.Count += amount;
                }
            }
            else
            {
                to.Items.Add(new Item(item.Id, item.Modifier, amount));
            }

            var moved = to.Items.Last(i => i.Hash == item.Hash);

            if (from.Stacked)
            {
                item.Count -= amount;

                if (item.Count == 0)
                {
                    from.Items.Remove(item);
                }
            }
            else
            {
                from.Items.Remove(item);
            }
        }
    }
}