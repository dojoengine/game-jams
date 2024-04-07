using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SelectHeroPanel : MonoBehaviour
{
    public Button btn_mage;

    public Button btn_warrior;

    public Button btn_rogue;

    public Button btn_ok;

    public Transform trans_select;

    private string currentRole;

    private void OnEnable()
    {
        OnHeroSelect("mage");
    }

    // Start is called before the first frame update
    void Start()
    {
        btn_mage.onClick.AddListener(() => { OnHeroSelect("mage");});
        btn_warrior.onClick.AddListener(() => { OnHeroSelect("warrior");});
        btn_rogue.onClick.AddListener(() => { OnHeroSelect("rogue");});
        btn_ok.onClick.AddListener(OnEnterGame);
    }

    void OnHeroSelect(string heroType)
    {
        currentRole = heroType;
        switch (heroType)
        {
            case "mage":
                trans_select.transform.position = btn_mage.transform.position;
                break;    
            case "warrior":
                trans_select.transform.position = btn_warrior.transform.position;
                break;    
            case "rogue":
                trans_select.transform.position = btn_rogue.transform.position;
                break;
        }

    }

    void OnEnterGame()
    {
        gameObject.SetActive(false);
        GameCore.Instance.InitRole(currentRole);
    }
}
