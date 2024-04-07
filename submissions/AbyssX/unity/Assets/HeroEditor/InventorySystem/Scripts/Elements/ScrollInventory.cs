using System;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;
using UnityEngine;
using UnityEngine.UI;

namespace Assets.HeroEditor.InventorySystem.Scripts.Elements
{
    /// <summary>
    /// Scrollable item container that can display item list. Automatic vertical scrolling.
    /// </summary>
    public class ScrollInventory : ItemContainer
    {
        public bool AutoSorting;
        public bool HideCountLabels;

        [Header("UI")]
        public ScrollRect ScrollRect;
        public GridLayoutGroup Grid;
        public InventoryItem ItemPrefab;

        public Func<Item, int> SortingFunc = item => TypePriority.IndexOf(item.Params.Type); // You can override this.
        public Func<Item, bool> FilterFunc; // You can override this.

        public Action OnRefresh;

        private static readonly List<ItemType> TypePriority = new List<ItemType>
        {
            ItemType.Currency,
            ItemType.Supply,
            ItemType.Weapon,
            ItemType.Armor,
            ItemType.Helmet,
            ItemType.Shield,
            ItemType.Backpack,
            ItemType.Jewelry,
            ItemType.Loot,
            ItemType.Recipe,
            ItemType.Material
		};

        private readonly List<InventoryItem> _itemInstances = new List<InventoryItem>(); // Reusing instances to reduce Instantiate() calls.
        private int _hash;

        public void Initialize(ref List<Item> items, Item selected, bool reset = false)
        {
            base.Initialize(ref items, selected);

			if (reset) _hash = 0;
		}

        public void Initialize(ref List<Item> items, bool reset = false)
        {
            base.Initialize(ref items);
            ResetNormalizedPosition();

            if (reset) _hash = 0;
        }

        public void SelectItem(Item item)
        {
            _itemInstances.FirstOrDefault(i => i.Item == item)?.Select(true);
        }

        public bool SelectAny()
        {
            var any = _itemInstances.FirstOrDefault(i => i.Item != null);

            if (any == null) return false;

            any.Select(true);

            return true;
        }

		public void SetTypeFilter(string input)
        {
            var type = input.ToEnum<ItemType>();

			SetTypeFilter(new List<ItemType> { type });
        }

		public void SetTypeFilter(List<ItemType> types)
        {
            FilterFunc = item => types.Contains(item.Params.Type);
			Refresh(null, force: true);
        }

        public void UnsetFilter()
        {
            FilterFunc = null;
            Refresh(null, force: true);
        }

		public override void Refresh(Item selected)
        {
            Refresh(selected, force: false);
        }

        public void Refresh(Item selected, bool force)
		{
            if (Items == null) return;

            List<Item> items;

            if (AutoSorting && SortingFunc != null)
            {
                items = new List<Item>();
                var groups = Items.OrderBy(SortingFunc).ToList().GroupBy(i => i.Params.Type);
                
                foreach (var group in groups)
                {
                    items.AddRange(group.OrderBy(i => i.Params.Class).ThenBy(i => i.Params.Price));
                }
            }
            else
            {
                items = Items;
            }

            if (FilterFunc != null)
            {
                items.RemoveAll(i => !FilterFunc(i));
			}

            foreach (var instance in _itemInstances)
            {
                instance.Reset();
                instance.SetActive(false);
            }

            if (!force && _hash == GetHash(items))
            {
                var instances = _itemInstances.Where(i => !i.gameObject.activeSelf && i.Item != null).ToList();

                for (var i = 0; i < items.Count; i++)
                {
                    instances[i].Initialize(items[i]);
				}

                return;
            }

            var toggleGroup = GetComponentInParent<ToggleGroup>();

            for (var i = 0; i < items.Count; i++)
            {
                var instance = GetItemInstance();

                instance.Initialize(items[i], toggleGroup);
                instance.transform.SetSiblingIndex(i);
                instance.Count.enabled = !HideCountLabels;

                if (AutoSelect) instance.Select(items[i] == selected);
            }

            var columns = 0;
		    var rows = 0;

		    switch (Grid.constraint)
		    {
			    case GridLayoutGroup.Constraint.FixedColumnCount:
			    {
				    var height = Mathf.FloorToInt((ScrollRect.GetComponent<RectTransform>().rect.height + Grid.spacing.y) / (Grid.cellSize.y + Grid.spacing.y));

				    columns = Grid.constraintCount;
				    rows = Mathf.Max(height, Mathf.FloorToInt((float) items.Count / columns));
                    rows++;

					break;
			    }
			    case GridLayoutGroup.Constraint.FixedRowCount:
			    {
				    var width = Mathf.FloorToInt((ScrollRect.GetComponent<RectTransform>().rect.width + Grid.spacing.x) / (Grid.cellSize.x + Grid.spacing.x));

				    rows = Grid.constraintCount;
				    columns = Mathf.Max(width, Mathf.FloorToInt((float) items.Count / rows));
                    columns++;

                    break;
			    }
		    }

		    for (var i = items.Count; i < columns * rows; i++)
		    {
                var instance = GetItemInstance();

                instance.Initialize(null);
            }
	        
		    _hash = GetHash(items);

            OnRefresh?.Invoke();
        }

        private InventoryItem GetItemInstance()
        {
            var instance = _itemInstances.FirstOrDefault(i => !i.gameObject.activeSelf);

            if (instance == null)
            {
                instance = Instantiate(ItemPrefab, Grid.transform);
                _itemInstances.Add(instance);
            }
            else
            {
                instance.gameObject.SetActive(true);
            }

            return instance;
        }

        public void ResetNormalizedPosition()
        {
            if (ScrollRect.horizontal) ScrollRect.horizontalNormalizedPosition = 0;
            if (ScrollRect.vertical) ScrollRect.verticalNormalizedPosition = 1;
        }

        private static int GetHash(List<Item> items)
        {
            return string.Join(":", items.Select(i => $"{i.Id}.{i.Modifier?.Id}.{i.Modifier?.Level}.{i.Count}")).GetHashCode();
        }
    }
}