using System.Collections.Generic;
using Assets.HeroEditor.Common.Scripts.CharacterScripts;
using Assets.HeroEditor.Common.Scripts.ExampleScripts;
using HeroEditor.Common.Enums;
using UnityEngine;
using UnityEngine.UI;

namespace Assets.HeroEditor.Common.Scripts.EditorScripts
{
    public class CaptureOptions : MonoBehaviour
    {
        public Toggle Idle;
        public Toggle Walk;
        public Toggle Run;
        public Toggle Slash;
        public Toggle Jab;
        public Toggle Shot;
        public Toggle Cast;
        public Toggle DeathBack;
        public Toggle DeathFront;
        public Toggle Shadow;
        public InputField FrameSize;
        public InputField FrameCount;

        public void Open()
        {
            gameObject.SetActive(true);
        }

        public void Close()
        {
            gameObject.SetActive(false);
        }

        public void Capture()
        {
            var options = new List<CaptureOption>();

            if (Idle.isOn) options.Add(new CaptureOption(CharacterState.Idle, null));
            if (Walk.isOn) options.Add(new CaptureOption(CharacterState.Walk, null));
            if (Run.isOn) options.Add(new CaptureOption(CharacterState.Run, null));
            if (Slash.isOn) options.Add(new CaptureOption(CharacterState.Idle, "Slash"));
            if (Jab.isOn) options.Add(new CaptureOption(CharacterState.Idle, "Jab"));

            if (Shot.isOn)
            {
                var character = FindObjectOfType<Character>();

                switch (character.WeaponType)
                {
                    case WeaponType.Bow:
                        options.Add(new CaptureOption(CharacterState.Idle, "SimpleBowShot"));
                        break;
                }
            }

            if (Cast.isOn) options.Add(new CaptureOption(CharacterState.Idle, "Cast"));
            if (DeathBack.isOn) options.Add(new CaptureOption(CharacterState.DeathB, null));
            if (DeathFront.isOn) options.Add(new CaptureOption(CharacterState.DeathF, null));

            FindObjectOfType<SpriteSheetCapture>().Capture(options, int.Parse(FrameSize.text), int.Parse(FrameCount.text), Shadow.isOn);
            Close();
        }

        public void OnFrameSizeChanged(string value)
        {
            if (FrameSize.text == "") return;

            var valueInt = int.Parse(value);

            if (valueInt < 128) valueInt = 128;
            if (valueInt > 512) valueInt = 512;

            FrameSize.SetTextWithoutNotify(valueInt.ToString());
        }

        public void OnFrameCountChanged(string value)
        {
            if (FrameCount.text == "") return;

            var valueInt = int.Parse(value);

            if (valueInt < 4) valueInt = 4;
            if (valueInt > 16) valueInt = 16;

            FrameCount.SetTextWithoutNotify(valueInt.ToString());
        }
    }
}