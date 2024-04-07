using System;
using System.Collections.Generic;
using System.Linq;
using Assets.HeroEditor.Common.Scripts.Common.Springs;
using Assets.HeroEditor.Common.Scripts.ExampleScripts;
using Assets.HeroEditor.Common.Scripts.CharacterScripts.Firearms;
using Assets.HeroEditor.Common.Scripts.Common;
using HeroEditor.Common;
using HeroEditor.Common.Enums;
using UnityEngine;

namespace Assets.HeroEditor.Common.Scripts.CharacterScripts
{
    /// <summary>
    /// Character presentation in editor. Contains sprites, renderers, animation and so on.
    /// </summary>
    public partial class Character : CharacterBase
    {
        [Header("Weapons")]
        public MeleeWeapon MeleeWeapon;
        public Firearm Firearm;

		[Header("Service")]
		public LayerManager LayerManager;

        [Header("Custom")]
        public bool ShowHelmet = true;

        public Vector2 BodyScale
	    {
		    get { return BodyRenderers.Single(i => i.name == "Torso").transform.localScale; }
		    set => GetComponent<CharacterBodySculptor>().OnCharacterLoaded(value);
        }

	    /// <summary>
		/// Called automatically when something was changed.
		/// </summary>
		public void OnValidate()
        {
            if (Head == null) return;

            Initialize();
        }

        public void Start()
        {
            // We can use [StateHandler] attached to animation states to handle state transitions.
            foreach (var handler in Animator.GetBehaviours<StateHandler>().Where(i => i.Name.Contains("Death")))
            {
                handler.StateEnter.RemoveAllListeners();
                handler.StateEnter.AddListener(() => SetExpression("Dead"));

                handler.StateExit.RemoveAllListeners();
                handler.StateExit.AddListener(() => SetExpression("Default"));
            }
        }
        
        /// <summary>
        /// Called automatically when object was enabled.
        /// </summary>
        public void OnEnable()
        {
            HairMask.isCustomRangeActive = true;
            HairMask.frontSortingOrder = HelmetRenderer.sortingOrder;
            HairMask.backSortingOrder = HairRenderer.sortingOrder;
			UpdateAnimation();
        }

	    public void OnDisable()
	    {
		    _animationState = -1;
	    }

	    private int _animationState = -1;

		/// <summary>
        /// Initializes character renderers with selected sprites.
        /// </summary>
        public override void Initialize()
        {
            try // Disable try/catch for debugging.
            {
                TryInitialize();
            }
            catch (Exception e)
            {
                Debug.LogWarningFormat("Unable to initialize character {0}: {1}", name, e.Message);
            }
        }

		/// <summary>
		/// Initializes character renderers with selected sprites.
		/// </summary>
		private void TryInitialize()
		{
            if (Expressions.All(i => i.Name != "Default") || Expressions.All(i => i.Name != "Angry") || Expressions.All(i => i.Name != "Dead"))
            {
                throw new Exception("Character must have at least 3 basic expressions: Default, Angry and Dead.");
            }

            if (ShowHelmet)
            {
                HelmetRenderer.sprite = Helmet;
                EarsRenderer.enabled = !(FullHair && HideEars);
                HairRenderer.maskInteraction = FullHair ? SpriteMaskInteraction.None : SpriteMaskInteraction.VisibleInsideMask;
            }
            else
            {
                HelmetRenderer.sprite = null;
                EarsRenderer.enabled = true;
                HairRenderer.maskInteraction = SpriteMaskInteraction.None;
            }

            HeadRenderer.sprite = Head;
            EarsRenderer.sprite = Ears;
            HairRenderer.sprite = Hair;
			SetExpression(Expression);
			BeardRenderer.sprite = Beard;
			MapSprites(BodyRenderers, Body);
			GlassesRenderer.sprite = Glasses;
			MaskRenderer.sprite = Mask;
			EarringsRenderer.sprite = Earrings;
			MapSprites(ArmorRenderers, Armor);
			CapeRenderer.sprite = Cape;
			BackRenderer.sprite = Back;
			PrimaryMeleeWeaponRenderer.sprite = PrimaryMeleeWeapon;
			SecondaryMeleeWeaponRenderer.sprite = SecondaryMeleeWeapon;
			MapSprites(BowRenderers, Bow);
			MapSprites(FirearmsRenderers, Firearms);
			ShieldRenderer.sprite = Shield;

			PrimaryMeleeWeaponRenderer.enabled = WeaponType != WeaponType.Bow;
			SecondaryMeleeWeaponRenderer.enabled = WeaponType == WeaponType.MeleePaired;
			BowRenderers.ForEach(i => i.enabled = WeaponType == WeaponType.Bow);
			ShieldRenderer.enabled = WeaponType == WeaponType.Melee1H || WeaponType == WeaponType.Firearm1H;

			if (Hair != null && HideEars && HairRenderer.maskInteraction == SpriteMaskInteraction.None)
			{
				EarsRenderer.sprite = null;
			}

			switch (WeaponType)
			{
                case WeaponType.Firearm1H:
                case WeaponType.Firearm2H:
                {
                    Firearm.AmmoShooted = 0;
                    BuildFirearms(Firearm.Params);
                    break;
                }
            }

            ApplyMaterials();
            UpdateAnimation();
		}

        /// <summary>
        /// Refer to Animator window for animation params, states and transitions!
        /// </summary>
        public override void UpdateAnimation()
        {
            if (!Animator.isInitialized) return;

            var state = 100 * (int) WeaponType;

            Animator.SetInteger("WeaponType", (int) WeaponType);

            if ((WeaponType == WeaponType.Firearm1H || WeaponType == WeaponType.Firearm2H || WeaponType == WeaponType.FirearmsPaired) && Firearm.Params != null)
            {
				Animator.SetInteger("MagazineType", (int) Firearm.Params.MagazineType);
                Animator.SetInteger("HoldType", (int) Firearm.Params.HoldType);
                state += (int) Firearm.Params.HoldType;
            }

            if (state == _animationState) return; // No need to change animation.

            _animationState = state;
			
            if (WeaponType == WeaponType.Firearm1H || WeaponType == WeaponType.Firearm2H)
            {
                Animator.Play("IdleFirearm", 0); // Upper body
            }
            else
            {
                Animator.Play("IdleMelee", 0); // Upper body
            }

            Relax();
            SetState(CharacterState.Idle);
		}

		/// <summary>
		/// Alternative way to Hit character (with a script).
		/// </summary>
		public void Spring()
        {
            ScaleSpring.Begin(this, 1f, 1.1f, 40, 2);
        }

        private void ApplyMaterials()
        {
            var renderers = new List<SpriteRenderer>();

            renderers.Add(HelmetRenderer);
            renderers.AddRange(ArmorRenderers);
            renderers.Add(ShieldRenderer);
            renderers.Add(PrimaryMeleeWeaponRenderer);
            renderers.Add(SecondaryMeleeWeaponRenderer);
            renderers.AddRange(BowRenderers);
            renderers.ForEach(i => i.sharedMaterial = i.color == Color.white ? DefaultMaterial : EquipmentPaintMaterial);
        }
    }
}