using System;
using System.Collections;
using System.Collections.Generic;
using Abyss.Core.States;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.ExampleScripts;
using DG.Tweening;
using GameFramework.Entity;
using GameFramework.Event;
using GameFramework.Fsm;
using GameFramework.Resource;
using ICSharpCode.SharpZipLib.Core;
using JetBrains.Annotations;
using UnityEngine;
using UnityEngine.XR;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    public abstract class RoleBase: MonoBehaviour, IRole
    {
        private SliderLogic m_SliderLogic;

        private Dictionary<string, int> _properties;
        public Dictionary<string, int> Properties {
            get
            {
                if (_properties == null)
                {
                    _properties = new Dictionary<string, int>()
                    {
                        {GameResource.Vigor, 0},
                        {GameResource.MaxVigor, 0},
                        {GameResource.Hp, 0},
                        {GameResource.MaxHp, 0},
                        {GameResource.Armor, 0},
                        {GameResource.Weakness, 0},
                        {GameResource.Strength, 0},
                        {GameResource.Wounded, 0},  
                    }; 
                }

                return _properties;
            }
            set
            {
                _properties = value;
            }
        }
        private IFsm<RoleBase> roleBaseStates;
        protected List<FsmState<RoleBase>> stateList;

        protected virtual void Awake()
        {
            PresetFsm();
        }

        // public abstract void Attack(IRole target);
        // public abstract void Def(int value);
        
        

        public void PresetSlider(int curValue, int maxValue)
        {
            Entry.Resource.LoadAsset(EntityPath.HpSlider, new LoadAssetCallbacks(OnLoadSliderCallback), new int[]{curValue, maxValue });
        }
        
        private void OnLoadSliderCallback(string assetName, object asset, float c, object d)
        {
            var arr = (d as int[]);
             this.m_SliderLogic = Instantiate((GameObject)asset, transform).GetComponent<SliderLogic>();
            m_SliderLogic.PresetValue(arr[0], arr[1]);
        }

        public void Attack(int value, IHero target) {
            var eventArg = PropertyModifyEventArgs.Create(target, GameResource.Hp, target.Properties[GameResource.Hp] - value);
            Entry.Event.Fire(PropertyModifyEventArgs.EventId, eventArg);
        }
        
        private void PresetFsm()
        {   
            roleBaseStates = roleBaseStates ?? Entry.Fsm.CreateFsm<RoleBase>(this, new RoleStateHold(), new RoleStateReady(), new RoleStateDead());
            stateList = new List<FsmState<RoleBase>>()
            {   
                new RoleStateHold(), new RoleStateReady(), new RoleStateDead()
            };
        }
        
        protected void OnEnable()
        {   
            Entry.Event.Subscribe(PropertyModifyEventArgs.EventId, OnPropertyChanged);
            roleBaseStates.Start<RoleStateHold>();
        }
        protected virtual void OnPropertyChanged(object sender, GameEventArgs args)
        {
            if (args is not PropertyModifyEventArgs propertyModifyEvent)
            {
                return;
            }

            if (!propertyModifyEvent.target.Equals(this))
            {
                return;
            }

            if (this.Properties == null || !this.Properties.ContainsKey(propertyModifyEvent.modifiedField))
            {
                return;
            }

            this.Properties[propertyModifyEvent.modifiedField] = propertyModifyEvent.finalValue;
        }
        protected virtual void OnDisable()
        {
            Entry.Event.Unsubscribe(PropertyModifyEventArgs.EventId, OnPropertyChanged);
        }
        
        public static IRole CreateRole<T> () where T : IRole
        {
            // var asset = Entry.Entity.GetEntity(EntityPath.Mage);
            return null;
        }
    }
}

