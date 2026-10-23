const STORAGE_KEY = 'homeQuestSaveV1';
const ROUND_SECONDS = 30; // Short timer so a battle is easy to demonstrate.
const PLAYER_MAX_HP = 100;
const XP_PER_LEVEL = 125;
const DAMAGE_ON_MISS = 40;
const ENRAGED_HP_BONUS = 50;
const ENRAGED_XP_BONUS = 50;
const BOSS_LIST = [
  { id: 'grime-goblin', name: 'Grime Goblin', area: 'KITCHEN', emoji: '👾', enrageIcon: '🩸', description: 'A tiny terror made of dishes and crumbs.', hp: 100, xpReward: 70, chores: [
    ['Clear the dishes', 'Put away or wash the dishes by the sink.', 'KITCHEN'],
    ['Wipe the counter', 'Clear crumbs and wipe down one kitchen surface.', 'KITCHEN'],
    ['Take out the rubbish', 'Tie up the kitchen bin bag and take it out.', 'KITCHEN'],
    ['Sweep the floor', 'Sweep the kitchen floor, especially under the table.', 'KITCHEN'],
    ['Reset the table', 'Put away clutter and make the table ready to use.', 'KITCHEN'],
    ['Clean the microwave', 'Wipe the inside and outside of the microwave.', 'KITCHEN'],
    ['Put away groceries', 'Put away food or pantry items waiting on the counter.', 'KITCHEN'],
    ['Rinse the sink', 'Rinse the sink and wipe around the tap.', 'KITCHEN'],
    ['Wipe the fridge handle', 'Clean the fridge handle and one nearby spot.', 'KITCHEN'],
    ['Sort the recycling', 'Put recyclable packaging in the right bin.', 'KITCHEN'],
  ] },
  { id: 'dust-dragon', name: 'Dust Dragon', area: 'LIVING ROOM', emoji: '🐉', enrageIcon: '🔥', description: 'A dusty beast hiding under the sofa.', hp: 100, xpReward: 75, chores: [
    ['Tidy the living room', 'Put loose items back where they belong.', 'TIDY'],
    ['Dust a surface', 'Dust the TV stand, shelves, or coffee table.', 'TIDY'],
    ['Fold the blankets', 'Fold blankets and straighten the sofa cushions.', 'TIDY'],
    ['Clear the coffee table', 'Put away cups, papers, and anything that does not belong.', 'TIDY'],
    ['Vacuum one area', 'Vacuum the main walkway or around the sofa.', 'TIDY'],
    ['Put shoes away', 'Pair up shoes and return them to their place.', 'TIDY'],
    ['Gather stray cups', 'Collect cups and glasses and bring them to the kitchen.', 'TIDY'],
    ['Organize one shelf', 'Spend a few minutes putting one shelf in order.', 'TIDY'],
    ['Straighten the entryway', 'Put away coats, bags, and items by the door.', 'TIDY'],
    ['Water a plant', 'Check a houseplant and water it if it needs it.', 'TIDY'],
  ] },
  { id: 'laundry-lich', name: 'Laundry Lich', area: 'LAUNDRY', emoji: '🧟', enrageIcon: '⚡', description: 'An undead mountain of clothes has appeared.', hp: 100, xpReward: 80, chores: [
    ['Start a laundry load', 'Gather a load and start the washing machine.', 'LAUNDRY'],
    ['Fold clean clothes', 'Fold a small pile of clean laundry.', 'LAUNDRY'],
    ['Put clothes away', 'Put away clothes that are waiting in a basket.', 'LAUNDRY'],
    ['Pair up the socks', 'Match a few pairs and put them in the drawer.', 'LAUNDRY'],
    ['Clear the laundry area', 'Put detergent and laundry items back in place.', 'LAUNDRY'],
    ['Sort a laundry basket', 'Separate one small basket into lights and darks.', 'LAUNDRY'],
    ['Hang up clothes', 'Hang a few clean items that crease easily.', 'LAUNDRY'],
    ['Change a bedsheet', 'Put a fresh sheet on one bed.', 'LAUNDRY'],
    ['Put towels away', 'Fold or hang clean towels in their usual place.', 'LAUNDRY'],
    ['Wipe the washer top', 'Clear and wipe the top of the washing machine.', 'LAUNDRY'],
  ] },
  { id: 'bathroom-blob', name: 'Bathroom Blob', area: 'BATHROOM', emoji: '🫧', enrageIcon: '☣️', description: 'A slippery slime that thrives on splashes and soap scum.', hp: 100, xpReward: 90, chores: [
    ['Wipe the bathroom sink', 'Wipe the basin and the area around the tap.', 'BATHROOM'],
    ['Clean the mirror', 'Wipe fingerprints and water spots from the mirror.', 'BATHROOM'],
    ['Hang fresh towels', 'Replace or neatly hang the bathroom towels.', 'BATHROOM'],
    ['Scrub the toilet', 'Give the toilet bowl and seat a quick clean.', 'BATHROOM'],
    ['Clear the shower drain', 'Remove visible hair or debris from the drain.', 'BATHROOM'],
    ['Wipe the shower screen', 'Wipe water marks from one shower surface.', 'BATHROOM'],
    ['Restock toilet paper', 'Check the holder and put a spare roll nearby.', 'BATHROOM'],
    ['Empty the bathroom bin', 'Empty the small bin and replace its liner if needed.', 'BATHROOM'],
    ['Put toiletries away', 'Return bottles and products to their usual place.', 'BATHROOM'],
    ['Mop a small area', 'Mop the bathroom floor around the sink and toilet.', 'BATHROOM'],
  ] },
  { id: 'pantry-phantom', name: 'Pantry Phantom', area: 'PANTRY', emoji: '👻', enrageIcon: '👁️', description: 'A sneaky spirit hiding behind forgotten food.', hp: 100, xpReward: 100, chores: [
    ['Sort one food shelf', 'Group similar items and make one shelf easier to use.', 'PANTRY'],
    ['Check food dates', 'Check a few items and set aside anything expired.', 'PANTRY'],
    ['Put pantry items away', 'Return loose groceries to their proper shelves.', 'PANTRY'],
    ['Wipe a shelf', 'Move a few items and wipe one pantry shelf.', 'PANTRY'],
    ['Organize spices', 'Group spices together and put them back neatly.', 'PANTRY'],
    ['Recycle empty boxes', 'Flatten and recycle empty food packaging.', 'PANTRY'],
    ['Make a use-first spot', 'Place soon-to-expire food together where you can see it.', 'PANTRY'],
    ['Tidy the snack shelf', 'Arrange snack packets and close any open bags.', 'PANTRY'],
    ['Label a container', 'Label one open or transferred pantry container.', 'PANTRY'],
    ['Sweep the pantry floor', 'Sweep crumbs from the pantry or cupboard area.', 'PANTRY'],
  ] },
];
const LEVEL_REWARDS = [
  '☕ Take a 5-minute break',
  '🥤 Enjoy your favorite drink',
  '🍿 Make yourself a snack',
  '🎮 Play a game for 20 minutes',
  '🎬 Watch a movie',
  '🍰 Pick a favorite dessert',
  '🎧 Spend an hour on a hobby',
  '🌟 Have a relaxed evening off',
  '🎟️ Treat yourself to a movie ticket',
  '🏆 Choose a bigger personal treat',
];
const ACHIEVEMENTS = [
  { id: 'first-win', name: 'Double Victory', detail: 'Defeat two bosses.', target: 2, xp: 35, test: (s) => s.totalBossesDefeated >= 2 },
  { id: 'chores-10', name: 'Chore Collector', detail: 'Complete 12 different chores.', target: 12, xp: 40, test: (s) => uniqueChoreCount() >= 12 },
  { id: 'chores-25', name: 'Variety Seeker', detail: 'Complete 30 different chores.', target: 30, xp: 75, test: (s) => uniqueChoreCount() >= 30 },
  { id: 'chores-40', name: 'Household Completionist', detail: 'Complete 50 different chores.', target: 50, xp: 110, test: (s) => uniqueChoreCount() >= 50 },
];
const RUN_ACHIEVEMENTS = [
  { id: 'full-run', name: 'Rogue Circuit', detail: 'Defeat all five bosses in one run.', xp: 120 },
  { id: 'clean-run', name: 'Untouchable Run', detail: 'Defeat all five bosses without skipping or timing out.', xp: 180 },
];

