(function () {
  const STORAGE_KEY = 'calstacker_quest_progress';
  const KPI_KEY = 'calstacker_revenue_kpis';
  const DS_KEY = 'calstacker_deepseek_key';
  const GOAL_INR = 70000;

  let questsData = null;
  let gitProgress = null;
  let activePhase = 'blockers';

  function loadLocalProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function saveLocalProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function isCompleted(questId) {
    const local = loadLocalProgress();
    if (local.completed && local.completed.includes(questId)) return true;
    if (gitProgress && gitProgress.completedQuests && gitProgress.completedQuests.includes(questId)) return true;
    return false;
  }

  function toggleQuest(questId) {
    const local = loadLocalProgress();
    local.completed = local.completed || [];
    const idx = local.completed.indexOf(questId);
    if (idx >= 0) local.completed.splice(idx, 1);
    else local.completed.push(questId);
    local.lastUpdated = new Date().toISOString();
    saveLocalProgress(local);
    render();
  }

  function getCompletedIds() {
    const local = loadLocalProgress();
    const git = (gitProgress && gitProgress.completedQuests) || [];
    const merged = new Set([...git, ...(local.completed || [])]);
    return merged;
  }

  function calcStats() {
    const completed = getCompletedIds();
    const quests = questsData.quests;
    let totalXP = 0;
    quests.forEach(q => {
      if (completed.has(q.id)) totalXP += q.xp;
    });
    const level = Math.floor(totalXP / 100) + 1;
    const xpInLevel = totalXP % 100;
    const done = completed.size;
    const total = quests.length;
    const kpis = JSON.parse(localStorage.getItem(KPI_KEY) || '{}');
    const totalRev = (kpis.adsenseINR || 0) + (kpis.affiliateINR || 0);
    const goalPct = Math.min(100, Math.round((totalRev / GOAL_INR) * 100));
    return { totalXP, level, xpInLevel, done, total, goalPct };
  }

  function renderBlockers() {
    const list = document.getElementById('blockerList');
    const blockers = questsData.quests.filter(q => q.priority === 'blocker');
    const completed = getCompletedIds();
    list.innerHTML = blockers.map(q => {
      const done = completed.has(q.id);
      return `<span class="blocker-chip${done ? ' done' : ''}" data-id="${q.id}">${q.title}</span>`;
    }).join('');
    list.querySelectorAll('.blocker-chip').forEach(el => {
      el.addEventListener('click', () => toggleQuest(el.dataset.id));
    });
  }

  function renderPhaseTabs() {
    const tabs = document.getElementById('phaseTabs');
    tabs.innerHTML = questsData.phases.map(p =>
      `<button type="button" class="phase-tab${p.id === activePhase ? ' active' : ''}" data-phase="${p.id}">${p.name}</button>`
    ).join('');
    tabs.querySelectorAll('.phase-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activePhase = btn.dataset.phase;
        renderPhaseTabs();
        renderQuestList();
      });
    });
  }

  function renderQuestList() {
    const list = document.getElementById('questList');
    const completed = getCompletedIds();
    const filtered = questsData.quests.filter(q => q.phase === activePhase);
    list.innerHTML = filtered.map(q => {
      const done = completed.has(q.id);
      return `<div class="quest-item${done ? ' completed' : ''}${q.priority === 'blocker' ? ' blocker' : ''}" data-id="${q.id}">
        <div class="quest-check" role="button" tabindex="0" aria-label="Toggle quest">${done ? '✓' : ''}</div>
        <div class="quest-body">
          <div class="quest-title">${q.title}</div>
          <div class="quest-desc">${q.description}</div>
          <div class="quest-meta">
            <span class="quest-tag ${q.type === 'code' ? 'tag-code' : 'tag-manual'}">${q.type}</span>
            <span class="quest-tag tag-xp">+${q.xp} XP</span>
          </div>
        </div>
      </div>`;
    }).join('');
    list.querySelectorAll('.quest-check').forEach(el => {
      el.addEventListener('click', () => toggleQuest(el.closest('.quest-item').dataset.id));
    });
  }

  function renderStats() {
    const s = calcStats();
    document.getElementById('playerLevel').textContent = s.level;
    document.getElementById('totalXP').textContent = s.totalXP;
    document.getElementById('questDone').textContent = s.done + '/' + s.total;
    document.getElementById('goalProgress').textContent = s.goalPct + '%';
    document.getElementById('xpLabel').textContent = s.xpInLevel + ' / 100';
    document.getElementById('xpBarFill').style.width = s.xpInLevel + '%';
  }

  function render() {
    renderBlockers();
    renderPhaseTabs();
    renderQuestList();
    renderStats();
  }

  function loadKPIs() {
    const kpis = JSON.parse(localStorage.getItem(KPI_KEY) || '{}');
    document.getElementById('kpiVisitors').value = kpis.monthlyVisitors || '';
    document.getElementById('kpiAdsense').value = kpis.adsenseINR || '';
    document.getElementById('kpiAffiliate').value = kpis.affiliateINR || '';
    document.getElementById('kpiNotes').value = kpis.notes || '';
  }

  function saveKPIs() {
    const kpis = {
      monthlyVisitors: parseInt(document.getElementById('kpiVisitors').value, 10) || 0,
      adsenseINR: parseInt(document.getElementById('kpiAdsense').value, 10) || 0,
      affiliateINR: parseInt(document.getElementById('kpiAffiliate').value, 10) || 0,
      totalINR: 0,
      notes: document.getElementById('kpiNotes').value,
      lastUpdated: new Date().toISOString()
    };
    kpis.totalINR = kpis.adsenseINR + kpis.affiliateINR;
    localStorage.setItem(KPI_KEY, JSON.stringify(kpis));
    renderStats();
    alert('KPIs saved locally.');
  }

  function buildSnapshot() {
    const completed = Array.from(getCompletedIds());
    const pending = questsData.quests.filter(q => !completed.includes(q.id));
    const kpis = JSON.parse(localStorage.getItem(KPI_KEY) || '{}');
    return {
      project: 'CalStacker.com',
      goal: '70000 INR/month by Month 6',
      exportedAt: new Date().toISOString(),
      completedQuests: completed,
      pendingQuests: pending.map(q => ({ id: q.id, title: q.title, type: q.type, phase: q.phase })),
      blockers: pending.filter(q => q.priority === 'blocker').map(q => q.title),
      revenueKPIs: kpis,
      stats: calcStats(),
      instructions: 'Read docs/CHAT_HANDOFF.md, data/quests.json, data/progress.json. Continue next pending code quests in Agent mode.'
    };
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch {
      prompt('Copy this:', text);
    }
  }

  async function analyzeWithDeepSeek() {
    const key = localStorage.getItem(DS_KEY);
    if (!key) {
      alert('Save your DeepSeek API key first.');
      return;
    }
    const box = document.getElementById('aiResponse');
    box.classList.add('visible');
    box.textContent = 'Analyzing progress...';

    const snapshot = buildSnapshot();
    const prompt = `You are CalStacker revenue strategist. Goal: ₹70,000/month in 6 months from a India finance calculator site (calstacker.com). 
Completed quests: ${snapshot.completedQuests.length}. Pending: ${snapshot.pendingQuests.length}.
Blockers: ${snapshot.blockers.join('; ') || 'none'}.
Revenue KPIs: ${JSON.stringify(snapshot.revenueKPIs)}.
Give 5 specific next actions prioritized for maximum revenue impact. Be concise and actionable.`;

    try {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a concise India finance SEO and monetization expert.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 800
        })
      });
      const data = await res.json();
      if (data.error) {
        box.textContent = 'Error: ' + (data.error.message || JSON.stringify(data.error));
        return;
      }
      box.textContent = data.choices[0].message.content;
    } catch (e) {
      box.textContent = 'Request failed: ' + e.message + '\n\nFallback: Complete blocker quests first (affiliates, GSC, AdSense). Then scale guide pages and tax content before Apr.';
    }
  }

  async function init() {
    try {
      const [qRes, pRes] = await Promise.all([
        fetch('/data/quests.json'),
        fetch('/data/progress.json')
      ]);
      questsData = await qRes.json();
      gitProgress = await pRes.json();
    } catch (e) {
      alert('Could not load quest data. Serve site from root.');
      return;
    }

    loadKPIs();
    const dsKey = localStorage.getItem(DS_KEY);
    if (dsKey) document.getElementById('deepseekKey').value = dsKey;

    document.getElementById('saveKPI').addEventListener('click', saveKPIs);
    document.getElementById('saveDeepseekKey').addEventListener('click', () => {
      const v = document.getElementById('deepseekKey').value.trim();
      if (v) localStorage.setItem(DS_KEY, v);
      alert('DeepSeek key saved locally.');
    });
    document.getElementById('analyzeBtn').addEventListener('click', analyzeWithDeepSeek);
    document.getElementById('exportCursor').addEventListener('click', () => {
      copyToClipboard(JSON.stringify(buildSnapshot(), null, 2));
    });
    document.getElementById('exportProgress').addEventListener('click', () => {
      const local = loadLocalProgress();
      const merged = {
        lastUpdated: new Date().toISOString(),
        completedQuests: Array.from(getCompletedIds()),
        localOnly: local.completed || [],
        revenueKPIs: JSON.parse(localStorage.getItem(KPI_KEY) || '{}')
      };
      copyToClipboard(JSON.stringify(merged, null, 2));
    });

    render();
  }

  init();
})();
