using System;
using System.Collections;
using System.Collections.Generic;
using Abyss.Core;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.Common;
using DG.Tweening;
using UnityEngine;
using Vector2 = UnityEngine.Vector2;

public class Director : MonoBehaviour
{

    public CardRole mage;
    public CardRole rogue;

    public CardRole warrior;
    public static Director Instance;
    [SerializeField]
    private CardRole Enemy0;

    [SerializeField]
    private CardRole Enemy1;

    [SerializeField]
    private CardRole Enemy2;

    [SerializeField]
    private WarningLogic warning;
    
    #region pos
    [SerializeField]
    private Transform playerPosFar;
    [SerializeField]
    private Transform playerPosBirth;
    [SerializeField]
    private Transform Enemy0PosFar;
    [SerializeField]
    private Transform Enemy0PosBirth;
    [SerializeField]
    private Transform Enemy1PosFar;
    [SerializeField]
    private Transform Enemy1PosBirth;
    [SerializeField]
    private Transform Enemy2PosFar;
    [SerializeField]
    private Transform Enemy2PosBirth;

    [SerializeField]
    private BaseCard[] cardList;

    [SerializeField]
    private BezierLine line;

    [SerializeField]
    private RectTransform arrow;
    #endregion

    [SerializeField]
    public BattleLogic battleLogic;
    public Dictionary<bool, List< CardRole>> roles = new Dictionary<bool, List<CardRole>>()
    {
        {true, new List<CardRole>()},
        {false, new List<CardRole>()},
    };

