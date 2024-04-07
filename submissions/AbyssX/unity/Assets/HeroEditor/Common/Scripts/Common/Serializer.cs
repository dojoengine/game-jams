using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Assets.HeroEditor.Common.Scripts.Common
{
    /// <summary>
    /// This is a replacement for Newtonsoft serializer to avoid the DLL use. You can use Newtonsoft if you want.
    /// </summary>
    internal static class Serializer
    {
        internal static string Serialize(Dictionary<string, string> dict)
        {
            return "{" + string.Join(",", dict.Select(i => $"\"{i.Key}\":\"{i.Value}\"")) + "}";
        }

        internal static Dictionary<string, string> DeserializeDict(string json)
        {
            var dict = new Dictionary<string, string>();

            foreach (Match match in Regex.Matches(json, "\"(.*?)\":(?:\"(.*?)\")?"))
            {
                dict.Add(match.Groups[1].Value, match.Groups.Count == 2 ? null : match.Groups[2].Value);
            }

            return dict;
        }

        internal static string Serialize(List<string> list)
        {
            return "{" + string.Join(",", list.Select(i => $"\"{i}\"")) + "}";
        }

        internal static List<string> DeserializeList(string json)
        {
            var list = new List<string>();

            foreach (Match match in Regex.Matches(json, "\"(.*?)\""))
            {
                list.Add(match.Groups[1].Value);
            }

            return list;
        }
    }
}