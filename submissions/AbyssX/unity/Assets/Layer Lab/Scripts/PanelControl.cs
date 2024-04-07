using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Serialization;
using UnityEngine.UI;
#if ENABLE_INPUT_SYSTEM
using UnityEngine.InputSystem;
#endif

namespace LayerLab.GUIScripts
{
    public class PanelControl : MonoBehaviour
    {
        private int _page;
        private bool _isReady;
        private TextMeshProUGUI _textTitle;
        [SerializeField] private List<GameObject> defaultPanels = new ();
        [SerializeField] private List<GameObject> otherPanels = new ();
        
        [SerializeField] private Transform panelTransformDefault;
        [SerializeField] private Transform panelTransformOther;
        [SerializeField] private Button buttonPrev;
        [SerializeField] private Button buttonNext;


        private void OnValidate()
        {
            panelTransformDefault = GameObject.Find("Panels").transform;
            buttonPrev = transform.GetChild(0).GetComponent<Button>();
            buttonNext = transform.GetChild(2).GetComponent<Button>();
        }

        private void Reset()
        {
            OnValidate();
        }

        private bool IsOtherMode { get; set; }
        private void Start()
        {
            _textTitle = transform.GetComponentInChildren<TextMeshProUGUI>();
            buttonPrev.onClick.AddListener(Click_Prev);
            buttonNext.onClick.AddListener(Click_Next);

            foreach (Transform t in panelTransformDefault)
            {
                defaultPanels.Add(t.gameObject);
                t.gameObject.SetActive(false);
            }
            defaultPanels[_page].SetActive(true);
            
            
            
            
            if (otherPanels.Count > 0)
            {
                foreach (Transform t in panelTransformOther)
                {
                    otherPanels.Add(t.gameObject);
                    t.gameObject.SetActive(false);
                }
                otherPanels[_page].SetActive(true);
            }

            
            
            
            _isReady = true;
            CheckControl();
        }

        void Update()
        {
            if (defaultPanels.Count <= 0 || !_isReady) return;

#if ENABLE_INPUT_SYSTEM
            if (Keyboard.current.leftArrowKey.wasPressedThisFrame)
            {
                Click_Prev();
            }
            else if (Keyboard.current.rightArrowKey.wasPressedThisFrame)
            {
                Click_Next();
            }
#else
            if (Input.GetKeyDown(KeyCode.LeftArrow))
            {
                Click_Prev();
            }
            else if (Input.GetKeyDown(KeyCode.RightArrow))
            {
                Click_Next();
            }
#endif
        }

        //Click_Prev
        //Click_Prev
        public void Click_Prev()
        {
            if (_page <= 0) return;

            defaultPanels[_page].SetActive(false);
            if(otherPanels.Count > 0) otherPanels[_page].SetActive(false);
            _page -= 1;
            
            defaultPanels[_page].SetActive(true);
            if(otherPanels.Count > 0) otherPanels[_page].SetActive(true);

            if (!IsOtherMode)
            {
                _textTitle.text = defaultPanels[_page].name;
            }
            else
            {
                if (otherPanels.Count > 0)
                {
                    _textTitle.text = otherPanels[_page].name;
                }
            }
            
            CheckControl();
        }

        //Click_Next
        public void Click_Next()
        {
            if (_page >= defaultPanels.Count - 1) return;
            
            defaultPanels[_page].SetActive(false);
            if(otherPanels.Count > 0) otherPanels[_page].SetActive(false);
            _page += 1;
            
            defaultPanels[_page].SetActive(true);
            if(otherPanels.Count > 0) otherPanels[_page].SetActive(true);
            CheckControl();
        }


        void SetArrowActive()
        {
            buttonPrev.gameObject.SetActive(_page > 0);
            buttonNext.gameObject.SetActive(_page < defaultPanels.Count - 1);
        }

        //SetTitle, SetArrow Active
        private void CheckControl()
        {
            if (!IsOtherMode)
            {
                _textTitle.text = defaultPanels[_page].name.Replace("_", " ");    
            }
            else
            {
                if (otherPanels.Count > 0)
                {
                    _textTitle.text = otherPanels[_page].name.Replace("_", " ");
                }
            }
            
            SetArrowActive();
        }
        
        public void Click_Mode()
        {
            IsOtherMode = !IsOtherMode;
            SetMode();
            CheckControl();
        }
        
        void SetMode()
        {
            panelTransformDefault.gameObject.SetActive(IsOtherMode);
            if(otherPanels.Count > 0) panelTransformOther.gameObject.SetActive(!IsOtherMode);
        }
    }
}
