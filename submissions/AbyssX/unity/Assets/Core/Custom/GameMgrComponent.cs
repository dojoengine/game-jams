using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Abyss.Utils;
using Assets.HeroEditor.Common.Scripts.Common;
using GameFramework.Event;
using GameFramework.Resource;
using UnityEditor;
using UnityGameFramework.Runtime;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
namespace Abyss.Core
{
    public class GameMgrComponent : GameFrameworkComponent
    {
        [SerializeField]
        private Transform root;
       [HideInInspector] public LinkedList<ICard> cardDeck;
       [HideInInspector] public LinkedList<ICard> handCard;
       [HideInInspector] public LinkedList<ICard> discardCard;

        public int Gold => protagonist.Properties[GameResource.Gold];
        public int Hp => protagonist.Properties[GameResource.Hp];
        
        [HideInInspector]
        public int currentVigor = -1;
        [HideInInspector]
        public int maxVigor = -1;
        [HideInInspector]
        public int maxHp = -1;

        public E_Hero CurrentType;

        public static Type[] WarriorCards = new Type[]
        {
            typeof(AttackCard), typeof(AttackCard), typeof(DefenseCard), typeof(DefenseCard), typeof(FeverCard), typeof(AttackCard), typeof(DefenseCard), /*1010, 1014, 1012, 1004, 1013, 1005, 1006, 1011, 1007, 1009, 1008, 1015, 1002*/
            typeof(AttackCard), typeof(AttackCard), typeof(DefenseCard), typeof(DefenseCard), typeof(FeverCard), typeof(AttackCard), typeof(DefenseCard), typeof(SmashCard) /*1010, 1014, 1012, 1004, 1013, 1005, 1006, 1011, 1007, 1009, 1008, 1015, 1002*/
        };

        public IHero protagonist
        {
            get;
            private set;
        }

        public RoleBase Enemy {
            get;
            set;
        }

        protected void OnEnable()
        {
        }

        private void OnDisable()
        {
            // Entry.Event.Unsubscribe(GameOverArgs);
            Entry.Event.Unsubscribe(PropertyModifyEventArgs.EventId, OnHeroPropertyChanged);
        }

        private void Regist()
        {
            if (Entry.Event.Check(PropertyModifyEventArgs.EventId, OnHeroPropertyChanged))
            {
                Entry.Event.Unsubscribe(PropertyModifyEventArgs.EventId, OnHeroPropertyChanged);
            }
            Entry.Event.Subscribe(PropertyModifyEventArgs.EventId, OnHeroPropertyChanged);
        }

        public void Init(E_Hero heroType)
        {
            CurrentType = heroType;
            var hero = default(IHero);
            Type heroCSType = null;
            string assetPath = string.Empty;
            switch (heroType)
            {
                case E_Hero.Mage:
                    assetPath = EntityPath.Mage;
                    heroCSType = typeof(Mage);
                    break;
                case E_Hero.Rogue:
                    assetPath = EntityPath.Rogue;
                    heroCSType = typeof(Rogue);
                    break;
                case E_Hero.Warrior:
                    assetPath = EntityPath.Rogue;
                    heroCSType = typeof(Rogue);
                    break;
            }
            Log.Error("Enter =========");
            SceneManager.GetSceneByName("2");
            Entry.Resource.LoadAsset(assetPath, new LoadAssetCallbacks(OnLoadProtagonist), heroCSType);
            Entry.Resource.LoadAsset(EntityPath.Enemy1, new LoadAssetCallbacks(OnLoadEnemy));
        }
        
        private void OnLoadEnemy(string name, object asset, float duration, object data)
        {

            // Enemy = (RoleBase) Instantiate((GameObject)asset).GetOrAddComponent<Enemy>();
            Enemy.Properties[GameResource.MaxHp] = 100;
            Enemy.PresetSlider(100, 100);
        }

        private void OnLoadProtagonist(string name, object asset, float duration, object data)
        {
            if (data is not Type type)
            {
                return;
            }
            protagonist = (IHero)Instantiate((GameObject)asset).GetOrAddComponent(type);
            protagonist.Properties[GameResource.MaxHp] = 100;
            (protagonist as RoleBase).PresetSlider(100, 100);
            InitMgrData();
            GetShuffledCards(CurrentType);
        }

        public int[] GetShuffledCards(E_Hero heroType)
        {
            Type[] arr;
            switch (heroType)
            {
                case E_Hero.Mage:
                case E_Hero.Rogue:
                case E_Hero.Warrior:
                    arr = WarriorCards;    
                    break;
                default:
                    arr = new Type[] { };
                    break;
            }

            LinkedList<ICard> cardDeck = new LinkedList<ICard>();
            CardUtils.Shuffle(arr.ToArray());
            CardsToHold = arr;
            //Entry.UI.GetUIForm("BattleForm").GetComponent<BattleLogic>().SetCard(arr);
            return null;
        }

        public Type[] CardsToHold;



        private void InitMgrData()
        {
            cardDeck =  new LinkedList<ICard>();
            handCard =  new LinkedList<ICard>();
            discardCard = new LinkedList<ICard>();
            
            maxVigor = protagonist.Properties[GameResource.MaxVigor] = 3;
            currentVigor = maxVigor;

            SwitchIntoBattle();
        }

        private void SwitchIntoBattle()
        {
            Entry.UI.CloseAllLoadedUIForms();
            SceneManager.LoadScene(ScenePath.Battle,LoadSceneMode.Additive);
            SceneManager.MoveGameObjectToScene(root.gameObject, SceneManager.GetSceneByName("Battle"));
            Entry.UI.OpenUIForm(UiFormPath.BattleForm, "Layer0");
        }

        private void OnHeroPropertyChanged(object sender, GameEventArgs args)
        {
            if (protagonist == null)
            {
                return;
            }
            if (args is not PropertyModifyEventArgs prop)
            {
                return;
            }

            if (prop.target != protagonist)
            {
                return;
            }
        } 
        
        public void SetBattleForm( BattleLogic battle)
        {
            if (battle != null)
            {
                
            }
            else
            {
                
            }
        }


    }
}