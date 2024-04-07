using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Assets.HeroEditor.Common.Scripts.Common;
using Assets.HeroEditor.Common.Scripts.Data;
using UnityEditor;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.Collections
{
    /// <summary>
    /// Global object that automatically grabs all required images.
    /// </summary>
    [CreateAssetMenu(fileName = "IconCollection", menuName = "HeroEditor/IconCollection")]
    public class IconCollection : ScriptableObject
    {
        public string Id;
        public List<UnityEngine.Object> IconFolders;
        public List<ItemIcon> Icons;
        
        #if UNITY_EDITOR

		public void Refresh()
        {
            Icons.Clear();

            foreach (var folder in IconFolders)
            {
                if (folder == null) continue;

                var root = AssetDatabase.GetAssetPath(folder);
                var files = Directory.GetFiles(root, "*.png", SearchOption.AllDirectories).ToList();

                foreach (var path in files.Select(i => i.Replace("\\", "/")))
                {
                    var match = Regex.Match(path, @"Assets\/HeroEditor\/(?<Edition>\w+)\/(.+?\/)*Icons\/\w+\/(?<Type>\w+)\/(?<Collection>.+?)\/(.+\/)*(?<Name>.+?)\.png");
                    
                    if (!match.Success) throw new Exception($"Incorrect path: {path}");
                    
                    var sprite = AssetDatabase.LoadAssetAtPath<Sprite>(path);
                    var edition = match.Groups["Edition"].Value;
                    var collection = match.Groups["Collection"].Value;
                    var type = match.Groups["Type"].Value;
                    var iconName = match.Groups["Name"].Value;
                    var icon = new ItemIcon(edition, collection, type, iconName, path, sprite);

                    if (Icons.Any(i => i.Path == icon.Path))
                    {
                        Debug.LogErrorFormat($"Duplicated icon: {icon.Path}");
                    }
                    else
                    {
                        Icons.Add(icon);
                    }
                }
            }

			Icons = Icons.OrderBy(i => i.Name).ToList();
            EditorUtility.SetDirty(this);
        }

        #endif
    }
}