using System;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using UnityEngine;
using DG.Tweening;
using HeroEditor.Common;
using Newtonsoft.Json.Serialization;
using Vector2 = System.Numerics.Vector2;

namespace Abyss.Core
{
    public class CardRole : MonoBehaviour
    {
        public SliderLogic hpSlider;
        
        public bool isEnemy;

        private int hp;

        public Character character => GetComponent<Character>();

        public int Hp
        {
            set
            {
                Debug.LogError(("Hp set to " + value));
                hpSlider.PresetValue(value,maxHp);
                hp = value;
                if (hp <= 0)
                {
                    OnDie();
                }
            }
            get => hp;
        }

        private int maxHp;

        public int MaxHp
        {
            set
            {
                maxHp = value;
                Hp = value;
                hpSlider.PresetValue(maxHp,maxHp);
            }
            get => maxHp;
        }

        public void Init(int maxHp)
        {
            this.MaxHp = maxHp;
            this.Hp = maxHp;
        }

        public void OnEnable()
        {
            // Director.Instance.roles[this.isEnemy].Add(this);
        }

        private void OnDisable()
        {
            Debug.LogError(" On Disabled");
            // if (Director.Instance.roles[this.isEnemy].Contains(this))
            // {
            //     Director.Instance.roles[this.isEnemy].Remove(this);
            // }
        }

        private void OnDie()
        {
            var chara = this.GetComponent<Character> ();
            chara.SetState(CharacterState.DeathB);
            DOTween.Sequence().AppendInterval(0.5f)
                .AppendCallback(() =>
                {
                    Destroy(gameObject);
                });
        }

        public void Attack(CardRole target, int value)
        {
            float offsetX;
            var targetCharac = target.GetComponent<Character>();
            var targetPosition = target.transform.position;
            var position = transform.position;

            var curCharac = GetComponent<Character>();
            if (target.isEnemy)
            {
                offsetX = target.transform.position.x - 1;
            }
            else
            {
                offsetX = target.transform.position.x + 1;
            }

            DOTween.Sequence()
                .AppendCallback(() =>
                {
                    curCharac.SetState(CharacterState.Run);
                })
                .Append(transform.DOMove(
                    new Vector3(offsetX, targetPosition.y, targetPosition.z), 0.5f))
                .AppendCallback(() =>
                {
                    curCharac.SetState(CharacterState.Idle);
                    curCharac.Slash();
                })
                .AppendInterval(0.7f)
                .AppendCallback(() =>
                {
                    target.Hp -= value;
                })
                .AppendInterval(0.2f)
                .AppendCallback(() =>
                {
                    curCharac.SetState(CharacterState.Idle);
                })
                .Append(transform.DOMove(position, 0.5f))
                .AppendCallback(() =>
                {
                    curCharac.SetState(CharacterState.Idle);
                });
        }
    }
}