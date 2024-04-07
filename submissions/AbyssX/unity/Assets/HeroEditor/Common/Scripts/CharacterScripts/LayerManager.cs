using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Rendering;

namespace Assets.HeroEditor.Common.Scripts.CharacterScripts
{
    /// <summary>
    /// Used to order sprite layers (character parts).
    /// </summary>
    public class LayerManager : MonoBehaviour
    {
        /// <summary>
		/// SortingGroup can be used when you have multiple characters on scene.
		/// </summary>
		public SortingGroup SortingGroup;

        /// <summary>
        /// The full list of character sprites.
        /// </summary>
        public List<SpriteRenderer> Sprites;

        public void SetSortingGroupOrder(int index)
	    {
		    SortingGroup.sortingOrder = index;
	    }

        /// <summary>
        /// Get character sprites and order by Sorting Order.
        /// </summary>
        public void GetSpritesBySortingOrder()
        {
            Sprites = GetComponentsInChildren<SpriteRenderer>(true).OrderBy(i => i.sortingOrder).ToList();
        }

        /// <summary>
        /// Set Sorting Order for character sprites.
        /// </summary>
        public void SetSpritesBySortingOrder()
        {
            for (var i = 0; i < Sprites.Count; i++)
            {
                Sprites[i].sortingOrder = 5 * i;
            }
        }
    }
}