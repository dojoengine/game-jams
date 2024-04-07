using System;
using System.Collections.Generic;
using Abyss.Core;
using GameFramework.Resource;

namespace Abyss.Utils
{
    public static class CardUtils
    {
        public static Dictionary<Type, string> CardDic = new Dictionary<Type, string> {
            { typeof(AttackCard) , EntityPath.CardAttack},
            { typeof(AvatarCard) , EntityPath.CardAvatar},
            { typeof(DefenseCard) , EntityPath.CardDefense},
            { typeof(DefensiveStanceCard) , EntityPath.CardDefensiveStance},
            { typeof(BastionCard) , EntityPath.CardBastion},
            { typeof(BerserkerStanceCard) , EntityPath.CardBerserkerStance},
            { typeof(BladeDanceCard) , EntityPath.CardBloodBath},
            { typeof(BloodBathCard) , EntityPath.CardBloodBath},
            { typeof(BloodThristCard) , EntityPath.CardBloodThrist},
            { typeof(FeverCard) , EntityPath.CardFever},
            { typeof(SmashCard) , EntityPath.CardSmash},
        }; 
        public static void Shuffle<T>(T[] array)
        {
            Random rng = new Random();
            int n = array.Length;

            // 从数组的第一个元素到最后一个元素进行遍历
            for (int i = 0; i < n; i++)
            {
                // 生成一个介于i和n-1之间的随机索引j
                int j = rng.Next(i, n);

                // 交换数组中的元素array[i]与array[j]
                (array[i], array[j]) = (array[j], array[i]);
            }
        }

        public static void CreateCard(string assetPath , LoadAssetSuccessCallback callBack = null)
        {
            Entry.Resource.LoadAsset(assetPath , new LoadAssetCallbacks(callBack));
        }
    }
}