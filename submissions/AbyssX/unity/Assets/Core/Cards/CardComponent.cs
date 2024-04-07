
using UnityEngine;
using UnityEngine.Pool;
using UnityGameFramework.Runtime;
using System.Collections.Generic;
using System.Linq;
using UnityEngine.Serialization;

namespace Abyss.Core
{
    public class CardComponent : GameFrameworkComponent
    {
        [SerializeField]
        private GameObject _modelItem;
        private static ObjectPool<GameObject> _pool;

        [FormerlySerializedAs("cardDatas")] public List<CardData> cardDataSet;

        public Dictionary<int, CardData> cardDatas;
        protected  void Awake()
        {
            _pool = new ObjectPool<GameObject>(() => GameObject.Instantiate(_modelItem));
            cardDatas = cardDataSet.ToDictionary(x => x.id);
        }

        public static T GetCard<T>(CardData cardData) where T : BaseCard
        {
            var go = _pool.Get();
            var baseCard = go.GetOrAddComponent<T>();
            baseCard.SetCardData(cardData);
            return baseCard;
        }

    }
}