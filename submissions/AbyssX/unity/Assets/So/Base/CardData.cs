using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;

namespace  Abyss.Core
{
    [Serializable]
    [CreateAssetMenu(fileName = "CardData",menuName = "ScriptableObject/CardData", order = 3)]
    public class CardData : ScriptableObject
    {
        public int id;
        [FormerlySerializedAs("name")] public string cardName;
        public int[] cost;
        public int[] valueX;
        public int[] valueY;
        public bool[] consumable; 
        public string desc;
        public string sprite;
    }

}
