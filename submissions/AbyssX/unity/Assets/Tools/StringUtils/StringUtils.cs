 namespace Abyss.Utils
 {
     public static class StringUtils
     {   
         public static string ToPascal(this string str)
         {
             string[] split = str.Split(new char[] { '/', ' ', '_', '.' });
             string newStr = "";
             foreach (var item in split)
             {
                 char[] chars = item.ToCharArray();
                 chars[0] = char.ToUpper(chars[0]);
                 for (int i = 1; i < chars.Length; i++)
                 {
                     if (chars[i] >= 'A' && chars[i] <= 'Z')
                     {
                         continue;
                     }

                     chars[i] = char.ToLower(chars[i]);
                 }
                 newStr += new string(chars);
             }
             return newStr;
         }
     }
     
 }

