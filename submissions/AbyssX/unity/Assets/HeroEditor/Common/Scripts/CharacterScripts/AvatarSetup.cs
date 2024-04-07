using System;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.Common;
using HeroEditor.Common;
using HeroEditor.Common.Data;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.CharacterScripts
{
    public class AvatarSetup : MonoBehaviour
    {
        public List<SpriteCollection> SpriteCollections;
        public SpriteRenderer Head;
        public SpriteRenderer Hair;
        public SpriteRenderer Ears;
        public SpriteRenderer Eyes;
        public SpriteRenderer Eyebrows;
        public SpriteRenderer Mouth;
        public SpriteRenderer Beard;
        public SpriteRenderer Mask;
        public SpriteRenderer Glasses;
        public SpriteRenderer Helmet;

        public void Initialize(CharacterAppearance appearance, string helmetId)
        {
            if (SpriteCollections.Count == 0) throw new Exception("Please set sprite collections for avatar setup.");

            var ear = SpriteCollections.SelectMany(i => i.Ears).Single(i => i.Id == appearance.Ears).Sprite;

            Head.sprite = SpriteCollections.SelectMany(i => i.Head).Single(i => i.Id == appearance.Head).Sprite;
            Head.color = Ears.color = appearance.BodyColor;

            ItemSprite hair = null;

            if (appearance.Hair.IsEmpty())
            {
                Hair.enabled = false;
            }
            else
            {
                hair = SpriteCollections.SelectMany(i => i.Hair).Single(i => i.Id == appearance.Hair);
                Hair.enabled = true;
                Hair.sprite = hair.Sprite;
                Hair.color = hair.Tags.Contains("NoPaint") ? (Color32) Color.white : appearance.HairColor;
            }

            Beard.sprite = string.IsNullOrEmpty(appearance.Beard) ? null : SpriteCollections.SelectMany(i => i.Beard).Single(i => i.Id == appearance.Beard).Sprite;
            Beard.color = appearance.BeardColor;
            Eyes.sprite = SpriteCollections.SelectMany(i => i.Eyes).Single(i => i.Id == appearance.Eyes).Sprite;
            Eyes.color = appearance.EyesColor;

            if (string.IsNullOrEmpty(appearance.Eyebrows))
            {
                Eyebrows.enabled = false;
            }
            else
            {
                Eyebrows.enabled = true;
                Eyebrows.sprite = SpriteCollections.SelectMany(i => i.Eyebrows).Single(i => i.Id == appearance.Eyebrows).Sprite;
            }

            Mouth.sprite = SpriteCollections.SelectMany(i => i.Mouth).Single(i => i.Id == appearance.Mouth).Sprite;

            if (helmetId == null)
            {
                Helmet.enabled = false;
                Ears.sprite = ear;
                Ears.enabled = hair == null || !hair.Tags.Contains("HideEars");
                Hair.maskInteraction = SpriteMaskInteraction.None;
            }
            else
            {
                Helmet.enabled = true;

                var helmet = SpriteCollections.SelectMany(i => i.Helmet).Single(i => i.Id == helmetId);
                var fullHair = helmet.Tags.Contains("FullHair");
                var hideEars = hair != null && hair.Tags.Contains("HideEars");

                Helmet.sprite = helmet.Sprite;
                Ears.sprite = ear;
                Ears.enabled = !(fullHair && hideEars);
                Hair.maskInteraction = fullHair ? SpriteMaskInteraction.None : SpriteMaskInteraction.VisibleInsideMask;
            }
        }
    }
}