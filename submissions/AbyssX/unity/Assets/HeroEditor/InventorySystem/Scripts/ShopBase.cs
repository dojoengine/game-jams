using System;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;
using Assets.HeroEditor.InventorySystem.Scripts.Elements;
using UnityEngine;
using UnityEngine.UI;

namespace Assets.HeroEditor.InventorySystem.Scripts
{
    /// <summary>
    /// High-level shop interface.
    /// </summary>
    public class ShopBase : ItemWorkspace
    {
        public ScrollInventory TraderInventory;
        public ScrollInventory PlayerInventory;
        public InputField AmountInput;
        public Button BuyButton;
        public Button SellButton;
        public AudioSource AudioSource;
        public AudioClip TradeSound;
        public AudioClip NoMoney;
        public Character Dummy;
        public bool CanBuy = true;
        public bool CanSell = true;
        public bool ExampleInitialize;

        public Action<Item> OnRefresh; // Can be used to customize shop behaviour;
        public Action<Item> OnBuy;
        public Action<Item> OnSell;
        public int Amount;

        public void Awake()
        {
            ItemCollection.Active = ItemCollection;
        }

        public void Start()
        {
            if (ExampleInitialize)
            {
                TestInitialize();
            }
        }

        /// <summary>
        /// Initialize owned items and trader items (just for example).
        /// </summary>
        public void TestInitialize()
        {
            var inventory = new List<Item> { new Item(CurrencyId, 10000) };
            var shop = ItemCollection.Active.Items.Select(i => new Item(i.Id, 2)).ToList();

            shop.Single(i => i.Id == CurrencyId).Count = 99999;

            RegisterCallbacks();
            TraderInventory.Initialize(ref shop);
            PlayerInventory.Initialize(ref inventory);

            if (!TraderInventory.SelectAny() && !PlayerInventory.SelectAny())
            {
                ItemInfo.Reset();
            }
        }

        public void Initialize(ref List<Item> traderItems, ref List<Item> playerItems)
        {
            RegisterCallbacks();
            TraderInventory.Initialize(ref traderItems);
            PlayerInventory.Initialize(ref playerItems);

            if (!TraderInventory.SelectAny() && !PlayerInventory.SelectAny())
            {
                ItemInfo.Reset();
            }
        }

        public void RegisterCallbacks()
        {
            InventoryItem.OnLeftClick = SelectItem;
            InventoryItem.OnRightClick = InventoryItem.OnDoubleClick = QuickAction;
        }

        public int GetPrice(Item item) // Modify this function to fit your needs!
        {
            var trader = TraderInventory.Items.Contains(item);
            var price = item.Params.Price * Amount;

            if (trader)
            {
                price *= GetTraderMarkup(item);
            }

            return price;
        }

        public static int GetTraderMarkup(Item item) // Modify this function to fit your needs!
        {
            if (item.Params.Rarity > ItemRarity.Common) return 2;

            switch (item.Params.Type)
            {
                case ItemType.Weapon:
                case ItemType.Armor:
                case ItemType.Helmet:
                case ItemType.Shield:
                case ItemType.Backpack: return 3;
                default: return 2;
            }
        }

	    public void SelectItem(Item item)
        {
            SelectedItem = item;
            SetAmount(1);
            ItemInfo.Initialize(SelectedItem, GetPrice(SelectedItem), TraderInventory.Items.Contains(item));
            Refresh();
        }

        public void QuickAction(Item item)
        {
            SelectItem(item);

            if (TraderInventory.Items.Contains(item))
            {
                Buy();
            }
            else
            {
                Sell();
            }
        }

        public void Buy()
        {
			if (!BuyButton.gameObject.activeSelf || !BuyButton.interactable || !CanBuy) return;

            var price = GetPrice(SelectedItem);

            if (GetCurrency(PlayerInventory, CurrencyId) < price)
            {
                Debug.LogWarning("You don't have enough gold!");
                AudioSource.PlayOneShot(NoMoney, SfxVolume);

                return;
            }

            OnBuy?.Invoke(SelectedItem);
            AddMoney(PlayerInventory, -price, CurrencyId);
			AddMoney(TraderInventory, price, CurrencyId);
            MoveItem(SelectedItem, TraderInventory, PlayerInventory, Amount, currencyId: CurrencyId);
            AudioSource.PlayOneShot(TradeSound, SfxVolume);
        }

