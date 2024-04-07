using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using UnityEditor;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.Editor
{
    /// <summary>
    /// Add action buttons to LayerManager script
    /// </summary>
    [CustomEditor(typeof(LayerManager))]
    public class LayerManagerEditor : UnityEditor.Editor
    {
        public override void OnInspectorGUI()
        {
            DrawDefaultInspector();

            var script = (LayerManager) target;

            EditorGUILayout.LabelField("Service", EditorStyles.boldLabel);

            if (GUILayout.Button("Read Sprites Order"))
            {
                script.GetSpritesBySortingOrder();
            }

            if (GUILayout.Button("Set Sprites Order"))
            {
                script.SetSpritesBySortingOrder();
            }
        }
    }
}