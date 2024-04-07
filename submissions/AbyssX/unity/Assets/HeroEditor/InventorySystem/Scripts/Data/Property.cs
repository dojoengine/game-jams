using System;
using System.Linq;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;

namespace Assets.HeroEditor.InventorySystem.Scripts.Data
{
    /// <summary>
    /// Represents key-value pair for storing item params.
    /// You can implement any custom value patterns for your game, for example "[DAMAGE_MIN]-[DAMAGE_MAX]/[ELEMENT]/[DURATION]".
    /// </summary>
    [Serializable]
    public class Property
    {
        public PropertyId Id;
        public string Value;

        public float ValueFloat => float.Parse(Value);
        public int ValueInt => int.Parse(Value);
        public int Min => int.Parse(Value.Split('-').First());
        public int Max => int.Parse(Value.Split('-').Last());
    }
}