const freshSave = () => ({ xp: 0, level: 1, levelStartXp: 0, heroName: '', totalBossesDefeated: 0, runDefeats: 0, runOrder: [], previousRunOrder: [], enragedBossId: '', runMisses: 0, runsCompleted: 0, choresCompleted: 0, achievements: [], runAchievements: [], achievementCounts: {}, pendingRewardLevels: [], completedByBoss: {} });
let save = loadSave();
if (!isValidRunOrder(save.runOrder)) beginNewRun();
else if (!save.enragedBossId || !save.runOrder.includes(save.enragedBossId)) save.enragedBossId = save.runOrder[Math.floor(Math.random() * save.runOrder.length)];
let playerHp = PLAYER_MAX_HP;
let bossHp = 100;
let round = 0;
let timerId = null;
let secondsLeft = ROUND_SECONDS;
let battleChores = [];
let currentScreen = 'home';
const lastChoreOrder = new Map();

const $ = (selector) => document.querySelector(selector);
const homeScreen = $('#home-screen');
const welcomeScreen = $('#welcome-screen');
const battleScreen = $('#battle-screen');
const achievementsScreen = $('#achievements-screen');
const rewardsScreen = $('#rewards-screen');

function loadSave() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data || typeof data !== 'object') return freshSave();
    const loaded = { ...freshSave(), ...data };
    if (typeof data.levelStartXp !== 'number') loaded.levelStartXp = Math.max(0, loaded.xp - (loaded.level - 1) * 100);
    if (typeof data.totalBossesDefeated !== 'number') loaded.totalBossesDefeated = data.bossesDefeated || 0;
    if (!Array.isArray(loaded.achievements)) loaded.achievements = [];
    if (!Array.isArray(loaded.runAchievements)) loaded.runAchievements = [];
    if (!Array.isArray(loaded.pendingRewardLevels)) loaded.pendingRewardLevels = [];
    if (!loaded.achievementCounts || typeof loaded.achievementCounts !== 'object') loaded.achievementCounts = {};
    if (!loaded.completedByBoss || typeof loaded.completedByBoss !== 'object') loaded.completedByBoss = {};
    const legacyBossIds = ['grime-goblin', 'dust-dragon', 'laundry-lich'];
    for (const [oldIndex, id] of legacyBossIds.entries()) {
      const oldTasks = loaded.completedByBoss[String(oldIndex)];
      if (Array.isArray(oldTasks)) loaded.completedByBoss[id] = [...new Set([...(loaded.completedByBoss[id] || []), ...oldTasks])];
      delete loaded.completedByBoss[String(oldIndex)];
    }
    return loaded;
  } catch { return freshSave(); }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); }
