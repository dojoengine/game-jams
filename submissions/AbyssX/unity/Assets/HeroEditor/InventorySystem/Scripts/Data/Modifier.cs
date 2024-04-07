using System;
using Assets.HeroEditor.InventorySystem.Scripts.Enums;

namespace Assets.HeroEditor.InventorySystem.Scripts.Data
{
    /// <summary>
    /// Can be used for item augmentation and other modifications.
    /// </summary>
    [Serializable]
    public class Modifier
    {
        public ItemModifier Id;
        public int Level;

        public Modifier()
        {
        }

        public Modifier(ItemModifier id, int level)
        {
            Id = id;
            Level = level;
        }
    }
}