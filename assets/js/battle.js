/* ============================================================
   battle.js — 单机网络攻防推演

   两种模式：
   · defense 蓝队：有限预算加固，回合结束触发攻击
   · attack  红队：有限行动点，选择攻击类型与目标，蓝队会自动加固

   代码演练用 assets/js/sandbox.js 的 iframe 沙箱执行，
   全部场景为虚构教学数据，不含真实攻击工具或目标。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var SCENARIOS = window.LHT_BATTLE_SCENARIOS || [];

  var DEFENSE_ACTIONS = [
    { id: 'patch',   cost: 12, max: 3, key: 'battle.patch',   desc: 'battle.patchDesc' },
    { id: 'segment', cost: 15, max: 2, key: 'battle.segment', desc: 'battle.segmentDesc' },
    { id: 'monitor', cost: 8,  max: 2, key: 'battle.monitor', desc: 'battle.monitorDesc' },
    { id: 'backup',  cost: 10, key: 'battle.backup',  desc: 'battle.backupDesc' },
    { id: 'isolate', cost: 5,  key: 'battle.isolate', desc: 'battle.isolateDesc' },
    { id: 'restore', cost: 10, key: 'battle.restore', desc: 'battle.restoreDesc' }
  ];

  var ATTACKS = [
    { id: 'scout',      cost: 1, key: 'battle.scout',      desc: 'battle.scoutDesc',      scout: true },
    { id: 'phishing',   cost: 1, power: 18, key: 'battle.typePhishing',   desc: 'battle.atkPhishingDesc' },
    { id: 'exploit',    cost: 2, power: 30, key: 'battle.typeExploit',    desc: 'battle.atkExploitDesc' },
    { id: 'ddos',       cost: 1, power: 22, key: 'battle.typeDdos',       desc: 'battle.atkDdosDesc' },
    { id: 'ransomware', cost: 3, power: 46, key: 'battle.typeRansomware', desc: 'battle.atkRansomwareDesc' },
    { id: 'insider',    cost: 2, power: 22, key: 'battle.typeInsider',    desc: 'battle.atkInsiderDesc' }
  ];

  var CODE = {
    defense: {
      fn: 'detect',
      arg: [
        { ip: '10.0.0.5', path: '/login', attempts: 3 },
        { ip: '10.0.0.9', path: '/admin', attempts: 14 },
        { ip: '10.0.0.7', path: '/../../etc/passwd', attempts: 1 },
        { ip: '10.0.0.2', path: '/index', attempts: 2 }
      ],
      expected: [1, 2],
      template: [
        'function detect(logs) {',
        '  // return indexes of suspicious logs',
        '  return logs',
        '    .map((log, i) => ({ log, i }))',
        "    .filter(x => x.log.attempts >= 10 || x.log.path.includes('../'))",
        '    .map(x => x.i);',
        '}'
      ].join('\n')
    },
    attack: {
      fn: 'pickTarget',
      arg: [
        { id: 'web', exposure: 5, critical: true, health: 100 },
        { id: 'db', exposure: 4, critical: true, health: 100 },
        { id: 'ws', exposure: 6, critical: false, health: 100 }
      ],
      expected: 'web',
      template: [
        'function pickTarget(nodes) {',
        '  // return the id of the most exposed critical node',
        '  const alive = nodes.filter(n => n.critical && n.health > 0);',
        '  alive.sort((a, b) => b.exposure - a.exposure);',
        '  return alive.length ? alive[0].id : null;',
        '}'
      ].join('\n')
    }
  };

  var currentMode = 'defense';
  var pickLevel = 'all';
  var state = null;
  var els = {};

  function t(key) { return LHT.t(key); }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function makeSeed() {
    return (Date.now().toString(36) + Math.random().toString(36).slice(2, 6))
      .toUpperCase().slice(-8);
  }

  function hashSeed(text) {
    var hash = 2166136261;
    for (var i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function makeRng(seed) {
    var value = hashSeed(String(seed));
    return function () {
      value |= 0;
      value = value + 0x6D2B79F5 | 0;
      var t = Math.imul(value ^ value >>> 15, 1 | value);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function validEventOrder(list) {
    for (var i = 2; i < list.length; i++) {
      if (list[i].target === list[i - 1].target && list[i].target === list[i - 2].target) return false;
      if (list[i].type === list[i - 1].type && list[i].type === list[i - 2].type) return false;
    }
    return true;
  }

  function orderEvents(events, rng) {
    if (!events || events.length < 4) return (events || []).slice();
    var first = events[0];
    var last = events[events.length - 1];
    var middle = events.slice(1, -1);
    var chosen = null;

    for (var attempt = 0; attempt < 80; attempt++) {
      var working = middle.slice();
      for (var i = working.length - 1; i > 0; i--) {
        var j = Math.floor(rng() * (i + 1));
        var tmp = working[i];
        working[i] = working[j];
        working[j] = tmp;
      }
      if (validEventOrder([first].concat(working, [last]))) {
        chosen = working;
        break;
      }
    }

    return [first].concat(chosen || middle, [last]);
  }

  function scenarioById(id) {
    for (var i = 0; i < SCENARIOS.length; i++) {
      if (SCENARIOS[i].id === id) return SCENARIOS[i];
    }
    return null;
  }

  function nodeById(id) {
    if (!state) return null;
    for (var i = 0; i < state.nodes.length; i++) {
      if (state.nodes[i].id === id) return state.nodes[i];
    }
    return null;
  }

  function nodeName(id) {
    var node = nodeById(id);
    return node ? LHT.pickText(node.label) : id;
  }

  function selectedNode() { return nodeById(state.selected); }

  function monitorTotal() {
    return state.nodes.reduce(function (sum, node) { return sum + node.monitor; }, 0);
  }

  function averageHealth() {
    return state.nodes.reduce(function (sum, node) { return sum + node.health; }, 0) / state.nodes.length;
  }

  function currentEvent() {
    if (!state) return null;
    return state.events[state.round] || null;
  }

  function typeKey(type) {
    return 'battle.type' + type.charAt(0).toUpperCase() + type.slice(1);
  }

  function defenseScore() {
    var avg = averageHealth();
    var budgetRatio = state.budget / state.scenario.budget * 100;
    var detection = Math.min(100, monitorTotal() * 20);
    var penalty = state.isolationCount * 4;
    return clamp(Math.round(
      avg * 0.5 +
      state.data * 0.25 +
      budgetRatio * 0.15 +
      detection * 0.1 -
      penalty
    ), 0, 100);
  }

  function attackTotals() {
    var critical = state.scenario.nodes.filter(function (node) { return node.critical; });
    var totalData = critical.reduce(function (sum, node) { return sum + node.data; }, 0);
    var down = state.nodes.filter(function (node) { return node.critical && node.health <= 0; }).length;
    var health = state.nodes.filter(function (node) { return node.critical; })
      .reduce(function (sum, node) { return sum + node.health; }, 0);
    var damagePct = critical.length ? 100 - health / critical.length : 0;
    return { critical: critical.length, totalData: totalData, down: down, damagePct: damagePct };
  }

  function attackScore() {
    var totals = attackTotals();
    var stolenPct = totals.totalData ? state.stolen / totals.totalData * 100 : 0;
    var downPct = totals.critical ? totals.down / totals.critical * 100 : 0;
    var maxAp = state.scenario.ap + (state.codeBonus ? 1 : 0);
    var apPct = maxAp ? state.ap / maxAp * 100 : 0;
    return clamp(Math.round(
      stolenPct * 0.4 +
      downPct * 0.25 +
      totals.damagePct * 0.2 +
      apPct * 0.15
    ), 0, 100);
  }

  function currentScore() {
    return state.mode === 'attack' ? attackScore() : defenseScore();
  }

  function ratingForDefense(score) {
    if (score >= 85) return 'S';
    if (score >= 70) return 'A';
    if (score >= 50) return 'B';
    return 'C';
  }

  function ratingForAttack(score) {
    if (score >= 80) return 'S';
    if (score >= 60) return 'A';
    if (score >= 40) return 'B';
    return 'C';
  }

  function pushLog(kind, key, params, round) {
    state.log.push({
      kind: kind,
      key: key,
      params: params || {},
      round: round || ((state.mode === 'attack' ? state.turn : state.round) + 1)
    });
  }

  function formatLog(item) {
    var text = t(item.key);
    Object.keys(item.params || {}).forEach(function (key) {
      var value = item.params[key];
      if (key === 'node') value = nodeName(value);
      else if (key === 'scenario') {
        var scenario = scenarioById(value);
        value = scenario ? LHT.pickText(scenario.name) : value;
      } else if (typeof value === 'string' && value.indexOf('battle.') === 0) {
        value = t(value);
      }
      text = text.replace(new RegExp('\\{' + key + '\\}', 'g'), value);
    });
    return text;
  }

  function logHtml(items) {
    return items.map(function (item) {
      return '<div class="log-item log-' + item.kind + '">' +
        '<span class="log-round">R' + item.round + '</span>' +
        '<span>' + LHT.esc(formatLog(item)) + '</span>' +
      '</div>';
    }).join('');
  }

  /* ---------- 场景选择 ---------- */

  function renderLevelChips() {
    var all = '<button type="button" class="chip" data-pick-level="all" aria-pressed="' +
      (pickLevel === 'all' ? 'true' : 'false') + '">' +
      LHT.esc(t('battle.levelAll')) + '</button>';
    var levels = [1, 2, 3].map(function (level) {
      var count = SCENARIOS.filter(function (scenario) { return scenario.level === level; }).length;
      return '<button type="button" class="chip" data-pick-level="' + level + '" aria-pressed="' +
        (String(pickLevel) === String(level) ? 'true' : 'false') + '">L' + level +
        ' <span class="dim">' + count + '</span></button>';
    }).join('');
    els.levels.innerHTML = all + levels;
  }

  function renderScenarioCards() {
    var isAttack = currentMode === 'attack';
    renderLevelChips();
    var list = SCENARIOS.filter(function (scenario) {
      return pickLevel === 'all' || String(scenario.level) === String(pickLevel);
    });
    els.pickGrid.innerHTML = list.map(function (scenario) {
      var meta = isAttack
        ? [scenario.ap + ' ' + t('battle.apUnit'), scenario.nodes.length + ' ' + t('battle.nodesUnit')]
        : [scenario.rounds + ' ' + t('battle.roundsUnit'), t('battle.budget') + ' ' + scenario.budget,
           scenario.nodes.length + ' ' + t('battle.nodesUnit')];
      return '<article class="scenario-card">' +
        '<div class="scenario-top">' +
          '<span class="scenario-level">L' + scenario.level + '</span>' +
          '<h3>' + LHT.pick(scenario.name) + '</h3>' +
        '</div>' +
        '<p>' + LHT.pick(scenario.brief) + '</p>' +
        '<div class="scenario-meta">' + meta.map(function (item) {
          return '<span>' + LHT.esc(item) + '</span>';
        }).join('') + '</div>' +
        '<button type="button" class="btn btn-primary" data-start="' + LHT.esc(scenario.id) + '">' +
          LHT.esc(t(isAttack ? 'battle.startAttack' : 'battle.startDefense')) +
        '</button>' +
      '</article>';
    }).join('');
  }

  /* ---------- 游戏初始化 ---------- */

  function startScenario(id, seed) {
    var scenario = scenarioById(id);
    if (!scenario) return;
    var isAttack = currentMode === 'attack';
    var runSeed = seed || makeSeed();
    var events = orderEvents(scenario.events, makeRng(runSeed));

    var nodes = scenario.nodes.map(function (node) {
      var defense = node.defense || { patch: 0, segment: 0, monitor: 0, backup: false };
      return {
        id: node.id,
        label: node.label,
        x: node.x,
        y: node.y,
        critical: !!node.critical,
        data: node.data || 0,
        exposure: node.exposure || 0,
        health: 100,
        patch: isAttack ? defense.patch : 0,
        segment: isAttack ? defense.segment : 0,
        monitor: isAttack ? defense.monitor : 0,
        backup: isAttack ? !!defense.backup : false,
        isolated: false,
        fallen: false
      };
    });

    var critical = nodes.filter(function (node) { return node.critical; });
    var selected = isAttack
      ? (critical.slice().sort(function (a, b) { return b.exposure - a.exposure; })[0] || nodes[0]).id
      : (critical[0] || nodes[0]).id;

    state = {
      mode: currentMode,
      scenario: scenario,
      seed: runSeed,
      events: events,
      round: 0,
      turn: 0,
      budget: scenario.budget,
      ap: scenario.ap || scenario.rounds + 2,
      data: 100,
      stolen: 0,
      nodes: nodes,
      selected: selected,
      log: [],
      ended: false,
      lastHit: null,
      lastDamage: 0,
      isolationCount: 0,
      revealDefenses: false,
      codeBonus: false
    };

    pushLog('info', 'battle.logSeed', { seed: runSeed }, 1);
    pushLog(isAttack ? 'attack' : 'info',
      isAttack ? 'battle.logAttackStart' : 'battle.logStart',
      { scenario: scenario.id }, 1);

    els.pick.hidden = true;
    els.game.hidden = false;
    els.result.hidden = true;
    setCodeTemplate();
    render();
  }

  /* ---------- 拓扑 ---------- */

  function healthClass(health) {
    if (health > 60) return 'hp-ok';
    if (health > 30) return 'hp-warn';
    return 'hp-danger';
  }

  function upgradeText(node) {
    if (state.mode === 'attack' && !state.revealDefenses) return '???';
    var parts = [];
    if (node.patch) parts.push('P' + node.patch);
    if (node.segment) parts.push('S' + node.segment);
    if (node.monitor) parts.push('M' + node.monitor);
    if (node.backup) parts.push('B');
    if (node.isolated) parts.push('ISO');
    return parts.join(' ');
  }

  function renderTopology() {
    var byId = {};
    state.nodes.forEach(function (node) { byId[node.id] = node; });

    var links = state.scenario.links.map(function (pair) {
      var a = byId[pair[0]];
      var b = byId[pair[1]];
      if (!a || !b) return '';
      return '<line class="battle-link" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"></line>';
    }).join('');

    var nodes = state.nodes.map(function (node) {
      var w = 132;
      var h = 64;
      var bx = node.x - w / 2;
      var by = node.y - h / 2;
      var hpWidth = 108 * clamp(node.health, 0, 100) / 100;
      var cls = 'battle-node' +
        (node.critical ? ' is-critical' : '') +
        (node.health <= 0 ? ' is-down' : '') +
        (node.isolated ? ' is-isolated' : '') +
        (node.id === state.selected ? ' is-selected' : '') +
        (node.id === state.lastHit ? ' is-hit' : '');
      var label = LHT.esc(LHT.pickText(node.label));
      var sub = node.critical
        ? LHT.esc(t('battle.critical')) + (node.data ? ' · ' + LHT.esc(t('battle.dataValue')) + ' ' + node.data : '')
        : LHT.esc(t('battle.edge'));
      var upgrades = upgradeText(node);
      var dmg = (node.id === state.lastHit && state.lastDamage > 0)
        ? '<text class="battle-dmg" x="' + node.x + '" y="' + (by - 8) + '" text-anchor="middle">-' + state.lastDamage + '</text>'
        : '';

      return '<g class="' + cls + '" data-node="' + LHT.esc(node.id) + '" tabindex="0" role="button" aria-label="' +
          LHT.esc(LHT.pickText(node.label) + ' · ' + Math.round(node.health) + '%') + '">' +
        '<rect class="node-box" x="' + bx + '" y="' + by + '" width="' + w + '" height="' + h + '" rx="12"></rect>' +
        '<text class="node-label" x="' + node.x + '" y="' + (by + 22) + '" text-anchor="middle">' + label + '</text>' +
        '<text class="node-sub" x="' + node.x + '" y="' + (by + 36) + '" text-anchor="middle">' + sub + '</text>' +
        '<rect class="health-track" x="' + (bx + 12) + '" y="' + (by + 45) + '" width="108" height="4" rx="2"></rect>' +
        '<rect class="health-fill ' + healthClass(node.health) + '" x="' + (bx + 12) + '" y="' + (by + 45) + '" width="' + hpWidth + '" height="4" rx="2"></rect>' +
        '<text class="node-upgrades" x="' + (bx + 12) + '" y="' + (by + 58) + '">' + LHT.esc(upgrades) + '</text>' +
        '<text class="node-hp" x="' + (bx + 120) + '" y="' + (by + 58) + '" text-anchor="end">' + Math.round(node.health) + '</text>' +
        dmg +
      '</g>';
    }).join('');

    els.canvas.innerHTML = '<svg viewBox="0 0 640 320" role="img" aria-label="' +
      LHT.esc(t('battle.topology')) + '">' +
      '<defs><pattern id="battle-grid" width="20" height="20" patternUnits="userSpaceOnUse">' +
        '<path class="battle-grid-line" d="M20 0H0V20" fill="none"></path>' +
      '</pattern></defs>' +
      '<rect width="640" height="320" fill="url(#battle-grid)"></rect>' +
      links +
      nodes +
    '</svg>';

    if (state.lastHit) {
      var hitId = state.lastHit;
      window.setTimeout(function () {
        if (!state || state.lastHit !== hitId) return;
        state.lastHit = null;
        var group = els.canvas.querySelector('[data-node="' + hitId + '"]');
        if (group) {
          group.classList.remove('is-hit');
          var dmgNode = group.querySelector('.battle-dmg');
          if (dmgNode) dmgNode.remove();
        }
      }, 900);
    }
  }

  /* ---------- 顶部指标与情报 ---------- */

  function renderTop() {
    var isAttack = state.mode === 'attack';
    var html = '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.scenario')) + '</span>' +
      '<span class="v small-v">' + LHT.pick(state.scenario.name) + '</span></div>';

    if (isAttack) {
      html += '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.turn')) + '</span>' +
          '<span class="v">' + state.turn + '</span></div>' +
        '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.ap')) + '</span>' +
          '<span class="v">' + state.ap + '</span></div>' +
        '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.stolen')) + '</span>' +
          '<span class="v">' + state.stolen + '</span></div>';
    } else {
      html += '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.round')) + '</span>' +
          '<span class="v">' + Math.min(state.round + 1, state.scenario.rounds) + ' / ' + state.scenario.rounds + '</span></div>' +
        '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.budget')) + '</span>' +
          '<span class="v">' + state.budget + '</span></div>' +
        '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.data')) + '</span>' +
          '<span class="v">' + state.data + '%</span></div>';
    }

    html += '<div class="battle-stat"><span class="k">' + LHT.esc(t('battle.score')) + '</span>' +
      '<span class="v">' + currentScore() + '</span></div>';
    els.top.innerHTML = html;
  }

  function renderIntel() {
    if (state.mode === 'attack') {
      var target = selectedNode();
      var text;
      if (state.revealDefenses) {
        text = '<b>' + LHT.esc(t('battle.defenseIntel')) + '</b> · ' +
          LHT.esc(t('battle.patch')) + ' ' + target.patch + ' · ' +
          LHT.esc(t('battle.segment')) + ' ' + target.segment + ' · ' +
          LHT.esc(t('battle.monitor')) + ' ' + target.monitor + ' · ' +
          LHT.esc(t('battle.backup')) + ' ' + LHT.esc(t(target.backup ? 'battle.yes' : 'battle.no'));
      } else {
        text = LHT.esc(t('battle.revealHint')) + ' · ' +
          LHT.esc(t('battle.exposure')) + ' ' + target.exposure;
      }
      els.intel.innerHTML = '<span class="k">' + LHT.esc(t('battle.intel')) + '</span>' +
        '<span class="v">' + text + '</span>';
      return;
    }

    var event = currentEvent();
    var monitor = monitorTotal();
    var hint;
    if (!event) {
      hint = LHT.esc(t('battle.noEvent'));
    } else if (monitor >= 3) {
      hint = '<b>' + LHT.esc(t('battle.targetKnown')) + ' · ' + LHT.esc(nodeName(event.target)) +
        ' · ' + LHT.esc(t(typeKey(event.type))) + '</b><br>' +
        LHT.pick(event.hint);
    } else if (monitor >= 2) {
      hint = LHT.pick(event.hint);
    } else if (monitor >= 1) {
      var targetNode = nodeById(event.target);
      var vagueType = 'battle.vague' + event.type.charAt(0).toUpperCase() + event.type.slice(1);
      var prefix = t(hashSeed(state.seed + ':' + state.round + ':prefix') % 2
        ? 'battle.vaguePrefix2'
        : 'battle.vaguePrefix1');
      var scope = t(targetNode && targetNode.critical ? 'battle.vagueCore' : 'battle.vagueEdge');
      var sep = LHT.lang === 'both' ? '' : ' ';
      hint = LHT.esc(prefix + sep + t(vagueType) + sep + scope);
    } else {
      hint = LHT.esc(t('battle.noIntel'));
    }
    els.intel.innerHTML = '<span class="k">' + LHT.esc(t('battle.intel')) + '</span>' +
      '<span class="v">' + hint + '</span>';
  }

  /* ---------- 节点面板与动作 ---------- */

  function defenseMeta(action, node) {
    if (action === 'patch') return node.patch >= 3 ? t('battle.maxed') : 'Lv ' + node.patch + '/3';
    if (action === 'segment') return node.segment >= 2 ? t('battle.maxed') : 'Lv ' + node.segment + '/2';
    if (action === 'monitor') return node.monitor >= 2 ? t('battle.maxed') : 'Lv ' + node.monitor + '/2';
    if (action === 'backup') return node.backup ? t('battle.backedUp') : t('battle.oneShot');
    if (action === 'isolate') return node.isolated ? t('battle.isolated') : t('battle.thisRound');
    if (action === 'restore') return node.backup ? '+35' : t('battle.needBackup');
    return '';
  }

  function canBuy(actionId, node) {
    if (!state || state.ended || state.mode !== 'defense' || !node) return false;
    var action = null;
    for (var i = 0; i < DEFENSE_ACTIONS.length; i++) {
      if (DEFENSE_ACTIONS[i].id === actionId) action = DEFENSE_ACTIONS[i];
    }
    if (!action || state.budget < action.cost) return false;
    if (node.health <= 0 && actionId !== 'backup' && actionId !== 'restore') return false;
    if (actionId === 'patch') return node.patch < 3;
    if (actionId === 'segment') return node.segment < 2;
    if (actionId === 'monitor') return node.monitor < 2;
    if (actionId === 'backup') return !node.backup;
    if (actionId === 'isolate') return !node.isolated;
    if (actionId === 'restore') return node.backup && node.health < 100;
    return false;
  }

  function attackById(id) {
    for (var i = 0; i < ATTACKS.length; i++) {
      if (ATTACKS[i].id === id) return ATTACKS[i];
    }
    return null;
  }

  function canAttack(id, node) {
    if (!state || state.ended || state.mode !== 'attack' || !node) return false;
    var attack = attackById(id);
    if (!attack || state.ap < attack.cost) return false;
    if (attack.scout) return !state.revealDefenses;
    return node.health > 0;
  }

  function renderPanel() {
    var node = selectedNode();
    if (!node) return;
    var isAttack = state.mode === 'attack';

    els.node.innerHTML = '<div class="battle-node-head">' +
        '<h3>' + LHT.pick(node.label) + '</h3>' +
        (node.critical
          ? '<span class="badge badge-gold">' + LHT.esc(t('battle.critical')) + '</span>'
          : '<span class="badge">' + LHT.esc(t('battle.edge')) + '</span>') +
      '</div>' +
      '<div class="battle-node-stats">' +
        '<div><span class="k">' + LHT.esc(t('battle.health')) + '</span>' +
          '<span class="v">' + Math.round(node.health) + ' / 100</span></div>' +
        '<div><span class="k">' + LHT.esc(t('battle.exposure')) + '</span>' +
          '<span class="v">' + node.exposure + '</span></div>' +
        '<div><span class="k">' + LHT.esc(t('battle.dataValue')) + '</span>' +
          '<span class="v">' + (node.critical ? node.data : '—') + '</span></div>' +
      '</div>' +
      '<div class="progress-line battle-health-line"><span class="' + healthClass(node.health) +
        '" style="width:' + clamp(node.health, 0, 100) + '%"></span></div>';

    els.actionsTitle.textContent = t(isAttack ? 'battle.attackActions' : 'battle.actions');
    els.end.textContent = t(isAttack ? 'battle.retreat' : 'battle.endRound');

    if (isAttack) {
      els.actions.innerHTML = ATTACKS.map(function (attack) {
        var disabled = !canAttack(attack.id, node);
        var meta;
        if (attack.scout) {
          meta = state.revealDefenses ? t('battle.scouted') : t('battle.scoutMeta');
        } else {
          meta = '-' + (state.revealDefenses
            ? resolveDamage({ type: attack.id, power: attack.power }, node)
            : attack.power);
        }
        return '<button type="button" class="battle-action" data-attack="' + attack.id + '"' +
          (disabled ? ' disabled' : '') + '>' +
          '<span class="ba-name">' + LHT.esc(t(attack.key)) + '</span>' +
          '<span class="ba-cost">' + attack.cost + '</span>' +
          '<span class="ba-meta">' + LHT.esc(meta) + '</span>' +
        '</button>';
      }).join('');
      els.helpList.innerHTML = ATTACKS.map(function (attack) {
        return '<li><b>' + LHT.esc(t(attack.key)) + '</b> ' + LHT.esc(t(attack.desc)) + '</li>';
      }).join('');
    } else {
      els.actions.innerHTML = DEFENSE_ACTIONS.map(function (action) {
        var disabled = !canBuy(action.id, node);
        return '<button type="button" class="battle-action" data-action="' + action.id + '"' +
          (disabled ? ' disabled' : '') + '>' +
          '<span class="ba-name">' + LHT.esc(t(action.key)) + '</span>' +
          '<span class="ba-cost">' + action.cost + '</span>' +
          '<span class="ba-meta">' + LHT.esc(defenseMeta(action.id, node)) + '</span>' +
        '</button>';
      }).join('');
      els.helpList.innerHTML = DEFENSE_ACTIONS.map(function (action) {
        return '<li><b>' + LHT.esc(t(action.key)) + '</b> ' + LHT.esc(t(action.desc)) + '</li>';
      }).join('');
    }

    els.end.disabled = state.ended;
  }

  /* ---------- 日志 ---------- */

  function renderLog() {
    els.log.innerHTML = logHtml(state.log);
    els.log.scrollTop = els.log.scrollHeight;
  }

  /* ---------- 主渲染 ---------- */

  function render() {
    if (!state) return;
    renderTop();
    renderIntel();
    renderTopology();
    renderPanel();
    renderLog();
  }

  /* ---------- 蓝队动作 ---------- */

  function buy(actionId) {
    var node = selectedNode();
    if (!canBuy(actionId, node)) return;
    var action = null;
    for (var i = 0; i < DEFENSE_ACTIONS.length; i++) {
      if (DEFENSE_ACTIONS[i].id === actionId) action = DEFENSE_ACTIONS[i];
    }

    state.budget -= action.cost;

    if (actionId === 'patch') {
      node.patch += 1;
      pushLog('defense', 'battle.logBuy', { action: action.key, node: node.id, cost: action.cost });
    } else if (actionId === 'segment') {
      node.segment += 1;
      pushLog('defense', 'battle.logBuy', { action: action.key, node: node.id, cost: action.cost });
    } else if (actionId === 'monitor') {
      node.monitor += 1;
      pushLog('defense', 'battle.logBuy', { action: action.key, node: node.id, cost: action.cost });
    } else if (actionId === 'backup') {
      node.backup = true;
      pushLog('defense', 'battle.logBuy', { action: action.key, node: node.id, cost: action.cost });
    } else if (actionId === 'isolate') {
      node.isolated = true;
      state.isolationCount += 1;
      pushLog('defense', 'battle.logIsolate', { node: node.id });
    } else if (actionId === 'restore') {
      var gained = Math.min(35, 100 - node.health);
      node.health = Math.min(100, node.health + 35);
      node.backup = false;
      pushLog('defense', 'battle.logRestore', { node: node.id, hp: gained });
    }

    render();
  }

  /* ---------- 红队动作 ---------- */

  function resolveDamage(event, node) {
    var damage = event.power;
    if (event.type === 'exploit' || event.type === 'ransomware') damage -= node.patch * 6;
    if (event.type === 'phishing' || event.type === 'insider') damage -= node.monitor * 4;
    damage *= (1 - node.segment * 0.15);
    damage *= (1 - node.monitor * 0.10);
    if (node.isolated) damage *= 0.30;
    return Math.max(0, Math.round(damage));
  }

  function checkAttackEnd() {
    var critical = state.nodes.filter(function (node) { return node.critical; });
    var allDown = critical.every(function (node) { return node.health <= 0; });
    return allDown || state.ap <= 0;
  }

  function attack(id) {
    var node = selectedNode();
    if (!canAttack(id, node)) return;
    var attackDef = attackById(id);
    state.ap -= attackDef.cost;
    state.turn += 1;

    if (attackDef.scout) {
      state.revealDefenses = true;
      pushLog('attack', 'battle.logScout', { node: node.id }, state.turn);
    } else {
      var damage = resolveDamage({ type: id, power: attackDef.power }, node);
      state.lastHit = node.id;
      state.lastDamage = damage;

      if (damage <= 0) {
        pushLog('defense', 'battle.logBlocked', {
          round: state.turn,
          type: typeKey(id),
          node: node.id
        }, state.turn);
      } else {
        node.health = Math.max(0, node.health - damage);
        pushLog('attack', 'battle.logAttack', {
          round: state.turn,
          type: typeKey(id),
          node: node.id,
          dmg: damage
        }, state.turn);

        if (node.health <= 0) {
          pushLog('attack', 'battle.logDown', { node: node.id }, state.turn);
          if (node.critical && !node.fallen) {
            node.fallen = true;
            state.stolen += node.data;
            pushLog('attack', 'battle.logStolen', { node: node.id, n: node.data }, state.turn);
          }
        } else {
          node.patch = Math.min(3, node.patch + 1);
          if (state.turn % 2 === 0) node.monitor = Math.min(2, node.monitor + 1);
          pushLog('defense', 'battle.logBlueResponse', { node: node.id }, state.turn);
        }
      }
    }

    var ended = checkAttackEnd();
    if (ended) {
      var score = attackScore();
      pushLog('result', 'battle.logAttackEnd', {
        score: score,
        rating: 'battle.attackRating' + ratingForAttack(score)
      }, state.turn);
      state.ended = true;
    }

    render();
    if (ended) window.setTimeout(showResult, 950);
  }

  function retreat() {
    if (!state || state.ended) return;
    pushLog('result', 'battle.logRetreat', {}, state.turn + 1);
    state.ended = true;
    render();
    window.setTimeout(showResult, 450);
  }

  /* ---------- 防守回合结算 ---------- */

  function checkDefenseEnd() {
    var criticalDown = state.nodes.filter(function (node) { return node.critical; })
      .every(function (node) { return node.health <= 0; });
    return state.data <= 0 || criticalDown || state.round >= state.scenario.rounds;
  }

  function endRound() {
    if (!state || state.ended || state.mode !== 'defense') return;

    var roundNo = state.round + 1;
    var event = currentEvent();

    if (event) {
      var node = nodeById(event.target);
      var damage = resolveDamage(event, node);
      state.lastHit = node.id;
      state.lastDamage = damage;

      if (damage <= 0) {
        pushLog('defense', 'battle.logBlocked', {
          round: roundNo,
          type: typeKey(event.type),
          node: node.id
        }, roundNo);
      } else {
        node.health = Math.max(0, node.health - damage);
        pushLog('attack', 'battle.logAttack', {
          round: roundNo,
          type: typeKey(event.type),
          node: node.id,
          dmg: damage
        }, roundNo);

        if (node.health <= 0) {
          pushLog('attack', 'battle.logDown', { node: node.id }, roundNo);
          if (node.critical && !node.fallen) {
            node.fallen = true;
            state.data = Math.max(0, state.data - node.data);
            pushLog('attack', 'battle.logDataLoss', { n: node.data }, roundNo);
          }
        }
      }
    } else {
      pushLog('info', 'battle.logNoEvent', {}, roundNo);
    }

    state.nodes.forEach(function (item) { item.isolated = false; });
    state.round += 1;

    var ended = checkDefenseEnd();
    if (ended) {
      var score = defenseScore();
      pushLog('result', 'battle.logEnd', {
        score: score,
        rating: 'battle.rating' + ratingForDefense(score)
      }, state.round);
      state.ended = true;
    }

    render();
    if (ended) window.setTimeout(showResult, 950);
  }

  /* ---------- 结果 ---------- */

  function showResult() {
    if (!state) return;
    state.ended = true;
    els.game.hidden = true;
    els.result.hidden = false;
    renderResult();
    els.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function breakdownRow(label, value, display, danger) {
    return '<div class="breakdown-row"><span>' + LHT.esc(label) + '</span>' +
      '<div class="battle-bar"><span style="width:' + clamp(value, 0, 100) + '%' +
        (danger ? ';background:var(--danger)' : '') + '"></span></div>' +
      '<b>' + display + '</b></div>';
  }

  function seedHtml() {
    return '<p class="battle-seed"><span class="k">' + LHT.esc(t('battle.seed')) + '</span>' +
      ' <code>' + LHT.esc(state.seed) + '</code></p>';
  }

  function renderResult() {
    if (state.mode === 'attack') renderAttackResult();
    else renderDefenseResult();
  }

  function renderDefenseResult() {
    var score = defenseScore();
    var rating = ratingForDefense(score);
    var avg = Math.round(averageHealth());
    var budgetPct = Math.round(state.budget / state.scenario.budget * 100);
    var detection = Math.min(100, monitorTotal() * 20);
    var penalty = state.isolationCount * 4;

    els.resultBody.innerHTML = '<div class="battle-result-card">' +
      '<div class="battle-result-head">' +
        '<div class="battle-score"><span class="score-num">' + score + '</span>' +
          '<span class="score-rating">' + rating + '</span></div>' +
        '<div>' +
          '<p class="fig"><b>Fig. 13</b> · Débriefing</p>' +
          '<h2>' + LHT.esc(t('battle.resultTitle')) + '</h2>' +
          '<p class="muted">' + LHT.esc(t('battle.resultSub')) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="battle-rating-name">' + LHT.esc(t('battle.rating' + rating)) + '</div>' +
      '<p class="battle-rating-desc">' + LHT.esc(t('battle.rating' + rating + 'Desc')) + '</p>' +
      '<div class="battle-breakdown">' +
        breakdownRow(t('battle.avgHealth'), avg, avg) +
        breakdownRow(t('battle.dataIntegrity'), state.data, state.data) +
        breakdownRow(t('battle.budgetEfficiency'), budgetPct, budgetPct) +
        breakdownRow(t('battle.detection'), detection, detection) +
        breakdownRow(t('battle.penalty'), penalty, '-' + penalty, true) +
      '</div>' +
      seedHtml() +
      '<div class="battle-result-actions">' +
        '<button type="button" class="btn btn-primary" id="battle-again">' + LHT.esc(t('battle.again')) + '</button>' +
        '<button type="button" class="btn btn-ghost" id="battle-same">' + LHT.esc(t('battle.sameSeed')) + '</button>' +
        '<button type="button" class="btn" id="battle-change">' + LHT.esc(t('battle.changeScenario')) + '</button>' +
      '</div>' +
      '<h3 class="battle-log-title">' + LHT.esc(t('battle.lastLog')) + '</h3>' +
      '<div class="battle-log battle-log-result">' + logHtml(state.log.slice(-9)) + '</div>' +
    '</div>';
  }

  function renderAttackResult() {
    var score = attackScore();
    var rating = ratingForAttack(score);
    var totals = attackTotals();
    var stolenPct = totals.totalData ? Math.round(state.stolen / totals.totalData * 100) : 0;
    var downPct = totals.critical ? Math.round(totals.down / totals.critical * 100) : 0;
    var damagePct = Math.round(totals.damagePct);
    var maxAp = state.scenario.ap + (state.codeBonus ? 1 : 0);
    var apPct = maxAp ? Math.round(state.ap / maxAp * 100) : 0;

    els.resultBody.innerHTML = '<div class="battle-result-card">' +
      '<div class="battle-result-head">' +
        '<div class="battle-score battle-score-attack"><span class="score-num">' + score + '</span>' +
          '<span class="score-rating">' + rating + '</span></div>' +
        '<div>' +
          '<p class="fig"><b>Fig. 13</b> · Débriefing</p>' +
          '<h2>' + LHT.esc(t('battle.resultAttackTitle')) + '</h2>' +
          '<p class="muted">' + LHT.esc(t('battle.resultAttackSub')) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="battle-rating-name">' + LHT.esc(t('battle.attackRating' + rating)) + '</div>' +
      '<p class="battle-rating-desc">' + LHT.esc(t('battle.attackRating' + rating + 'Desc')) + '</p>' +
      '<div class="battle-breakdown">' +
        breakdownRow(t('battle.stolenData'), stolenPct, state.stolen) +
        breakdownRow(t('battle.criticalDown'), downPct, totals.down + ' / ' + totals.critical) +
        breakdownRow(t('battle.criticalDamage'), damagePct, damagePct + '%') +
        breakdownRow(t('battle.apLeft'), apPct, state.ap) +
      '</div>' +
      seedHtml() +
      '<div class="battle-result-actions">' +
        '<button type="button" class="btn btn-primary" id="battle-again">' + LHT.esc(t('battle.again')) + '</button>' +
        '<button type="button" class="btn btn-ghost" id="battle-same">' + LHT.esc(t('battle.sameSeed')) + '</button>' +
        '<button type="button" class="btn" id="battle-change">' + LHT.esc(t('battle.changeScenario')) + '</button>' +
      '</div>' +
      '<h3 class="battle-log-title">' + LHT.esc(t('battle.lastLog')) + '</h3>' +
      '<div class="battle-log battle-log-result">' + logHtml(state.log.slice(-9)) + '</div>' +
    '</div>';
  }

  /* ---------- 代码演练 ---------- */

  function setCodeTemplate() {
    if (!els.codeSrc) return;
    els.codeSrc.value = CODE[currentMode].template;
    els.codeOut.textContent = '';
    els.codeStatus.textContent = '';
    updateCodeLabels();
  }

  function updateCodeLabels() {
    var mode = state ? state.mode : currentMode;
    els.codeTitle.textContent = t(mode === 'attack' ? 'battle.codeAttackTitle' : 'battle.codeDefenseTitle');
    els.codeHint.textContent = t(mode === 'attack' ? 'battle.codeAttackHint' : 'battle.codeDefenseHint');
    els.codeRun.textContent = t('battle.codeRun');
  }

  function updateModeCopy() {
    var mode = state ? state.mode : currentMode;
    els.tutorial.textContent = t(mode === 'attack' ? 'battle.tutorialAttack' : 'battle.tutorialDefense');
  }

  function runUserCode(source, challenge) {
    var code = source + '\n;console.log(JSON.stringify((' + challenge.fn + ')(' +
      JSON.stringify(challenge.arg) + ')));';
    return LHT.runCode('javascript', code, '', { timeout: 1500 }).then(function (res) {
      if (!res.ok) return { ok: false, error: res.error || res.stderr || 'Error' };
      var lines = String(res.stdout || '').trim().split('\n');
      var last = lines[lines.length - 1];
      try {
        return { ok: true, result: JSON.parse(last) };
      } catch (e) {
        return { ok: false, error: 'Invalid output: ' + last };
      }
    }, function (err) {
      return { ok: false, error: String(err && err.message || err) };
    });
  }

  function runCode() {
    if (!state || state.ended) return;
    var challenge = CODE[state.mode];
    els.codeStatus.textContent = t('battle.codeRunning');
    els.codeOut.textContent = '';
    els.codeRun.disabled = true;

    runUserCode(els.codeSrc.value, challenge).then(function (res) {
      els.codeRun.disabled = false;
      if (!res.ok) {
        els.codeStatus.textContent = t('battle.codeError');
        els.codeOut.textContent = res.error;
        return;
      }
      var passed = JSON.stringify(res.result) === JSON.stringify(challenge.expected);
      els.codeStatus.textContent = passed ? t('battle.codePass') : t('battle.codeFail');
      els.codeOut.textContent = t('battle.codeExpected') + ' ' + JSON.stringify(challenge.expected) + '\n' +
        t('battle.codeActual') + ' ' + JSON.stringify(res.result);

      if (passed && !state.codeBonus) {
        state.codeBonus = true;
        if (state.mode === 'defense') {
          state.budget += 20;
          pushLog('defense', 'battle.logCodeDefense', {}, state.round + 1);
        } else {
          state.ap += 1;
          state.revealDefenses = true;
          pushLog('attack', 'battle.logCodeAttack', {}, state.turn + 1);
        }
        render();
        els.codeOut.textContent += '\n' + t('battle.codeApplied');
      }
    });
  }

  /* ---------- 模式切换 ---------- */

  function setMode(mode) {
    if (mode !== 'defense' && mode !== 'attack') return;
    if (mode === currentMode && state) return;
    currentMode = mode;
    state = null;
    els.pick.hidden = false;
    els.game.hidden = true;
    els.result.hidden = true;
    LHT.$$('#battle-mode [data-mode]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-mode') === mode ? 'true' : 'false');
    });
    renderScenarioCards();
    setCodeTemplate();
    updateModeCopy();
  }

  /* ---------- 启动 ---------- */

  function boot() {
    els = {
      mode: LHT.$('#battle-mode'),
      pick: LHT.$('#battle-pick'),
      pickGrid: LHT.$('#battle-scenarios'),
      levels: LHT.$('#battle-levels'),
      game: LHT.$('#battle-game'),
      result: LHT.$('#battle-result'),
      resultBody: LHT.$('#battle-result-body'),
      top: LHT.$('#battle-top'),
      intel: LHT.$('#battle-intel'),
      canvas: LHT.$('#battle-canvas'),
      node: LHT.$('#battle-node'),
      actions: LHT.$('#battle-actions'),
      actionsTitle: LHT.$('#battle-actions-title'),
      helpList: LHT.$('#battle-help-list'),
      end: LHT.$('#battle-end'),
      log: LHT.$('#battle-log'),
      tutorial: LHT.$('#battle-tutorial'),
      code: LHT.$('#battle-code'),
      codeTitle: LHT.$('#battle-code-title'),
      codeHint: LHT.$('#battle-code-hint'),
      codeSrc: LHT.$('#battle-code-src'),
      codeRun: LHT.$('#battle-code-run'),
      codeStatus: LHT.$('#battle-code-status'),
      codeOut: LHT.$('#battle-code-out')
    };

    renderScenarioCards();
    setCodeTemplate();
    updateModeCopy();

    els.mode.addEventListener('click', function (event) {
      var button = event.target.closest('[data-mode]');
      if (button) setMode(button.getAttribute('data-mode'));
    });

    els.pickGrid.addEventListener('click', function (event) {
      var start = event.target.closest('[data-start]');
      if (start) startScenario(start.getAttribute('data-start'));
    });

    els.levels.addEventListener('click', function (event) {
      var chip = event.target.closest('[data-pick-level]');
      if (chip) {
        pickLevel = chip.getAttribute('data-pick-level');
        renderScenarioCards();
      }
    });

    els.canvas.addEventListener('click', function (event) {
      var node = event.target.closest('[data-node]');
      if (node) {
        state.selected = node.getAttribute('data-node');
        render();
      }
    });

    els.canvas.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var node = event.target.closest('[data-node]');
      if (node) {
        event.preventDefault();
        state.selected = node.getAttribute('data-node');
        render();
      }
    });

    els.actions.addEventListener('click', function (event) {
      var defense = event.target.closest('[data-action]');
      if (defense) {
        buy(defense.getAttribute('data-action'));
        return;
      }
      var attackButton = event.target.closest('[data-attack]');
      if (attackButton) attack(attackButton.getAttribute('data-attack'));
    });

    els.end.addEventListener('click', function () {
      if (!state || state.ended) return;
      if (state.mode === 'attack') retreat();
      else endRound();
    });

    els.codeRun.addEventListener('click', runCode);

    els.resultBody.addEventListener('click', function (event) {
      if (event.target.closest('#battle-again')) {
        startScenario(state.scenario.id);
      } else if (event.target.closest('#battle-same')) {
        startScenario(state.scenario.id, state.seed);
      } else if (event.target.closest('#battle-change')) {
        state = null;
        els.pick.hidden = false;
        els.game.hidden = true;
        els.result.hidden = true;
        renderScenarioCards();
        setCodeTemplate();
        els.pick.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    var previous = LHT.onLangChange;
    LHT.onLangChange = function (lang) {
      if (typeof previous === 'function') previous(lang);
      renderScenarioCards();
      updateCodeLabels();
      updateModeCopy();
      if (state) {
        if (state.ended) renderResult();
        else render();
      }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
