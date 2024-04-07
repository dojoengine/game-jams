using System;
using System.Collections;
using System.Collections.Generic;
using Abyss.Core;
using Assets.HeroEditor.Common.Scripts.Common;
using UnityEngine;

public class GameCore : MonoBehaviour
{

    public CardRole mage;
    public CardRole rogue;

    public CardRole warrior;
    public static GameCore Instance;
    [SerializeField]
    private CardRole Enemy0;

    [SerializeField]
    private CardRole Enemy1;

    [SerializeField]
    private CardRole Enemy2;

    [SerializeField]
    private WarningLogic warning;

    public Dictionary<bool, List< CardRole>> roles = new Dictionary<bool, List<CardRole>>()
    {
        {true, new List<CardRole>()},
        {false, new List<CardRole>()},
    }; 
    private void Awake()
    {
        Instance = this;
    }
    
    public void InitRole(string roleName)
    {
        switch (roleName)
        {
            case "mage":
                mage.gameObject.SetActive(true);
                rogue.gameObject.SetActive(false);
                warrior.gameObject.SetActive(false);
                break;
            case "rogue":
                    rogue.gameObject.SetActive(true);
                    warrior.gameObject.SetActive(false);
                    rogue.gameObject.SetActive(false);
                    break;
            case "warrior":
                warrior.gameObject.SetActive(true);
                rogue.gameObject.SetActive(false);
                mage.gameObject.SetActive(false);
                break;
        }
        
        roles = new Dictionary<bool, List<CardRole>>
        {
            { true, new List<CardRole>() },
            { false, new List<CardRole>() }
        };
    }

    public void Act()
    {
        
    }
}
