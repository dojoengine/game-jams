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
using UnityGameFramework.Runtime;

public class WarningLogic : UIFormLogic
{
    private static float singleWidth = 2797f;
    private static float leftMostThreshold = -2500f;
    private static float rightMovePos = 3035f;

    public static float HoldTime = 3f;
    private static WaitForSeconds wfs = new WaitForSeconds(0.01f);
    [SerializeField]
    private Transform[] top;
    [SerializeField]
    private Transform[] bottom;
    [SerializeField]
    private CanvasGroup go_sign;
    private void OnEnable()
    {
        StartCoroutine(Scroll());
        StartCoroutine(Blink());
    }

    private IEnumerator Scroll()
    {
        while (gameObject.activeSelf)
        {
            top[0].transform.position += Vector3.left * 2f;
            top[1].transform.position += Vector3.left * 2f;
            bottom[0].transform.position += Vector3.left * 2f;
            bottom[1].transform.position += Vector3.left * 2f;

            if (top[0].transform.position.x <= leftMostThreshold)
            {
                top[0].transform.position = new Vector3(rightMovePos, top[0].transform.position.y);
                bottom[0].transform.position = new Vector3(rightMovePos, bottom[0].transform.position.y);
            
                Array.Reverse(top);
                Array.Reverse(bottom);
            }
            yield return wfs;
        }
    }

    private IEnumerator Blink()
    {
        go_sign.DOFade(0.0f, 1f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Yoyo);
        yield return new WaitForSeconds(HoldTime);
        gameObject.SetActive(false);
    }
}