        public void Sell()
        {
	        if (!SellButton.gameObject.activeSelf || !SellButton.interactable) return;

            var price = GetPrice(SelectedItem);

            if (GetCurrency(TraderInventory, CurrencyId) < price)
            {
                Debug.LogWarning("Trader doesn't have enough gold!");
                AudioSource.PlayOneShot(NoMoney, SfxVolume);

                return;
            }

            OnSell?.Invoke(SelectedItem);
            AddMoney(PlayerInventory, price, CurrencyId);
            AddMoney(TraderInventory, -price, CurrencyId);
            MoveItem(SelectedItem, PlayerInventory, TraderInventory, Amount, currencyId: CurrencyId);
            AudioSource.PlayOneShot(TradeSound, SfxVolume);
        }

        public override void Refresh()
        {
            if (SelectedItem == null)
            {
                ItemInfo.Reset();
                BuyButton.SetActive(false);
                SellButton.SetActive(false);
            }
            else
            {
                if (TraderInventory.Items.Contains(SelectedItem))
                {
                    InitBuy();
                }
                else if (PlayerInventory.Items.Contains(SelectedItem))
                {
                    InitSell();
                }
                else if (TraderInventory.Items.Any(i => i.Hash == SelectedItem.Hash))
                {
                    InitBuy();
                }
                else if (PlayerInventory.Items.Any(i => i.Hash == SelectedItem.Hash))
                {
                    InitSell();
                }
            }

            OnRefresh?.Invoke(SelectedItem);
        }

        public void SetMinAmount()
        {
            SetAmount(1);
        }

        public void IncAmount(int value)
        {
            SetAmount(Amount + value);
        }

        public void SetMaxAmount()
        {
            SetAmount(SelectedItem.Count);
        }

        public void OnAmountChanged(string value)
        {
            if (value.IsEmpty()) return;

            SetAmount(int.Parse(value));
        }

        public void OnAmountEndEdit(string value)
        {
            if (value.IsEmpty())
            {
                SetAmount(1);
            }
        }

        private void SetAmount(int amount)
        {
            Amount = Mathf.Max(1, Mathf.Min(SelectedItem.Count, amount));
            AmountInput?.SetTextWithoutNotify(Amount.ToString());
            ItemInfo.UpdatePrice(SelectedItem, GetPrice(SelectedItem), TraderInventory.Items.Contains(SelectedItem));
        }

        private void InitBuy()
        {
            BuyButton.SetActive(SelectedItem.Params.Type != ItemType.Currency && SelectedItem.Count > 0 && !SelectedItem.Params.Tags.Contains(ItemTag.NotForSale) && !SelectedItem.Params.Tags.Contains(ItemTag.Quest) && CanBuy);
            SellButton.SetActive(false);
            //BuyButton.interactable = GetCurrency(PlayerInventory, CurrencyId) >= SelectedItem.Params.Price;
        }

        private void InitSell()
        {
            BuyButton.SetActive(false);
            SellButton.SetActive(SelectedItem.Count > 0 && !SelectedItem.Params.Tags.Contains(ItemTag.NotForSale) && !SelectedItem.Params.Tags.Contains(ItemTag.Quest) && SelectedItem.Id != CurrencyId && CanSell);
            //SellButton.interactable = GetCurrency(Trader, CurrencyId) >= SelectedItem.Params.Price;
        }

        public static long GetCurrency(ItemContainer bag, string currencyId)
        {
            var currency = bag.Items.SingleOrDefault(i => i.Id == currencyId);

            return currency?.Count ?? 0;
        }

        private static void AddMoney(ItemContainer inventory, int value, string currencyId)
        {
            var currency = inventory.Items.SingleOrDefault(i => i.Id == currencyId);

            if (currency == null)
            {
                inventory.Items.Insert(0, new Item(currencyId, value));
            }
            else
            {
                currency.Count += value;

                if (currency.Count == 0)
                {
                    inventory.Items.Remove(currency);
                }
            }
        }
    }
}