using System;
using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using TMPro;

namespace Abyss.Core
{
    public class LoadingLogic : MonoBehaviour
    {
        [SerializeField]
        private Slider slider;

        [SerializeField]
        private TMP_Text txt;

        private static WaitForSeconds wfs = new WaitForSeconds(0.01f);

        private void OnEnable()
        {
            StartCoroutine( LoadSlider());
        }

        private IEnumerator LoadSlider()
        {
            slider.value = 0;
            while (slider.value <= 0.9999f)
            {

                slider.value += 0.005f;
                txt.text = slider.value.ToString("P");
                yield return wfs;
            }
            
            gameObject.SetActive(false);
        }
    }
}