function isValidRunOrder(order) { return Array.isArray(order) && order.length === BOSS_LIST.length && new Set(order).size === BOSS_LIST.length && order.every((id) => BOSS_LIST.some((boss) => boss.id === id)); }
function shuffledBossOrder() {
  const order = BOSS_LIST.map((boss) => boss.id);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const lastBossOfPreviousRun = (save.previousRunOrder || []).at(-1);
  if (order[0] === lastBossOfPreviousRun) [order[0], order[1]] = [order[1], order[0]];
  if (order.join('|') === (save.previousRunOrder || []).join('|')) [order[1], order[2]] = [order[2], order[1]];
  return order;
}
function beginNewRun() {
  save.previousRunOrder = save.runOrder || [];
  save.runOrder = shuffledBossOrder();
  save.enragedBossId = save.runOrder[Math.floor(Math.random() * save.runOrder.length)];
  save.runDefeats = 0;
  save.runMisses = 0;
  save.runAchievements = [];
  persist();
}
function currentBoss() { return BOSS_LIST.find((boss) => boss.id === save.runOrder[save.runDefeats]) || BOSS_LIST.find((boss) => boss.id === save.runOrder[BOSS_LIST.length - 1]) || BOSS_LIST[0]; }
function isEnraged(boss) { return save.enragedBossId === boss.id; }
function maxBossHp(boss) { return boss.hp + (isEnraged(boss) ? ENRAGED_HP_BONUS : 0); }
function bossXpReward(boss) { return boss.xpReward + (isEnraged(boss) ? ENRAGED_XP_BONUS : 0); }
function setStageTheme() { $('.app-shell').dataset.stage = String(Math.min(BOSS_LIST.length, save.runDefeats + 1)); }
function rewardForLevel(level) { return LEVEL_REWARDS[level - 1] || `Choose a personal treat for level ${level}`; }
function uniqueChoreCount() { return Object.values(save.completedByBoss || {}).reduce((total, chores) => total + new Set(chores || []).size, 0); }
function allAchievementRows() {
  return [
    ...ACHIEVEMENTS.map((item) => ({ ...item, repeatable: false })),
    ...BOSS_LIST.map((boss) => ({ id: `flawless-${boss.id}`, name: `Flawless: ${boss.name}`, detail: `Defeat ${boss.name} without taking damage.`, xp: 25, repeatable: false })),
    ...RUN_ACHIEVEMENTS.map((item) => ({ ...item, repeatable: true })),
  ];
}
function setScreen(screen) {
  currentScreen = screen;
  welcomeScreen.classList.toggle('hidden', screen !== 'welcome');
  homeScreen.classList.toggle('hidden', screen !== 'home');
  battleScreen.classList.toggle('hidden', screen !== 'battle');
  achievementsScreen.classList.toggle('hidden', screen !== 'achievements');
  rewardsScreen.classList.toggle('hidden', screen !== 'rewards');
}
function renderHome() {
  const boss = currentBoss();
  const runComplete = save.runDefeats >= BOSS_LIST.length;
  const enraged = isEnraged(boss) && !runComplete;
  setStageTheme();
  $('#level').textContent = save.level;
  $('#header-xp').textContent = save.xp;
  $('#hero-name-label').textContent = save.heroName || 'HERO';
  const xpIntoLevel = Math.max(0, save.xp - save.levelStartXp);
  $('#level-progress-label').textContent = `${xpIntoLevel} / ${XP_PER_LEVEL} XP to level ${save.level + 1}`;
  $('#level-progress-fill').style.width = `${Math.min(100, xpIntoLevel / XP_PER_LEVEL * 100)}%`;
  $('#streak').textContent = save.totalBossesDefeated;
  const achievementRows = allAchievementRows();
  const unlockedCount = achievementRows.filter((item) => (item.repeatable ? save.achievementCounts[item.id] > 0 : save.achievements.includes(item.id))).length;
  $('#achievement-count').textContent = `${unlockedCount}/${achievementRows.length}`;
  $('#achievement-summary-text').textContent = `${unlockedCount} / ${achievementRows.length} unlocked`;
  $('#achievement-overview-fill').style.width = `${Math.round(unlockedCount / achievementRows.length * 100)}%`;
  const nextLevel = save.level + 1;
  const currentReward = rewardForLevel(save.level);
  const nextReward = rewardForLevel(nextLevel);
  $('#current-reward').textContent = currentReward;
  $('#reward-status').textContent = `LEVEL ${save.level} UNLOCKED`;
  $('#reward-status').classList.toggle('unlocked', true);
  $('#reward-progress-label').textContent = `${xpIntoLevel} / ${XP_PER_LEVEL} XP to level ${nextLevel}`;
  $('#reward-progress-fill').style.width = `${Math.min(100, xpIntoLevel / XP_PER_LEVEL * 100)}%`;
  $('#next-reward').textContent = nextReward;
  $('#menu-boss-tag').textContent = runComplete ? 'ROGUE RUN COMPLETE' : `BOSS ${String(save.runDefeats + 1).padStart(2, '0')} / ${BOSS_LIST.length} · ${boss.area}`;
  $('#menu-boss-name').textContent = runComplete ? 'All bosses defeated!' : boss.name;
  $('#menu-boss-description').textContent = runComplete ? 'Start again to face the bosses in a new random order.' : boss.description;
  $('#menu-boss-hp').textContent = runComplete ? '✦ Run cleared' : `❤ ${maxBossHp(boss)} HP${enraged ? ' · ENRAGED' : ''}`;
  $('#menu-boss-xp').textContent = runComplete ? `${save.runsCompleted} runs cleared` : `✦ +${bossXpReward(boss)} XP`;
  $('#menu-enrage-badge').classList.toggle('hidden', !enraged);
  $('#menu-enrage-icon').textContent = enraged ? boss.enrageIcon : '';
  $('.goblin').textContent = boss.emoji;
  $('#start-button').textContent = runComplete ? 'START NEW RUN  ▶' : 'START BATTLE  ▶';
}
function renderBattleFrame() {
  const boss = currentBoss();
  const maxHp = maxBossHp(boss);
  const enraged = isEnraged(boss);
  setStageTheme();
  $('#battle-tag').textContent = `BOSS ${String(save.runDefeats + 1).padStart(2, '0')} / ${BOSS_LIST.length} · ROUND ${round + 1}`;
  $('#battle-boss-name').textContent = boss.name;
  $('#arena-boss-name').textContent = boss.name.toUpperCase();
  $('#battle-boss-avatar').innerHTML = `${boss.emoji}<span class="boss-enrage-icon ${enraged ? '' : 'hidden'}">${enraged ? boss.enrageIcon : ''}</span>`;
  $('#enrage-banner').classList.toggle('hidden', !enraged);
  $('#enrage-banner-icon').textContent = enraged ? boss.enrageIcon : '';
  $('#enrage-banner-text').textContent = enraged ? `ENRAGED BOSS · +${ENRAGED_HP_BONUS} HP · +${ENRAGED_XP_BONUS} XP` : '';
  $('#battle-level').textContent = save.level;
  $('#battle-hero-name').textContent = (save.heroName || 'HERO').toUpperCase();
  $('#player-hp').textContent = playerHp;
  $('#boss-hp').textContent = bossHp;
  $('#boss-max-hp').textContent = maxHp;
  $('#player-health').style.width = `${Math.max(0, playerHp)}%`;
  $('#boss-health').style.width = `${Math.max(0, bossHp / maxHp * 100)}%`;
  $('#battle-xp').textContent = save.xp;
  $('#round-number').textContent = round + 1;
}
function shuffledChores() {
  const bossKey = currentBoss().id;
  const completed = save.completedByBoss[bossKey] || [];
  const remaining = currentBoss().chores.filter((chore) => !completed.includes(chore[0]));
  const chores = remaining.length ? [...remaining] : [...currentBoss().chores];
  for (let i = chores.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chores[i], chores[j]] = [chores[j], chores[i]];
  }
  const signature = chores.map((chore) => chore[0]).join('|');
  if (signature === lastChoreOrder.get(bossKey)) chores.push(chores.shift());
  lastChoreOrder.set(bossKey, chores.map((chore) => chore[0]).join('|'));
  return chores;
}
function startBattle() {
  if (save.runDefeats >= BOSS_LIST.length) {
    beginNewRun();
    renderHome();
  }
  stopTimer();
  bossHp = maxBossHp(currentBoss());
  playerHp = PLAYER_MAX_HP;
  round = 0;
  battleChores = shuffledChores();
  $('#result-panel').classList.add('hidden');
  $('#quest-card').classList.remove('hidden');
  $('#complete-button').disabled = false;
  $('#skip-button').disabled = false;
  setScreen('battle');
  showNextChore();
}
function showNextChore() {
  if (bossHp <= 0) return winBattle();
  if (playerHp <= 0) return loseBattle();
  if (round >= battleChores.length) battleChores = shuffledChores();
  const chore = battleChores[round % battleChores.length];
  $('#quest-card').classList.remove('hidden');
  $('#chore-name').textContent = chore[0];
  $('#chore-description').textContent = chore[1];
  $('#chore-category').textContent = chore[2];
  $('#chore-damage').textContent = 'BOSS DAMAGE · 25';
  $('#quest-card').classList.remove('danger');
  $('#complete-button').disabled = false;
  $('#skip-button').disabled = false;
  renderBattleFrame();
  startTimer();
}
function addXp(amount) {
  save.xp += amount;
  while (save.xp - save.levelStartXp >= XP_PER_LEVEL) {
    save.level += 1;
    save.levelStartXp += XP_PER_LEVEL;
    const level = save.level;
    if (!save.pendingRewardLevels.includes(level)) save.pendingRewardLevels.push(level);
  }
}
function awardAchievement(achievement, repeatable = false) {
  const list = repeatable ? save.runAchievements : save.achievements;
  if (list.includes(achievement.id)) return null;
  list.push(achievement.id);
  if (repeatable) save.achievementCounts[achievement.id] = (save.achievementCounts[achievement.id] || 0) + 1;
  addXp(achievement.xp);
  return achievement;
}
function flashAchievements(unlocked) {
  if (!unlocked.length) return;
  const toast = $('#achievement-toast');
  toast.innerHTML = `🏅 ${unlocked.map((item) => `${escapeHtml(item.name)} +${item.xp} XP`).join(' · ')}`;
  toast.classList.remove('hidden');
  window.setTimeout(() => toast.classList.add('hidden'), 3500);
}
function startTimer() {
  stopTimer();
  secondsLeft = ROUND_SECONDS;
  renderTimer();
  timerId = window.setInterval(() => {
    secondsLeft -= 1;
    renderTimer();
    if (secondsLeft <= 5) $('#quest-card').classList.add('danger');
    if (secondsLeft <= 0) takeHit('Time ran out! The boss attacks.');
  }, 1000);
}
function stopTimer() { if (timerId !== null) window.clearInterval(timerId); timerId = null; }
function renderTimer() {
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  $('#timer').textContent = `${mm}:${ss}`;
  $('#timer-fill').style.width = `${Math.max(0, secondsLeft / ROUND_SECONDS * 100)}%`;
}
function completeChore() {
  if (timerId === null) return;
  stopTimer();
  bossHp = Math.max(0, bossHp - 25);
  const bossKey = currentBoss().id;
  const completed = save.completedByBoss[bossKey] || [];
  const choreName = $('#chore-name').textContent;
  if (!completed.includes(choreName)) completed.push(choreName);
  save.completedByBoss[bossKey] = completed;
  save.choresCompleted += 1;
  round += 1;
  const unlocked = checkAchievements();
  persist();
  flashAchievements(unlocked);
  renderBattleFrame();
  if (bossHp <= 0) winBattle();
  else showNextChore();
}
function takeHit(message) {
  if (timerId === null) return;
  stopTimer();
  save.runMisses += 1;
  playerHp = Math.max(0, playerHp - DAMAGE_ON_MISS);
  round += 1;
  $('#complete-button').disabled = true;
  $('#skip-button').disabled = true;
  renderBattleFrame();
  if (playerHp <= 0) loseBattle(message);
  else {
    showResult(`<strong>${message}</strong><p>You lost ${DAMAGE_ON_MISS} HP. Get ready for the next chore.</p><button id="continue-button" class="primary-button">NEXT CHORE <span>▶</span></button>`, 'bad');
    $('#continue-button').addEventListener('click', () => { $('#result-panel').classList.add('hidden'); showNextChore(); });
  }
}
function showResult(markup, type = '') {
  const panel = $('#result-panel');
  panel.className = `result-panel ${type}`;
  panel.innerHTML = markup;
  panel.classList.remove('hidden');
  $('#quest-card').classList.add('hidden');
}
function winBattle() {
  stopTimer();
  const defeatedBoss = currentBoss();
  $('#quest-card').classList.add('hidden');
  $('#result-panel').classList.remove('hidden');
  const newlyEarned = bossXpReward(defeatedBoss);
  addXp(newlyEarned);
  save.totalBossesDefeated += 1;
  save.runDefeats += 1;
  const earnedAchievements = [];
  if (playerHp === PLAYER_MAX_HP) {
    const flawless = { id: `flawless-${defeatedBoss.id}`, name: `Flawless: ${defeatedBoss.name}`, detail: 'Win this boss battle without taking damage.', xp: 25 };
    const earned = awardAchievement(flawless);
    if (earned) earnedAchievements.push(earned);
  }
  earnedAchievements.push(...checkAchievements());
  const runComplete = save.runDefeats >= BOSS_LIST.length;
  if (runComplete) {
    save.runsCompleted += 1;
    const fullRun = awardAchievement(RUN_ACHIEVEMENTS[0], true);
    if (fullRun) earnedAchievements.push(fullRun);
    if (save.runMisses === 0) {
      const cleanRun = awardAchievement(RUN_ACHIEVEMENTS[1], true);
      if (cleanRun) earnedAchievements.push(cleanRun);
    }
  }
  const levelMessage = save.pendingRewardLevels.length ? `LEVEL UP! You reached level ${save.level}.` : `Your level is ${save.level}.`;
  persist();
  const nextBoss = runComplete ? '<p>You cleared all five bosses! Start a new run to get a different random boss order.</p>' : `<p>Next up: <b>${currentBoss().name}</b>.</p>`;
  const unlockedRewards = [...save.pendingRewardLevels];
  save.pendingRewardLevels = [];
  persist();
  const reward = unlockedRewards.length ? `<div class="reward-unlocked">🎁 REWARD UNLOCKED${unlockedRewards.length > 1 ? 'S' : ''}<b>${unlockedRewards.map((level) => `Level ${level}: ${escapeHtml(rewardForLevel(level))}`).join('<br>')}</b><small>These are personal treats for you to enjoy.</small></div>` : '';
  const achievementSummary = earnedAchievements.length ? `<div class="reward-unlocked">🏅 ACHIEVEMENTS · +${earnedAchievements.reduce((sum, item) => sum + item.xp, 0)} XP<b>${earnedAchievements.map((item) => escapeHtml(item.name)).join('<br>')}</b></div>` : '';
  showResult(`<div class="result-icon">🏆</div><div class="eyebrow">BOSS DEFEATED</div><h2>${defeatedBoss.name} beaten!</h2><p class="result-xp">+${newlyEarned} boss XP · ${levelMessage}</p>${achievementSummary}${reward}${nextBoss}<button id="victory-menu" class="primary-button">BACK TO MENU <span>⌂</span></button>`, 'good');
  $('#victory-menu').addEventListener('click', () => {
    renderHome();
    setScreen('home');
  });
  renderHome();
}
function loseBattle(message = 'Your HP hit zero!') {
  stopTimer();
  playerHp = 0;
  renderBattleFrame();
  $('#quest-card').classList.add('hidden');
  showResult(`<div class="result-icon">💫</div><div class="eyebrow">BATTLE LOST</div><h2>Your hero needs a break.</h2><p>${message} The boss is still waiting. Try again with a fresh set of chores.</p><button id="retry-button" class="primary-button">RETRY BATTLE <span>↻</span></button>`, 'bad');
  $('#retry-button').addEventListener('click', startBattle);
}
function checkAchievements() {
  const unlocked = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!save.achievements.includes(achievement.id) && achievement.test(save)) {
      const earned = awardAchievement(achievement);
      if (earned) unlocked.push(earned);
    }
  }
  return unlocked;
}
function renderAchievements() {
  $('#achievement-list').innerHTML = allAchievementRows().map((achievement) => {
    const earned = achievement.repeatable ? save.achievementCounts[achievement.id] > 0 : save.achievements.includes(achievement.id);
    const state = achievement.repeatable
      ? (save.runAchievements.includes(achievement.id) ? `THIS RUN · ${save.achievementCounts[achievement.id]}×` : save.achievementCounts[achievement.id] ? `${save.achievementCounts[achievement.id]}× CLEARED` : 'LOCKED')
      : (earned ? 'EARNED' : 'LOCKED');
    const progress = achievementProgress(achievement, earned);
    return `<article class="achievement ${earned ? 'earned' : ''}"><span class="achievement-icon">${earned ? '★' : '☆'}</span><div><strong>${escapeHtml(achievement.name)}</strong><p>${escapeHtml(achievement.detail)} · <b>+${achievement.xp} XP</b></p><div class="achievement-progress-label"><span>${escapeHtml(progress.label)}</span><b>${progress.current}/${progress.target}</b></div><div class="achievement-progress-track"><span style="width:${progress.percent}%"></span></div></div><span class="achievement-state">${state}</span></article>`;
  }).join('');
}
function achievementProgress(achievement, earned) {
  let current = 0;
  let target = 1;
  let label = '1 achievement needed';
  if (achievement.id === 'first-win') {
    target = achievement.target || 1;
    current = Math.min(target, save.totalBossesDefeated);
    label = `Defeat ${target} bosses`;
  } else if (achievement.id.startsWith('chores-')) {
    target = achievement.target || Number(achievement.id.split('-')[1]);
    current = Math.min(target, uniqueChoreCount());
    label = `${current} unique chores · ${Math.max(0, target - current)} to go`;
  } else if (achievement.id.startsWith('flawless-')) {
    label = 'Win that boss with full health';
    current = earned ? 1 : 0;
  } else if (achievement.id === 'full-run') {
    target = BOSS_LIST.length;
    current = Math.min(target, save.runDefeats);
    label = `${Math.max(0, target - current)} bosses left this run`;
  } else if (achievement.id === 'clean-run') {
    target = BOSS_LIST.length;
    current = save.runMisses === 0 ? Math.min(target, save.runDefeats) : 0;
    label = save.runMisses === 0 ? `${Math.max(0, target - current)} clean bosses left` : 'A fresh run is needed after a miss';
  }
  if (earned && !achievement.repeatable) current = target;
  return { current, target, label, percent: Math.min(100, Math.round(current / target * 100)) };
}
function renderRewardPath() {
  $('#reward-list').innerHTML = LEVEL_REWARDS.map((reward, index) => {
    const level = index + 1;
    const unlocked = save.level >= level;
    return `<article class="reward-row ${unlocked ? 'earned' : ''}"><span class="reward-level">LV ${level}</span><div><strong>${escapeHtml(reward)}</strong><p>${unlocked ? 'Unlocked' : `Unlock at level ${level}`}</p></div><span class="reward-state">${unlocked ? '★' : '🔒'}</span></article>`;
  }).join('') + `<p class="reward-disclaimer">After level 10, each new level lets you choose another personal treat. Rewards are suggestions; you decide whether and how to enjoy them.</p>`;
}
function renderWelcome() {
  const hasHero = Boolean(save.heroName && save.heroName.trim());
  $('#hero-name-form').classList.toggle('hidden', hasHero);
  $('#welcome-continue').classList.toggle('hidden', !hasHero);
  $('#welcome-message').textContent = hasHero
    ? `Welcome back, ${save.heroName}! Your next home quest is waiting.`
    : 'Every hero starts somewhere. What should we call you?';
  $('#hero-name-label').textContent = hasHero ? save.heroName : 'HERO';
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }

$('#hero-name-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const heroName = $('#hero-name-input').value.trim().replace(/\s+/g, ' ').slice(0, 18);
  if (!heroName) return;
  save.heroName = heroName;
  persist();
  renderHome();
  setScreen('home');
});
$('#welcome-continue').addEventListener('click', () => { renderHome(); setScreen('home'); });
$('#start-button').addEventListener('click', startBattle);
$('#back-button').addEventListener('click', () => { stopTimer(); renderHome(); setScreen('home'); });
$('#complete-button').addEventListener('click', completeChore);
$('#skip-button').addEventListener('click', () => takeHit('You skipped the chore! The boss attacks.'));
$('#achievements-button').addEventListener('click', () => { renderAchievements(); setScreen('achievements'); });
$('#achievements-back').addEventListener('click', () => { renderHome(); setScreen('home'); });
$('#rewards-button').addEventListener('click', () => { renderRewardPath(); setScreen('rewards'); });
$('#rewards-back').addEventListener('click', () => { renderHome(); setScreen('home'); });
checkAchievements();
persist();
renderHome();
renderWelcome();
setScreen('welcome');
