using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace  Abyss.Core
{
    public interface IRole
    {
        public Dictionary<string, int> Properties
        {
            get;
            set;
        }
    }
}
