//Gameplay

let account = null;
let manifest = null;

// ------------------- DOM Helpers -------------------
const $ = id => document.getElementById(id);

const doorbellBtn = $('doorbell-button');
const playCentered = $('play-button-centered');
const overlay = $('overlay');
const potionModal = $('potion-modal');
const potionClose = $('potion-close');
const viewPotionsBtn = $('view-potions-btn');

const treatEls = {
  choco: $('choco-skull-display'),
  pumpkin: $('pulpy-pumpkin-display'),
  lollipop: $('vampire-lollipop-display'),
  ghost: $('ghost-candy-display'),
};

const legacy = {
  brewBribe: $('brew-bribe-potion-button'),
  brewSlayer: $('brew-witch-slayer-button'),
  brewMultiplier: $('brew-multiplier-button'),
  drinkBribe: $('drink-bribe-potion-button'),
  drinkSlayer: $('drink-witch-slayer-button'),
  drinkMultiplier: $('drink-treat-multiplier-button'),
  latestBrew: $('latest-brew-display'),
  latestGuzzle: $('latest-guzzle-display'),
};

// ------------------- AUDIO -------------------
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone({ freq = 440, length = 0.18, type = 'sine', gain = 0.12, detune = 0 }) {
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + length);
  osc.detune.value = detune;
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + length + 0.02);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + length + 0.03);
}

function playDoorbell() {
  playTone({ freq: 880, length: 0.09, gain: 0.06 });
  setTimeout(() => playTone({ freq: 1100, length: 0.09, gain: 0.08 }), 100);
}

function playCollect() {
  playTone({ freq: 520, length: 0.18, type: 'triangle', gain: 0.08 });
  setTimeout(() => playTone({ freq: 680, length: 0.12, type: 'triangle', gain: 0.06 }), 100);
}

function playBrew() {
  playTone({ freq: 300, length: 0.28, gain: 0.06 });
  setTimeout(() => playTone({ freq: 450, length: 0.18, gain: 0.06 }), 200);
}

function playWitchWail() {
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 1.2);
  g.gain.setValueAtTime(0.16, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 1.4);
}
// ------------------- POTION LOGIC -------------------
const POTION_RECIPES = {
  bribe: { treatKey: 'choco_skull', cost: 2 },
  slayer: { treatKey: 'vampire_lollipop', cost: 3 },
  multiplier: { treatKey: 'pulpy_pumpkin', cost: 4 },
};

// Runtime caches (always updated by on-chain entity data)
window.currentTreats = { choco_skull: 0, pulpy_pumpkin: 0, vampire_lollipop: 0, ghost_candy: 0 };
window.currentPotions = { bribe: 0, slayer: 0, multiplier: 0 };
window.activePotions = { bribe: false, slayer: false, multiplier: false };

