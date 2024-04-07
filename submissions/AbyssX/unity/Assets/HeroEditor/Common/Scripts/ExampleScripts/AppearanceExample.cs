using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using HeroEditor.Common.Enums;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.ExampleScripts
{
    /// <summary>
    /// An example of how to change character's appearance.
    /// </summary>
    public class AppearanceExample : MonoBehaviour
    {
        public CharacterAppearance Appearance = new CharacterAppearance();
        public Character Character;
        public AvatarSetup AvatarSetup;
        
        public void Start()
        {
            Refresh();
        }

        public void Refresh()
        {
            Appearance.Setup(Character);

            var helmetId = Character.SpriteCollection.Helmet.SingleOrDefault(i => i.Sprite == Character.Helmet)?.Id;

            AvatarSetup.Initialize(Appearance, helmetId);
        }

        public void SetRandomAppearance()
        {
            Appearance.Hair = Random.Range(0, 3) == 0 ? null : Character.SpriteCollection.Hair[Random.Range(0, Character.SpriteCollection.Hair.Count)].Id;
            Appearance.HairColor = new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f));
            Appearance.Eyebrows = Character.SpriteCollection.Eyebrows[Random.Range(0, Character.SpriteCollection.Eyebrows.Count)].Id;
            Appearance.Eyes = Character.SpriteCollection.Eyes[Random.Range(0, Character.SpriteCollection.Eyes.Count)].Id;
            Appearance.EyesColor = new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f));
            Appearance.Mouth = Character.SpriteCollection.Mouth[Random.Range(0, Character.SpriteCollection.Mouth.Count)].Id;
            Appearance.Beard = Random.Range(0, 3) == 0 ? Character.SpriteCollection.Beard[Random.Range(0, Character.SpriteCollection.Beard.Count)].Id : null;

            Refresh();
        }

        public void ResetAppearance()
        {
            Appearance = new CharacterAppearance();
            Refresh();
        }

        public void SetRandomHair()
        {
            var randomIndex = Random.Range(0, Character.SpriteCollection.Hair.Count);
            var randomItem = Character.SpriteCollection.Hair[randomIndex];
            var randomColor = new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f));

            Character.SetBody(randomItem, BodyPart.Hair, randomColor);
        }

        public void SetRandomEyebrows()
        {
            var randomIndex = Random.Range(0, Character.SpriteCollection.Eyebrows.Count);
            var randomItem = Character.SpriteCollection.Eyebrows[randomIndex];

            Character.SetBody(randomItem, BodyPart.Eyebrows);
        }

        public void SetRandomEyes()
        {
            var randomIndex = Random.Range(0, Character.SpriteCollection.Eyes.Count);
            var randomItem = Character.SpriteCollection.Eyes[randomIndex];
            var randomColor = new Color(Random.Range(0, 1f), Random.Range(0, 1f), Random.Range(0, 1f));

            Character.SetBody(randomItem, BodyPart.Eyes, randomColor);
        }

        public void SetRandomMouth()
        {
            var randomIndex = Random.Range(0, Character.SpriteCollection.Mouth.Count);
            var randomItem = Character.SpriteCollection.Mouth[randomIndex];

            Character.SetBody(randomItem, BodyPart.Mouth);
        }
    }
}