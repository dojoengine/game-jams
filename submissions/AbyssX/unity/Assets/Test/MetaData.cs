using System.Collections;
using System.Collections.Generic;
using GameFramework.DataTable;
using UnityEngine;
using UnityGameFramework.Runtime;

public class MetaData : DataRowBase
{
    private int m_Id;
    public override int Id => m_Id;

    public int MaxHp
    {
        get;
        private set;
    }

    public int Attack
    {
        get;
        private set;
        
    }

    public override bool ParseDataRow(string dataRowString, object userData)
    {
        
        return base.ParseDataRow(dataRowString, userData);
    }
}
