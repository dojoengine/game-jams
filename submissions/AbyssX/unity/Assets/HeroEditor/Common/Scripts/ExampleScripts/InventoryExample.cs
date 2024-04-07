using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.InventorySystem.Scripts;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Elements;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.ExampleScripts
{
    public class InventoryExample : MonoBehaviour
    {
        public ItemCollection ItemCollection;
        public ScrollInventory Inventory;
        public Character Character;
        public AppearanceExample AppearanceExample;

        public void Awake()
        {
            // You must to set an active collection (as there may be several different collections in Resources).
            ItemCollection.Active = ItemCollection;
        }

        public void Start()
        {
            var items = ItemCollection.Items.Select(i => new Item(i.Id)).ToList();

            InventoryItem.OnLeftClick = item =>
            {
                Character.Equip(item);
                AppearanceExample.Refresh();
            };
            Inventory.Initialize(ref items);
        }
    }
}