    private CardRole protag;
    private void Awake()
    {
        roles = new Dictionary<bool, List<CardRole>>()
        {
            {true, new List<CardRole>()},
            {false, new List<CardRole>()},
        };
        Instance = this;

        protag = warrior;
        protag.MaxHp = 100;
        Enemy0.MaxHp = 120;
        Enemy1.MaxHp = 80;
        Enemy2.MaxHp = 120;
        #region preset
        protag.transform.position = playerPosBirth.position;
        Enemy0.transform.position = Enemy0PosBirth.position;
        Enemy1.transform.position = Enemy1PosBirth.position;
        Enemy2.transform.position = Enemy2PosBirth.position;
        protag.character.SetState((CharacterState.Run));
        Enemy0.character.SetState(CharacterState.Run);
        Enemy1.character.SetState(CharacterState.Run);
        Enemy2.character.SetState(CharacterState.Run);
        #endregion
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.T))
        {
            InitRole("warrior");
            Act();
        }
    }

    public void InitRole(string roleName)
    {
        switch (roleName)
        {
            case "mage":
                mage.gameObject.SetActive(true);
                rogue.gameObject.SetActive(false);
                warrior.gameObject.SetActive(false);
                protag = mage;
                break;
            case "rogue":
                rogue.gameObject.SetActive(true);
                warrior.gameObject.SetActive(false);
                protag = rogue;
                rogue.gameObject.SetActive(false);
                break;
            case "warrior":
                protag = warrior;
                warrior.gameObject.SetActive(true);
                rogue.gameObject.SetActive(false);
                mage.gameObject.SetActive(false);
                break;
        }
        
    roles = new Dictionary<bool, List<CardRole>>()
    {
        {true, new List<CardRole>()},
        {false, new List<CardRole>()},
    };
    }

    public void Act()
    {
        protag.MaxHp = 100;
        Enemy0.MaxHp = 120;
        Enemy1.MaxHp = 80;
        Enemy2.MaxHp = 120;

        #region preset
        protag.transform.position = playerPosBirth.position;
        Enemy0.transform.position = Enemy0PosBirth.position;
        Enemy1.transform.position = Enemy1PosBirth.position;
        Enemy2.transform.position = Enemy2PosBirth.position;
        protag.character.SetState(CharacterState.Run);
        Enemy0.character.SetState(CharacterState.Run);
        Enemy1.character.SetState(CharacterState.Run);
        Enemy2.character.SetState(CharacterState.Run);
        #endregion

        DOTween.Sequence()
            .Append(protag.transform.DOMove(playerPosFar.position, 2f))
            .AppendCallback(() =>
            {
                protag.character.SetState(CharacterState.Idle);
            })
            .AppendInterval(1f)
            .AppendCallback(() =>
            {
                warning.gameObject.SetActive(true);
            })
            .AppendInterval(WarningLogic.HoldTime)
            .Append(Enemy0.transform.DOMove(Enemy0PosFar.position, 2f))
            .Join(Enemy1.transform.DOMove(Enemy1PosFar.position, 2f))
            .Join(Enemy2.transform.DOMove(Enemy2PosFar.position, 2f))
            .AppendCallback(() =>
            {
                Enemy0.character.SetState(CharacterState.Idle);
                Enemy1.character.SetState(CharacterState.Idle);
                Enemy2.character.SetState(CharacterState.Idle);
            })
            .AppendInterval(2f)
            .AppendCallback(() =>
            {
                Debug.LogWarning((cardList[1].transform as RectTransform).position);
                Debug.LogWarning(Camera.main.WorldToScreenPoint(Enemy0.transform.position));
                battleLogic.ShowCards();
            })
            .AppendInterval(2f)
            .AppendCallback(cardList[1].OnBig)
            .AppendInterval(0.3f)
            .AppendCallback(() =>
            {
                var anchor = arrow.sizeDelta;
                arrow.gameObject.SetActive(true);
                var targetPos = Camera.main.WorldToScreenPoint(Enemy0PosFar.position);
                arrow.transform.position = cardList[1].transform.position;
                var offset = (targetPos - arrow.transform.position);

                arrow.eulerAngles = Vector3.back * Vector3.Angle(Vector3.up, offset );
                Debug.LogWarning(offset
                );
                arrow.DOSizeDelta(new Vector2(arrow.sizeDelta.x, Vector3.Magnitude(offset) + 200f), 0.7f).OnComplete(
                        () =>
                        {
                            arrow.gameObject.SetActive(false);
                            arrow.sizeDelta = anchor;
                        })
                ;
            })
            .AppendInterval(1f)
            .Append((cardList[1].transform as RectTransform).DOMove(
                Camera.main.WorldToScreenPoint(Enemy0PosFar.position), 0.7f))
            .AppendInterval(0.7f)
            .AppendCallback(() =>
            {
                line.SetActive(false);
                battleLogic.Text_Energey.text = "4 / 5";
                cardList[1].OnVanish();
                protag.Attack(Enemy0, 12);
            })
            .AppendInterval(1f)
            .AppendCallback(cardList[2].OnBig)
            
            .AppendInterval(0.3f)
            .AppendCallback(() =>
            {
                var anchor = arrow.sizeDelta;
                arrow.gameObject.SetActive(true);
                var targetPos = Camera.main.WorldToScreenPoint(Enemy0PosFar.position);
                arrow.transform.position = cardList[2].transform.position;
                var offset = (targetPos - arrow.transform.position);

                arrow.eulerAngles = Vector3.back * Vector3.Angle(Vector3.up, offset );
                Debug.LogWarning(offset
                );
                arrow.DOSizeDelta(new Vector2(arrow.sizeDelta.x, Vector3.Magnitude(offset) + 200f), 0.7f).OnComplete(
                        () =>
                        {
                            arrow.gameObject.SetActive(false);
                            arrow.sizeDelta = anchor;
                        })
                    ;
            })
            .AppendInterval(1f)
            .Append((cardList[2].transform as RectTransform).DOMove(
                Camera.main.WorldToScreenPoint(Enemy0PosFar.position), 0.7f))
            .AppendInterval(0.7f)
            .AppendCallback(() =>
            {
                battleLogic.Text_Energey.text = "3 / 5";
                cardList[2].OnVanish();
                protag.Attack(Enemy0, 12);
            })
            .AppendInterval(1f)
            .AppendCallback(cardList[4].OnBig)
            .AppendInterval(0.3f)
            .AppendCallback(() =>
            {
                var anchor = arrow.sizeDelta;
                arrow.gameObject.SetActive(true);
                var targetPos = Camera.main.WorldToScreenPoint(Enemy0PosFar.position);
                arrow.transform.position = cardList[4].transform.position;
                var offset = (targetPos - arrow.transform.position);

                arrow.eulerAngles = Vector3.back * Vector3.Angle(Vector3.up, offset );
                Debug.LogWarning(offset
                );
                arrow.DOSizeDelta(new Vector2(arrow.sizeDelta.x, Vector3.Magnitude(offset) + 200f), 0.7f).OnComplete(
                        () =>
                        {
                            arrow.gameObject.SetActive(false);
                            arrow.sizeDelta = anchor;
                        })
                    ;
            })
            .AppendInterval(0.5f)
            .Append((cardList[4].transform as RectTransform).DOMove(
                Camera.main.WorldToScreenPoint(Enemy0PosFar.position), 0.7f))
            .AppendInterval(0.7f)
            .AppendCallback(() =>
            {
                battleLogic.Text_Energey.text = "3 / 5";
                cardList[4].OnVanish();
                protag.Attack(Enemy0, 12);
            })
            .AppendInterval(1f)
            .AppendCallback(cardList[5].OnBig)
            .AppendInterval(0.3f)
            .AppendCallback(() =>
            {
                var anchor = arrow.sizeDelta;
                arrow.gameObject.SetActive(true);
                var targetPos = Camera.main.WorldToScreenPoint(Enemy0PosFar.position);
                arrow.transform.position = cardList[5].transform.position;
                var offset = (targetPos  - arrow.transform.position);

                arrow.eulerAngles = Vector3.back * Vector3.Angle(Vector3.up, offset );
                Debug.LogWarning(offset
                );
                arrow.DOSizeDelta(new Vector2(arrow.sizeDelta.x, Vector3.Magnitude(offset) + 200f), 0.7f).OnComplete(
                        () =>
                        {
                            arrow.gameObject.SetActive(false);
                            arrow.sizeDelta = anchor;
                        })
                    ;
            })
            .AppendInterval(1f)
            .Append((cardList[5].transform as RectTransform).DOMove(
                Camera.main.WorldToScreenPoint(Enemy0PosFar.position), 0.7f))
            .AppendInterval(0.7f)
            .AppendCallback(() =>
            {
                battleLogic.Text_Energey.text = "2 / 5";
                cardList[5].OnVanish();
                protag.Attack(Enemy0, 12);
            })
            .AppendInterval(1f)
            .AppendCallback(cardList[6].OnBig)
            .AppendInterval(0.3f)            
            .AppendCallback(() =>
            {
                var anchor = arrow.sizeDelta;
                arrow.gameObject.SetActive(true);
                var targetPos = Camera.main.WorldToScreenPoint(Enemy0PosFar.position);
                arrow.transform.position = cardList[6].transform.position;
                var offset = (targetPos - arrow.transform.position);

                arrow.eulerAngles = Vector3.back * Vector3.Angle(Vector3.up, offset );
                Debug.LogWarning(offset
                );
                arrow.DOSizeDelta(new Vector2(arrow.sizeDelta.x, Vector3.Magnitude(offset) + 200f), 0.7f).OnComplete(
                        () =>
                        {
                            arrow.gameObject.SetActive(false);
                            arrow.sizeDelta = anchor;
                        })
                    ;
            })
            .AppendInterval(1f)
            .Append((cardList[6].transform as RectTransform).DOMove(
                Camera.main.WorldToScreenPoint(Enemy0PosFar.position), 0.7f))
            .AppendInterval(0.7f)
            .AppendCallback(() =>
            {
                battleLogic.Text_Energey.text = "0 / 5";
                cardList[6].OnVanish();
                protag.Attack(Enemy0, 30);
            })
            .AppendInterval(3f)
            .AppendCallback(() =>
                {
                    Enemy0.Attack(protag, 12);
                }
            ).AppendInterval(2f)
            .AppendCallback(() =>
                {
                    Enemy1.Attack(protag, 12);
                }
            ).AppendInterval(2f)
            .AppendCallback(() =>
                {
                    Enemy2.Attack(protag, 12);
                }
            ).AppendInterval(2f);


    }
}