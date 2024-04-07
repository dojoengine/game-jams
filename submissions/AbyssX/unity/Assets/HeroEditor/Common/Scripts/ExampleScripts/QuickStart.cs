using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Assets.HeroEditor.Common.Scripts.ExampleScripts
{
    /// <summary>
    /// A small helper used in Quick Start scene.
    /// </summary>
    public class QuickStart : MonoBehaviour
    {
        public List<Character> CharacterPrefabs;
        public MovementExample MovementExample;
        public AttackingExample AttackingExample;
        public BowExample BowExample;
        public EquipmentExample EquipmentExample;
        public AppearanceExample AppearanceExample;
        public InventoryExample InventoryExample;

        public static string ReturnSceneName;

        public void Awake()
        {
            var character = Instantiate(CharacterPrefabs.First(i => i != null));

            character.transform.position = Vector2.zero;

            MovementExample.Character = character;
            AttackingExample.Character = character;
            BowExample.Character = character;
            AttackingExample.Firearm = character.Firearm;
            AttackingExample.ArmL = character.BodyRenderers.First(i => i.name == "ArmL").transform;
            AttackingExample.ArmR = character.BodyRenderers.First(i => i.name == "ArmR[1]").transform;
            EquipmentExample.Character = character;
            AppearanceExample.Character = character;
            InventoryExample.Character = character;
        }

        public void Update()
        {
            if (Input.GetKeyDown(KeyCode.Escape) && ReturnSceneName != null)
            {
                SceneManager.LoadScene(ReturnSceneName);
            }
        }
    }
}