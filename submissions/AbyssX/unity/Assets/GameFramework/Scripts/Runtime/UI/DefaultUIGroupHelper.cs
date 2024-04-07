//------------------------------------------------------------
// Game Framework
// Copyright © 2013-2021 Jiang Yin. All rights reserved.
// Homepage: https://gameframework.cn/
// Feedback: mailto:ellan@gameframework.cn
//------------------------------------------------------------

using UnityEngine;
using UnityEngine.UI;

namespace UnityGameFramework.Runtime
{
    /// <summary>
    /// 默认界面组辅助器。
    /// </summary>
    public class DefaultUIGroupHelper : UIGroupHelperBase
    {
        public const int DepthFactor = 100;

        private int m_Depth = 0;
        private Canvas m_CachedCanvas = null;

        /// <summary>
        /// 设置界面组深度。
        /// </summary>
        /// <param name="depth">界面组深度。</param>
        public override void SetDepth(int depth)
        {
            m_Depth = depth;
            m_CachedCanvas.overrideSorting = true;
            m_CachedCanvas.sortingOrder = DepthFactor * depth;
        }

        private void Awake()
        {
            m_CachedCanvas = gameObject.GetOrAddComponent<Canvas>();
            gameObject.GetOrAddComponent<GraphicRaycaster>();
        }

        private void Start()
        {
            m_CachedCanvas.overrideSorting = true;
            m_CachedCanvas.sortingOrder = DepthFactor * m_Depth;

            RectTransform transform = GetComponent<RectTransform>();
            transform.anchorMin = Vector2.one / 2f;
            transform.anchorMax = Vector2.one / 2f;
            transform.anchoredPosition = Vector2.zero;
            transform.sizeDelta = new Vector2(1920f, 1080f);
            // transform.sizeDelta = Vector2.zero;
        }
    }
}
