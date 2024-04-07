using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO;
using System.Linq;
using System.Text;
using UnityEditor.Compilation;
using UnityGameFramework.Runtime;
using FileMode = System.IO.FileMode;

namespace Abyss.Utils
{
    public static class UiPathGenerator
{

    private static string s_PathGeneratorPattern = 
    @" 
    using System;
    using UnityGameFramework;
    using UnityGameFramework.Runtime;
    
    namespace Abyss.Core{{
        public class UiFormPath
        {{
            {0}
        }}
    }}    
    ";

    private static string s_PathGeneratorPatternItem = 
        "public const string {0} = \"{1}\";";
    
    [MenuItem("工具/UI工具/自动生成UI索引路径")]
    public static unsafe void GenerateUIPath()
    {
        var targetFilePath = Path.Combine(Application.dataPath, "Core/ConstData/UIFormPath.cs");
        var prefabs = AssetDatabase.FindAssets("t:prefab", new []{"Assets/Resources/UIBusiness"});

        var classContents = new StringBuilder();
        using (var fi = new FileStream(targetFilePath, FileMode.OpenOrCreate))
        {
            int idx = 0;
            foreach (var prefab in prefabs)
            {
                var assetPath =  AssetDatabase.GUIDToAssetPath(prefab);
                var split = assetPath.Split(new []{'\\', '/', '.'});
                var fileName = split[^2];
                if (idx != 0)
                {
                    classContents.AppendLine($"\t\t\t{string.Format(s_PathGeneratorPatternItem, fileName.ToPascal() ,assetPath)}" );
                }
                else
                {
                    classContents.AppendLine(string.Format(s_PathGeneratorPatternItem, fileName.ToPascal() ,assetPath));
                }
                idx++;
            }
            var targetDestination = string.Format(s_PathGeneratorPattern, classContents.ToString()).ToCharArray();
            Byte[] byteData = new Byte[targetDestination.Length];
            var encoder = Encoding.UTF8.GetEncoder();
            encoder.GetBytes(targetDestination, 0, targetDestination.Length, byteData, 0, true);
            fi.Write(Encoding.UTF8.GetBytes(targetDestination));
            
            AssetDatabase.Refresh();
            CompilationPipeline.RequestScriptCompilation();
        }
    }
}
}