// ------------------- CONFETTI -------------------
function triggerConfettiFromDoorbell() {
  const container = $('confetti-container');
  if (!container || !doorbellBtn) return;
  const rect = doorbellBtn.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const colors = ['#FFB84D', '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
  for (let i = 0; i < 32; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.position = 'fixed';
    el.style.left = originX + 'px';
    el.style.top = originY + 'px';
    el.style.width = '8px';
    el.style.height = '8px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = '2px';
    el.style.zIndex = 120;
    container.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    el.animate(
      [
        { transform: 'translate(0px,0px) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' }
    );
    setTimeout(() => el.remove(), 1700);
  }
}

// ------------------- TREAT UPDATER -------------------
function setTreatCounts({ choco = 0, pumpkin = 0, lollipop = 0, ghost = 0 }) {
  const update = (el, value) => {
    if (!el) return;
    const old = parseInt(el.textContent || '0', 10) || 0;
    el.textContent = String(value);
    if (value > old) {
      el.classList.add('glow');
      setTimeout(() => el.classList.remove('glow'), 400);
    }
  };
  update(treatEls.choco, choco);
  update(treatEls.pumpkin, pumpkin);
  update(treatEls.lollipop, lollipop);
  update(treatEls.ghost, ghost);
}

// glow style
const style = document.createElement('style');
style.innerHTML = '.glow{filter: drop-shadow(0 0 8px gold); transform: scale(1.08);}';
document.head.appendChild(style);

// ------------------- REAL ON-CHAIN ENTRYPOINTS -------------------
const ACTIONS_CONTRACT = 'witch_or_treat-actions';
const VRF_PROVIDER_ADDRESS = '0x15f542e25a4ce31481f986888c179b6e57412be340b8095f72f75a328fbb27b';

function potionSelector(potionChoice) {
  switch (potionChoice) {
    case 'Bribe': return ['0'];
    case 'Multiplier': return ['1'];
    case 'Slayer': return ['2'];
    default: throw new Error(`Invalid potion: ${potionChoice}`);
  }
}

async function treat_generator(account, manifest) {
  const action_addr = manifest.contracts.find(c => c.tag === ACTIONS_CONTRACT).address;
  const tx = await account.execute([
    {
      contractAddress: VRF_PROVIDER_ADDRESS,
      entrypoint: 'request_random',
      calldata: [action_addr, '0', account.address],
    },
    {
      contractAddress: action_addr,
      entrypoint: 'treat_generator',
      calldata: [],
    },
  ]);
  console.log('treat_generator tx:', tx);
}

async function potion_brewery(account, manifest, choice) {
  const action_addr = manifest.contracts.find(c => c.tag === ACTIONS_CONTRACT).address;
  const tx = await account.execute({
    contractAddress: action_addr,
    entrypoint: 'potion_brewery',
    calldata: potionSelector(choice),
  });
  console.log('potion_brewery tx:', tx);
}

async function guzzle_potion(account, manifest, choice) {
  const action_addr = manifest.contracts.find(c => c.tag === ACTIONS_CONTRACT).address;
  const tx = await account.execute({
    contractAddress: action_addr,
    entrypoint: 'guzzle_potion',
    calldata: potionSelector(choice),
  });
  console.log('guzzle_potion tx:', tx);
}

async function gameover(account, manifest) {
  const action_addr = manifest.contracts.find(c => c.tag === ACTIONS_CONTRACT).address;
  const tx = await account.execute({
    contractAddress: action_addr,
    entrypoint: 'gameover',
    calldata: [],
  });
  console.log('gameover tx:', tx);
}

// ------------------- GAME UI ACTIONS -------------------
export function initGame(acc, mani) {
  account = acc;
  manifest = mani;

  doorbellBtn.addEventListener('click', async () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    playDoorbell();
    doorbellBtn.animate([{ transform: 'translateX(-50%) scale(1)' }, { transform: 'translateX(-50%) scale(1.06)' }, { transform: 'translateX(-50%) scale(1)' }], { duration: 300 });
    await treat_generator(account, manifest);
  });

  viewPotionsBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    potionModal.classList.remove('hidden');
  });
  potionClose.addEventListener('click', () => {
    potionModal.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  // --- Brew buttons with validation ---
  document.querySelectorAll('.potion-action.brew').forEach(btn => {
  btn.addEventListener('click', async e => {
    const type = e.currentTarget.dataset.type;
    const costMap = {
      bribe: { key: 'pumpkin', amount: 2 },
      slayer: { key: 'lollipop', amount: 3 },
      multiplier: { key: 'ghost', amount: 4 },
    };

    const { key, amount } = costMap[type];
    const available = window.currentTreats?.[key] || 0;

    if (available < amount) {
      showFloatingText('Insufficient treats!', e.currentTarget);
      return;
    }

    playBrew();
    showFloatingText('Brewing...', e.currentTarget);

    await potion_brewery(account, manifest, capitalize(type));
    showFloatingText('Brewed!', e.currentTarget);
  });
  console.log("Game Initialised");
});

document.querySelectorAll('.potion-action.guzzle').forEach(btn => {
  btn.addEventListener('click', async e => {
    const type = e.currentTarget.dataset.type;
    const potionCountMap = {
      bribe: window.currentPotions?.bribe || 0,
      slayer: window.currentPotions?.slayer || 0,
      multiplier: window.currentPotions?.multiplier || 0,
    };

    if (potionCountMap[type] <= 0) {
      showFloatingText('None available!', e.currentTarget);
      return;
    }

    playCollect();
    showFloatingText('Guzzling...', e.currentTarget);

    await guzzle_potion(account, manifest, capitalize(type));
    showFloatingText('Drank!', e.currentTarget);
  });
});


  legacy.brewBribe?.addEventListener('click', () => document.querySelector('[data-type="bribe"].potion-action.brew')?.click());
  legacy.brewSlayer?.addEventListener('click', () => document.querySelector('[data-type="slayer"].potion-action.brew')?.click());
  legacy.brewMultiplier?.addEventListener('click', () => document.querySelector('[data-type="multiplier"].potion-action.brew')?.click());
  legacy.drinkBribe?.addEventListener('click', () => document.querySelector('[data-type="bribe"].potion-action.guzzle')?.click());
  legacy.drinkSlayer?.addEventListener('click', () => document.querySelector('[data-type="slayer"].potion-action.guzzle')?.click());
  legacy.drinkMultiplier?.addEventListener('click', () => document.querySelector('[data-type="multiplier"].potion-action.guzzle')?.click());
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ------------------- Entity Updates from Torii -------------------
let cursed = false;
export function updateFromEntitiesData(entities) {
  if (!entities || !entities.length) return;

  const Namespace = 'witch_or_treat';
  const TreatBagModel = 'TreatBag';
  const PotionBarModel = 'PotionBar';

  for (const entity of entities) {
    const treatBag = entity.models?.[Namespace]?.[TreatBagModel];
    const potionBar = entity.models?.[Namespace]?.[PotionBarModel];

    // --- TreatBag handling ---
    if (treatBag) {
      // Always update counts first
      setTreatCounts({
        choco: treatBag.choco_skull,
        pumpkin: treatBag.pulpy_pumpkin,
        lollipop: treatBag.vampire_lollipop,
        ghost: treatBag.ghost_candy,
      });

      // ✅ Store current treat counts globally for brew checks
      window.currentTreats = {
        choco: treatBag.choco_skull,
        pumpkin: treatBag.pulpy_pumpkin,
        lollipop: treatBag.vampire_lollipop,
        ghost: treatBag.ghost_candy,
      };


      const treatName = mapTreat(treatBag.latest_treat);

      if (treatName === 'WitchCurse') {
        if (!cursed){
        cursed = true;
        playWitchWail();
        gameover(account, manifest);
        showCurseScreen('A witch cursed you — you lost some treats. Press Play to continue.');
        }
      }else if (treatName === 'None') {
        if (cursed){cursed = false;}
        console.log('Nothing for you love!')
      } else {
        if (cursed){cursed = false;}
        playCollect();
        triggerConfettiFromDoorbell();
        if (treatName) showFloatingText(`+${treatName}`, doorbellBtn);
      }
    }

    // --- PotionBar handling ---
    if (potionBar) {
      // update cache
      window.currentPotions = {
        bribe: potionBar.witch_bribe ?? 0,
        slayer: potionBar.witch_slayer ?? 0,
        multiplier: potionBar.treat_multiplier ?? 0,
      };
      window.activePotions = {
        bribe: !!potionBar.witch_bribe_active,
        slayer: !!potionBar.witch_slayer_active,
        multiplier: !!potionBar.treat_multiplier_active,
      };

      // refresh modal UI
      updatePotionModal(window.currentPotions, window.activePotions, window.currentTreats);

      if (legacy.latestBrew) legacy.latestBrew.textContent = mapPotion(potionBar.latest_brew);
      if (legacy.latestGuzzle) legacy.latestGuzzle.textContent = mapPotion(potionBar.latest_guzzle);
    }
  }
}

function mapTreat(i) {
  switch (i) {
    case 1: return 'ChocoSkull';
    case 2: return 'WitchCurse';
    case 3: return 'VampireLollipop';
    case 4: return 'PulpyPumpkin';
    case 5: return 'GhostCandy';
    default: return 'None';
  }
}

function mapPotion(i) {
  switch (i) {
    case 0: return 'Bribe';
    case 1: return 'Multiplier';
    case 2: return 'Slayer';
    default: return '';
  }
}

// ------------------- Floating Text -------------------
function showFloatingText(text, anchorEl) {
  if (!anchorEl) return;
  const rect = anchorEl.getBoundingClientRect();
  const el = document.createElement('div');
  el.textContent = text;
  el.style.position = 'fixed';
  el.style.left = rect.left + rect.width / 2 + 'px';
  el.style.top = rect.top - 12 + 'px';
  el.style.transform = 'translate(-50%, 0)';
  el.style.zIndex = 200;
  el.style.padding = '6px 10px';
  el.style.background = 'linear-gradient(90deg,#ffd36b,#ff9f1c)';
  el.style.borderRadius = '6px';
  el.style.color = '#081424';
  el.style.fontWeight = 800;
  document.body.appendChild(el);
  el.animate(
    [{ opacity: 1, transform: 'translate(-50%,0)' }, { opacity: 0, transform: 'translate(-50%,-3.2rem)' }],
    { duration: 900, easing: 'ease-out', fill: 'forwards' }
  );
  setTimeout(() => el.remove(), 1000);
}

// ------------------- Curse Screen -------------------
function showCurseScreen(text) {
  overlay.classList.remove('hidden');
  potionModal.classList.add('hidden');
  $('curse-screen').classList.remove('hidden');
  $('curse-text').textContent = text || 'Witch curse! Press Play to continue.';
  doorbellBtn.disabled = true;
}

playCentered.addEventListener('click', () => {
  doorbellBtn.disabled = false;
  overlay.classList.add('hidden');
  $('curse-screen').classList.add('hidden');
});

function updatePotionModal(currentPotions, activePotions, currentTreats) {
  document.querySelectorAll('.potion-card').forEach(card => {
    const type = card.dataset.type; // "bribe", "slayer", "multiplier"
    const treatsEl = card.querySelector('.potion-treats');
    const ownedEl = card.querySelector('.potion-owned');
    const activeEl = card.querySelector('.potion-active');

    // Determine treat key + emoji based on potion type
    const treatMap = {
      bribe: { key: 'pumpkin', emoji: '🎃', pemoji: '🧵' },
      slayer: { key: 'lollipop', emoji: '🍭', pemoji: '🗡' },
      multiplier: { key: 'ghost', emoji: '👻', pemoji: '✨'},
    };
    const { key, emoji, pemoji } = treatMap[type];
    const treatCount = currentTreats?.[key] ?? 0;
    const potionCount = currentPotions?.[type] ?? 0;
    const isActive = !!activePotions?.[type];

    // Update UI text
    if (treatsEl) treatsEl.textContent = `You have ${treatCount} ${emoji}`;
    if (ownedEl) ownedEl.textContent = `You have ${potionCount} ${pemoji}`;

    // Toggle active indicator
    if (activeEl) activeEl.classList.toggle('hidden', !isActive);
  });
}

// export { initGame, updateFromEntitiesData };