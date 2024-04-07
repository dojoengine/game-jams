using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Abyss.Core;
using TMPro;
using UnityEngine.UI;

public class TempManager : MonoBehaviour
{
    public Transform OnLogin;
    public Transform OnCharacterSelect;

    public RectTransform Card0;
    public RectTransform Card1;
    public RectTransform Card2;
    public RectTransform Card3;
    public RectTransform Card4;
    public RectTransform Card5;

    public Character protag;
    public Character antag;

    public SliderLogic protagSlider;
    public SliderLogic antagSlider;

    public TMP_Text TextEnergy;

    private int protagHp = 80;
    private int antagHp = 60;
    private int protagHpMax = 80;
    private int antagHpMax = 60;

    // Start is called before the first frame update
    void Start()
    {
        protagSlider.PresetValue(protagHp, protagHpMax);
        antagSlider.PresetValue(antagHp, antagHpMax);
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetKey(KeyCode.Space))
        {
            StartPlay();
        }
    }

    void StartPlay() {
        // Ñ²ÂßËÑË÷
        DOTween.Sequence().Append(OnLogin.transform.DOMoveX(2000f, 0.5f).SetRelative()).
                            AppendInterval(1.2f)
                            .Append(OnCharacterSelect.transform.DOMoveX(2000f, 0.5f).SetRelative())
                            .AppendInterval(1.2f)
                            .Append(Card0.DOScale(Vector3.one * 1.1f, 0.1f))
                            .Join(Card0.DOLocalMoveY(20f, 0.1f).SetRelative())
                            .AppendInterval(0.1f)
                            .Append(Card0.DOScale(Vector3.one * 1f, 0.1f))
                            .Join(Card0.DOLocalMoveY(-20f, .1f).SetRelative())
                            .Join(Card1.DOScale(Vector3.one * 1.1f, 0.1f))
                            .Join(Card1.DOLocalMoveY(20f, 0.1f).SetRelative())
                            .AppendInterval(0.1f)
                            .Append(Card1.DOScale(Vector3.one * 1f, 0.1f))
                            .Join(Card1.DOLocalMoveY(-20f, .1f).SetRelative())
                            .Join(Card2.DOScale(Vector3.one * 1.1f, 0.1f))
                            .Join(Card2.DOLocalMoveY(20f, 0.1f).SetRelative())
                            .AppendInterval(0.1f)
                            .Append(Card2.DOScale(Vector3.one * 1f, 0.1f))
                            .Join(Card2.DOLocalMoveY(-20f, .1f).SetRelative())
                            .AppendCallback(() =>
                            {
                                DrawCard(Card1);
                            })
                            .AppendInterval(0.6f)
                            .AppendCallback(() =>
                            {
                                ProtagAttack(false);
                            })
                            .AppendInterval(2f)
                            .AppendCallback(() =>
                            {
                                AntagAttack();
                            }).
                            AppendInterval(2f)
                            .Append(Card5.DOScale(Vector3.one * 1.1f, 0.1f))
                            .Join(Card5.DOLocalMoveY(20f, 0.1f).SetRelative())
                            .AppendInterval(0.1f).
                            AppendCallback(() =>
                            {
                                DrawFinalCard();
                            }).AppendInterval(0.3f)
                            .AppendCallback( ()=> { ProtagAttack(true); });

    }
    public Sequence ProtagAttack(bool isHeavy) {

        return DOTween.Sequence().AppendCallback(() =>
        {
            //protag.SetState(CharacterState.Run);
        })
                                 .Append(protag.transform.DOMoveX(3, 0.3f))
                                .AppendCallback(() =>
                                {
                                    if (isHeavy)
                                    { 
                                        protag.Slash();
                                    }
                                    else { 
                                        protag.Jab();
                                    }
                                })
                                .AppendInterval(1f)
                                .AppendCallback(() => {
                                    antagHp -= 12;
                                    antagSlider.PresetValue(antagHp, 100);
                                })
                                .AppendInterval(0.3f)
                                .AppendCallback(() =>
                                {
                                    protag.SetState(CharacterState.Run);
                                })
                                .Append(protag.transform.DOMoveX(-3f, 0.3f))
                                .AppendCallback(() => { 
                                    protag.SetState(CharacterState.Idle);
                                });
    }
    public void DrawCard(RectTransform trans) {
        var card1Pos = Card1.localPosition;
        var card1Rot = Card1.rotation;
        var pos = Camera.main.WorldToScreenPoint(protag.transform.position);
        DOTween.Sequence().Append(trans.DOMove(pos, 0.3f))
            .Join(Card0.DOLocalMove(card1Pos, 0.3f))
            .Join(Card0.DORotateQuaternion(card1Rot, 0.3f))
            //.AppendCallback(() => {
            //    TextEnergy.text = "4/5";
            //})
            .Append(trans.DOScale(Vector2.zero, 0.2f));
        protag.SetState(CharacterState.Crouch);
    }
    
    public void OnAntagDie() {
        DOTween.Sequence().AppendCallback(() =>
        {
            antagSlider.PresetValue(0, protagHpMax);
        })
            .AppendInterval(0.3f)
            .AppendCallback(() => { 
                antag.SetState(CharacterState.DeathB);
            });
    }
    public void DrawFinalCard() {
        var pos = Camera.main.WorldToScreenPoint(protag.transform.position);
        DOTween.Sequence().Append(Card5.DOMove(pos, 0.3f))
                            .Append(Card5.DOScale(Vector2.zero, 0.2f));
    }
    public Sequence AntagAttack() {
        return DOTween.Sequence().AppendCallback(() =>
        {
            //protag.SetState(CharacterState.Run);
        })
                                .Append(antag.transform.DOMoveX(-1, 0.3f))
                                .AppendCallback(() =>
                                {
                                    antag.Slash();
                                })
                                .AppendInterval(1f)
                                .AppendCallback(() => {
                                    protagSlider.PresetValue(protagHp-= 6, protagHpMax);
                                })
                                .AppendInterval(0.3f)
                                .AppendCallback(() =>
                                {
                                    antag.SetState(CharacterState.Run);
                                })
                                .Append(antag.transform.DOMoveX(4f, 0.3f))
                                .AppendCallback(() => {
                                    antag.SetState(CharacterState.Idle);
                                });
    }
    public void EnemyAttack() { 
        
    }
    
}
