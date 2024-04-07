using System;
using System.Collections;
using System.Collections.Generic;
using GameFramework.Event;
using UnityEngine;
using UnityEngine.UI;
using UnityGameFramework.Runtime;

namespace Abyss.Core
{
    public class SliderLogic : MonoBehaviour
    {
        private Slider m_Slider;
        private Text m_SliderValue;

        private RoleBase m_Role;
        // Start is called before the first frame update
        void Start()
        {
            m_Slider = GetComponentInChildren<Slider>();
            m_SliderValue = GetComponentInChildren<Text>();
            m_Role = GetComponentInParent<RoleBase>();
        }
        public void PresetValue(int value, int maxValue)
        {
            if (m_Slider == null)
            {
                Start();
            }
            Debug.LogError("slider Value Set => " + $"{value}/{maxValue}");
            this.m_Slider.value = (float)value / (float)maxValue;
            this.m_SliderValue.text = $"{value}/{maxValue}";
        }
    }
}



