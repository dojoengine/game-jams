using System;
using System.Collections;
using Assets.HeroEditor.InventorySystem.Scripts.Data;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Assets.HeroEditor.InventorySystem.Scripts.Elements
{
    /// <summary>
    /// Represents inventory item.
    /// </summary>
    public class InventoryItem : MonoBehaviour, IPointerClickHandler, IPointerEnterHandler, IPointerExitHandler
    {
        public Image Icon;
        public Image Background;
        public Image Frame;
        public Text Count;
        public Toggle Toggle;
        
        [Header("Extra")]
        public Sprite IconEmpty;
        public Sprite IconMissed;
        public GameObject Modificator;

        public Item Item { get; private set; }
        
        private Action _scheduled;
        private float _clickTime;

        /// <summary>
        /// These actions should be set when inventory UI is opened.
        /// </summary>
        public static Action<Item> OnLeftClick;
        public static Action<Item> OnRightClick;
        public static Action<Item> OnDoubleClick;
        public static Action<Item> OnMouseEnter;
        public static Action<Item> OnMouseExit;

        public void OnEnable()
        {
            if (_scheduled != null)
            {
                StartCoroutine(ExecuteScheduled());
            }
        }

        public void Initialize(Item item, ToggleGroup toggleGroup = null)
        {
            Item = item;
            
            if (Item == null)
            {
                Reset();
                return;
            }

            Icon.enabled = true;
            Icon.sprite = item.Id == null ? IconEmpty : ItemCollection.Active.GetItemIcon(Item)?.Sprite ?? IconMissed;
            Background.sprite = ItemCollection.Active.GetBackground(Item) ?? Background.sprite;
            Background.color = Color.white;
            Frame.raycastTarget = true;

            if (Count)
            {
                Count.enabled = true;
                Count.text = item.Count.ToString();
            }

            if (Toggle)
            {
                Toggle.group = toggleGroup ?? GetComponentInParent<ToggleGroup>();
            }

            if (Modificator)
            {
                var mod = Item.Modifier != null && Item.Modifier.Id != ItemModifier.None;

                Modificator.SetActive(mod);

                if (mod)
                {
                    Modificator.GetComponentInChildren<Text>().text = Item.Modifier.Id.ToString().ToUpper()[0].ToString();
                }
            }
        }

        public void Reset()
        {
            Icon.enabled = false;
            Icon.sprite = null;
            Background.sprite = ItemCollection.Active.BackgroundBrown ?? Background.sprite;
            Background.color = new Color32(150, 150, 150, 255);
            Frame.raycastTarget = false;

            if (Count) Count.enabled = false;
            if (Toggle) { Toggle.group = null; Toggle.SetIsOnWithoutNotify(false); }
            if (Modificator) Modificator.SetActive(false);
        }

        public void OnPointerClick(PointerEventData eventData)
        {
            StartCoroutine(OnPointerClickDelayed(eventData));
        }

        private IEnumerator OnPointerClickDelayed(PointerEventData eventData) // TODO: A workaround. We should wait for initializing other components.
        {
            yield return null;

            OnPointerClick(eventData.button);
        }

        public void OnPointerEnter(PointerEventData eventData)
        {
            OnMouseEnter?.Invoke(Item);
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            OnMouseExit?.Invoke(Item);
        }

        public void OnPointerClick(PointerEventData.InputButton button)
        {
            if (button == PointerEventData.InputButton.Left)
            {
                OnLeftClick?.Invoke(Item);

                var delta = Mathf.Abs(Time.time - _clickTime);

                if (delta < 0.5f) // If double click.
                {
                    _clickTime = 0;
                    
                    if (OnDoubleClick != null)
                    {
                        StartCoroutine(ExecuteInNextUpdate(() => OnDoubleClick(Item)));
                    }
                }
                else
                {
                    _clickTime = Time.time;
                }
            }
            else if (button == PointerEventData.InputButton.Right)
            {
                OnRightClick?.Invoke(Item);
            }
        }

        private static IEnumerator ExecuteInNextUpdate(Action action)
        {
            yield return null;

            action();
        }

        public void Select(bool selected)
        {
            if (Toggle == null) return;

            if (gameObject.activeInHierarchy || !selected)
            {
                Toggle.isOn = selected;
            }
            else
            {
                _scheduled = () => Toggle.isOn = true;
            }

            if (selected)
            {
                OnLeftClick?.Invoke(Item);
            }
        }

        private IEnumerator ExecuteScheduled()
        {
            yield return null;

            _scheduled();
            _scheduled = null;
        }
    }
}