using System;
using System.Collections;

namespace Assets.HeroEditor.Common.Scripts.Common
{
	public static class StandaloneFilePicker
	{
		#if UNITY_EDITOR

		public static IEnumerator OpenFile(string title, string directory, string extension, Action<bool, string, byte[]> callback)
		{
			var path = UnityEditor.EditorUtility.OpenFilePanel(title, directory, extension);

			if (!string.IsNullOrEmpty(path))
			{
				var bytes = System.IO.File.ReadAllBytes(path);

				callback(true, path, bytes);
			}
			else
			{
				callback(false, null, null);
			}

			yield break;
		}

		public static IEnumerator SaveFile(string title, string directory, string defaultName, string extension, byte[] bytes, Action<bool, string> callback)
		{
			var path = UnityEditor.EditorUtility.SaveFilePanel(title, directory, defaultName, extension);

			if (!string.IsNullOrEmpty(path))
			{
				System.IO.File.WriteAllBytes(path, bytes);
				callback(true, path);
			}
			else
			{
				callback(false, null);
			}

			yield break;
		}
	
		#elif UNITY_STANDALONE_WIN || UNITY_WSA

		public static IEnumerator OpenFile(string title, string directory, string extension, Action<bool, string, byte[]> callback)
		{
			throw new NotImplementedException("Import [Simple File Browser For Windows]: http://u3d.as/2QLg");
            //yield return SimpleFileBrowserForWindows.WindowsFileBrowser.OpenFile(title, directory, "File", new List<string> { extension }, callback);
        }

		public static IEnumerator SaveFile(string title, string directory, string defaultName, string extension, byte[] bytes, Action<bool, string> callback)
		{
            throw new NotImplementedException("Import [Simple File Browser For Windows]: http://u3d.as/2QLg");
			//yield return SimpleFileBrowserForWindows.WindowsFileBrowser.SaveFile(title, directory, defaultName, "Prefab", extension, bytes, callback);
		}

		#elif UNITY_WEBGL

		public static IEnumerator OpenFile(string title, string directory, string extension, Action<bool, string, byte[]> callback)
		{
			throw new NotImplementedException("Import [Simple File Browser for WebGL]: http://u3d.as/2W52");
            //SimpleFileBrowserForWebGL.WebFileBrowser.Upload(callback, extension);
		}

		public static IEnumerator SaveFile(string title, string directory, string defaultName, string extension, byte[] bytes, Action<bool, string> callback)
		{
            throw new NotImplementedException("Import [Simple File Browser for WebGL]: http://u3d.as/2W52");
            //SimpleFileBrowserForWebGL.WebFileBrowser.Download(defaultName, bytes);
		}

		#else

		public static IEnumerator OpenFile(string title, string directory, string extension, Action<bool, string, byte[]> callback)
		{
			throw new NotSupportedException();
		}

		public static IEnumerator SaveFile(string title, string directory, string defaultName, string extension, byte[] bytes, Action<bool, string> callback)
		{
			throw new NotSupportedException();
		}

		#endif
	}
}