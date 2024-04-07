using System;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.Data
{
	/// <summary>
	/// Item representation inside IconCollection.
	/// </summary>
	[Serializable]
	public class ItemIcon
    {
        public string Name;
        public string Collection;
        public string Id;
        public string Path;
        public Sprite Sprite;

        public ItemIcon(string edition, string collection, string type, string name, string path, Sprite sprite)
        {
            Id = $"{edition}.{collection}.{type}.{name}";
            Name = name;
            Collection = collection;
            Path = path;
            Sprite = sprite;
        }
	}
}