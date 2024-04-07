using System;
using System.Collections;
using System.Collections.Generic;
using Abyss.Core;
using Abyss.Utils;
using GameFramework.Event;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using DG.Tweening;
using TMPro;
using UnityGameFramework.Runtime;

public class BattleLogic : UIFormLogic
{
    [SerializeField]
    private Transform handCardParent;
    [SerializeField]
    private Transform cardDeckParent;
    [SerializeField]
    private Text Text_DeckCount;
    [SerializeField]
    private Transform go_bottom;
    [SerializeField]
    private Transform go_right;

    [SerializeField] public TMP_Text Text_Energey;

    private static float bottom_up = 28f;
    private static float bottom_down = -300f;

    private static float right_left = 0f;
    private static float right_right = 400f;

    public LayoutGroup layout;
    protected override void OnOpen(object userData)
    {
        base.OnOpen(userData);
        Entry.Event.Subscribe(PropertyModifyEventArgs.EventId, SetPlayerInfo  );
        Entry.Event.Subscribe(CardInHandArgs.EventId, OnCardInHand);
    }

    private void Awake()
    {
        HideCards();
    }

    private void SetPlayerInfo(object obj, GameEventArgs args )
    {
        if (args is not PropertyModifyEventArgs prop)
        {
            return;
        }

        if (prop.target != Entry.GameMgr.protagonist)
        {
            return;
        }

        if (prop.modifiedField == GameResource.Hp && prop.finalValue < 0)
        {  
            //游戏结束
            // Entry.Event.Fire(GameOverArgs.GameOver);
        }
    }



    protected override void OnClose(bool isShutdown, object userData)
    {
        base.OnClose(isShutdown, userData);
        Entry.Event.Unsubscribe(PropertyModifyEventArgs.EventId, SetPlayerInfo);
    }

    private void OnCardInHand(object sender, GameEventArgs args) {
        if (args is CardInHandArgs arg)
        { 
            Text_DeckCount.text = arg.finalCardNum.ToString() ;
        }

    }

    public void ShowCards()
    {
        (go_bottom as RectTransform).DOAnchorPosY(bottom_up, 0.5f);
        (go_right as RectTransform).DOAnchorPosX(right_left, 0.5f);
    }

    public void HideCards()
    {
        (go_bottom as RectTransform).DOAnchorPosY(bottom_down, 0f);
        (go_right as RectTransform).DOAnchorPosX(right_right, 0f);
    }

    public void SetCard(Type[] cardSet)
    {   
        Entry.GameMgr.cardDeck = new LinkedList<ICard>();
        Text_DeckCount.text = cardSet.Length.ToString();
        for (int i = 0; i < cardSet.Length; i++)
        {
            CardUtils.CreateCard(CardUtils.CardDic[ cardSet[i]], OnCardLoadSuccess);
        }
    }

    protected override void OnInit(object userData)
    {
        base.OnInit(userData);
        SetCard(Entry.GameMgr.CardsToHold);
    }
    private void OnCardLoadSuccess(string assetName, object asset, float duration, object data)
    {
        var comp =  Instantiate (asset as GameObject).GetComponent<BaseCard>();

        //comp.SetCardData(Entry.Card.cardDatas[id]);
        Entry.GameMgr.cardDeck.AddLast(comp);
        comp.transform.SetParent(cardDeckParent);

        if (Entry.GameMgr.cardDeck.Count == Entry.GameMgr.CardsToHold.Length)
        {
            OnAllCardsLoaded();
        }
    }

    private void OnAllCardsLoaded()
    {
        for (int i = 0; i < 5; i++)
        { 
            cardDeckParent.GetChild(handCardParent.childCount).SetParent(null);
        }
    }
    private void OnRoundFinished() { 
        
    }
    private void OnEnable()
    {
    }
}
