using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.Common;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.EditorScripts
{
    [RequireComponent(typeof(Camera))]
    public class SpriteSheetCapture : MonoBehaviour
    {
        private Character _character;

        public void Capture(List<CaptureOption> options, int frameSize, int frameCount, bool shadow)
        {
            StartCoroutine(CaptureFrames(options, frameSize, frameCount, shadow));
        }

        private IEnumerator CaptureFrames(List<CaptureOption> options, int frameSize, int frameCount, bool shadow)
        {
            _character = FindObjectOfType<Character>();
            _character.LayerManager.Sprites[0].gameObject.SetActive(shadow);

            var clips = new Dictionary<string, List<Texture2D>>();

            foreach (var option in options)
            {
                _character.Animator.SetInteger("State", (int) option.State);

                if (option.Action != null)
                {
                    _character.Animator.SetTrigger(option.Action);
                }
                else
                {
                    _character.Animator.ResetTrigger("Slash");
                    _character.Animator.ResetTrigger("Jab");
                }

                _character.Animator.SetBool("Action", option.Action != null);
                _character.Animator.speed = 2;

                yield return new WaitForSeconds(0.1f);

                _character.Animator.speed = 0;

                var upperClip = _character.Animator.GetCurrentAnimatorClipInfo(0)[0].clip;
                var lowerClip = _character.Animator.GetCurrentAnimatorClipInfo(1)[0].clip;
                
                for (var j = 0; j < frameCount; j++)
                {
                    var normalizedTime = (float) j / (frameCount - 1);
                    var expressionEvent = upperClip.events.Where(i => i.functionName == "SetExpression" && Mathf.Abs(i.time / upperClip.length - normalizedTime) <= 1f / (frameCount - 1))
                        .OrderBy(i => Mathf.Abs(i.time / upperClip.length - normalizedTime)).FirstOrDefault();

                    if (expressionEvent != null)
                    {
                        _character.SetExpression(expressionEvent.stringParameter);
                    }

                    yield return ShowFrame(upperClip.name, lowerClip.name, normalizedTime);

                    var frame = CaptureFrame(frameSize, frameSize);
                    var animationName = option.Action ?? option.State.ToString();

                    if (clips.ContainsKey(animationName))
                    {
                        clips[animationName].Add(frame);
                    }
                    else
                    {
                        clips.Add(animationName, new List<Texture2D> { frame });
                    }
                }
            }

            _character.SetState(CharacterState.Idle);
            _character.Animator.speed = 1;

            var texture = CreateSheet(clips, frameSize, frameSize);

            yield return StandaloneFilePicker.SaveFile("Save as sprite sheet", "", "Character", "png", texture.EncodeToPNG(), (success, path) => { Debug.Log(success ? $"Saved as {path}" : "Error saving."); });
        }

        private IEnumerator ShowFrame(string upperClip, string lowerClip, float normalizedTime)
        {
            _character.Animator.Play(upperClip, 0, normalizedTime);
            _character.Animator.Play(lowerClip, 1, normalizedTime);

            yield return null;

            while (_character.Animator.GetCurrentAnimatorClipInfo(0).Length == 0)
            {
                yield return null;
            }

            if (_character.Animator.IsInTransition(1))
            {
                Debug.Log("IsInTransition");
            }
        }

        private Texture2D CaptureFrame(int width, int height)
        {
            var cam = GetComponent<Camera>();
            var renderTexture = new RenderTexture(width, height, 24);
            var texture2D = new Texture2D(width, height, TextureFormat.ARGB32, false);

            cam.targetTexture = renderTexture;
            cam.Render();
            RenderTexture.active = renderTexture;
            texture2D.ReadPixels(new Rect(0, 0, width, height), 0, 0);
            cam.targetTexture = null;
            RenderTexture.active = null;
            Destroy(renderTexture);

            return texture2D;
        }

        private Texture2D CreateSheet(Dictionary<string, List<Texture2D>> clips, int width, int height)
        {
            var texture = new Texture2D(clips.First().Value.Count * width, clips.Keys.Count * height);

            foreach (var clip in clips)
            {
                for (var i = 0; i < clip.Value.Count; i++)
                {
                    texture.SetPixels(i * width, clips.Keys.Reverse().ToList().IndexOf(clip.Key) * height, width, height, clip.Value[i].GetPixels());
                }
            }

            texture.Apply();

            return texture;
        }
    }

    public class CaptureOption
    {
        public CharacterState State;
        public string Action;

        public CaptureOption(CharacterState state, string action)
        {
            State = state;
            Action = action;
        }
    }
}