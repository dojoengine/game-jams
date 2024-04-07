using System;
using System.Collections.Generic;
using GameFramework.Entity;
using GameFramework.ObjectPool;
using Unity.VisualScripting;
using DG.Tweening;
using GameFramework.Resource;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using Vector2 = System.Numerics.Vector2;

namespace Abyss.Core
{
    public abstract class BaseCard : MonoBehaviour, ICard ,IPointerEnterHandler, IPointerExitHandler
    {
        private static long IncId;
        public long CardId { get; private set; }
        [HideInInspector] protected Text txt_name;
        [HideInInspector] protected Text txt_desc;
        [HideInInspector] protected Text txt_cost;
        [HideInInspector] protected Image img_card;
        
        private Vector3 originPos;
        
        public abstract bool NeedSelect { get; set; }
        private void InitUI()
        {
            txt_name = transform.Find("Face/txt_name").GetComponent<Text>();
            txt_desc = transform.Find("Face/txt_desc").GetComponent<Text>();
            txt_cost = transform.Find("Face/Image/txt_cost").GetComponent<Text>();
            img_card = transform.Find("Face/img_icon").GetComponent<Image>();
        }

        public abstract void InitCardBuffs();

        protected virtual void Awake()
        {
            this.CardId = IncId++;
            InitUI();
        }

        public void OnPointerEnter(PointerEventData eventData)
        {
            Debug.LogError("OnPointerEnter");
            this.transform.localScale =  Vector3.one * 1.1f;
            originPos = transform.position;
            transform.position += Vector3.up * 20f;
        }

        public void OnBig()
        {
            Debug.LogError("OnPointerEnter");
            this.transform.localScale =  Vector3.one * 1.1f;
            originPos = transform.position;
            transform.position += Vector3.up * 20f;
        }

        public void OnSmall()
        {
            this.transform.localScale =  Vector3.one * 1f;
            transform.position = originPos;
            originPos = transform.position;
        }

        public void OnVanish()
        {
            transform.DOScale(Vector3.zero, 0.7f).OnComplete(() =>
            {
                gameObject.SetActive(false);
                Director.Instance.battleLogic.layout.enabled = true;
                LayoutRebuilder.ForceRebuildLayoutImmediate(Director.Instance.battleLogic.layout.transform as RectTransform);
            });
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            this.transform.localScale =  Vector3.one * 1f;
            transform.position = originPos;
            originPos = transform.position;
        }
        protected void InitText() {
            txt_name.text = modelData.name;
            txt_desc.text = modelData.desc;
            txt_cost.text = modelData.cost.ToString();
        }

        protected void LoadAssetSuccessfulCallBack(string assetName, object asset, float c, object d)
        {
            this.modelData = (CardData)asset;
            InitText();
        }

        private void InitLoadAssetCallBacks()
        {
            loadAssetCallbacks = new LoadAssetCallbacks(LoadAssetSuccessfulCallBack);
        }

        /// <summary>
        ///  单体 or aoe
        /// </summary>
        public bool singleTarget { get; private set; }

        private bool m_faceUp;

        public IRole owner { get; set; }

        public bool FaceUp
        {
            get => m_faceUp;
            set
            {
                m_faceUp = value;
                Flip();
            }
        }

        [SerializeField] public CardData modelData;

        public abstract IBuff[] buffs { get; protected set; }

        public bool isUpgraded { get; set; }

        /// <summary>   
        /// 卡牌翻面    
        /// </summary>
        private void Flip()
        {
            //沿着X轴旋转90度
            transform.DOLocalRotateQuaternion(Quaternion.Euler(0, m_faceUp ? 0 : 180, 0), 0.5f);
        }

        private void Upgrade()
        {
            
        }

        public void SetCardData(CardData cardData)
        {
            this.modelData = cardData;
        }

        public abstract void Apply(IRole[] targets);
        public virtual void OnInit(int entityId, string entityAssetName, IEntityGroup entityGroup, bool isNewInstance,
            object userData)
        {
        }

        public virtual void OnRecycle()
        {
        }

        public virtual void OnShow(object userData)
        {
        }

        public virtual void OnHide(bool isShutdown, object userData)
        {
        }

        public virtual void OnAttached(IEntity childEntity, object userData)
        {
        }

        public virtual void OnDetached(IEntity childEntity, object userData)
        {
        }

        public virtual void OnAttachTo(IEntity parentEntity, object userData)
        {
        }

        public virtual void OnDetachFrom(IEntity parentEntity, object userData)
        {
        }

        public virtual void OnUpdate(float elapseSeconds, float realElapseSeconds)
        {
        }
        private void OnLoadSuccessful(string name, object asset, float duration, object data) {
            modelData = (CardData)asset;
            InitText();
        }

        protected LoadAssetCallbacks loadAssetCallbacks;
        public int Id { get; }
        public string EntityAssetName { get; }
        public object Handle { get; }
        public IEntityGroup EntityGroup { get; }

        protected BaseCard()
        {
             
        }


    }
}