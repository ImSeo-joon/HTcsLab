/* ============================================================
   contests.js — 大学生竞赛指南控制器
   搜索、方向、年级、难度、排序、关注、详情、四年规划、经验方法
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var ALL = window.LHT_CONTESTS || [];
  var CATS = window.LHT_CONTEST_CATS || [];
  var PATHS = window.LHT_CONTEST_PATHS || [];
  var STAGES = window.LHT_CONTEST_STAGES || ['lower', 'upper', 'postgrad', 'open'];
  var YEARS = window.LHT_CONTEST_YEARS || [];
  var GUIDES = window.LHT_CONTEST_GUIDES || [];
  var JA = window.LHT_CONTEST_JA || null;

  /** 日语模式只展示日本赛事与少量国际/中国赛事；其他语言展示全部。 */
  function jaSet() {
    var set = {};
    ((JA && JA.allow) || []).forEach(function (id) { set[id] = true; });
    return set;
  }

  function activeContests() {
    if (LHT.lang !== 'ja' || !JA || !JA.allow || !JA.allow.length) return ALL;
    var allow = jaSet();
    return ALL.filter(function (item) { return allow[item.id]; });
  }

  function activePaths() {
    if (LHT.lang === 'ja' && JA && JA.paths && JA.paths.length) return JA.paths;
    return PATHS;
  }

  function activeYears() {
    if (LHT.lang === 'ja' && JA && JA.years && JA.years.length) return JA.years;
    return YEARS;
  }

  var MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  var STAR_KEY = 'lht.contests.stars';

  var stars = (function () {
    try {
      var raw = window.localStorage.getItem(STAR_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list.filter(function (id) { return typeof id === 'string'; }) : [];
    } catch (e) {
      return [];
    }
  })();

  stars = stars.filter(function (id, index) {
    return stars.indexOf(id) === index && ALL.some(function (item) { return item.id === id; });
  });

  var state = {
    query: '',
    cat: 'all',
    stage: 'all',
    level: 'all',
    sort: 'default',
    starsOnly: false
  };

  var expanded = {};
  var els = {};

  function isStarred(id) { return stars.indexOf(id) >= 0; }

  function saveStars() {
    try { window.localStorage.setItem(STAR_KEY, JSON.stringify(stars)); } catch (e) { /* 忽略 */ }
  }

  function catOf(id) {
    for (var i = 0; i < CATS.length; i++) {
      if (CATS[i].id === id) return CATS[i];
    }
    return null;
  }

  function catText(id) {
    var cat = catOf(id);
    if (!cat) return LHT.esc(id);
    return LHT.lang === 'both' ? LHT.esc(cat.label.zh || cat.label.en) : LHT.pick(cat.label);
  }

  function catSearchText(id) {
    var cat = catOf(id);
    return cat
      ? (cat.label.zh || '') + ' ' + (cat.label.en || '') + ' ' + (cat.label.fr || '') + ' ' + (cat.label.ja || '')
      : id;
  }

  function stageText(id) { return LHT.t('con.' + id); }

  function levelText(level) {
    return 'L' + level + ' · ' + LHT.t('con.level' + level);
  }

  /** 双语模式下只取中文，用于卡片里的紧凑标签。 */
  function compact(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return LHT.esc(obj);
    return LHT.lang === 'both' ? LHT.esc(obj.zh || obj.en) : LHT.pick(obj);
  }

  function skillText(skill) {
    if (!skill) return '';
    return LHT.lang === 'both' ? (skill.zh || skill.en) : LHT.pick(skill);
  }

  function nameText(item) {
    if (!item.name) return '';
    return LHT.lang === 'both' ? LHT.esc(item.name.zh || item.name.en) : LHT.pick(item.name);
  }

  function nextOffset(item) {
    var months = item.months || [];
    if (months.length >= 12) return 99;
    var now = new Date().getMonth() + 1;
    var best = 99;
    months.forEach(function (month) {
      var delta = (month - now + 12) % 12;
      if (delta < best) best = delta;
    });
    return best;
  }

  function haystack(item) {
    var chunks = [
      item.id,
      item.abbr,
      item.name ? item.name.zh : '',
      item.name ? item.name.en : '',
      item.summary ? item.summary.zh : '',
      item.summary ? item.summary.en : '',
      item.format ? item.format.zh : '',
      item.format ? item.format.en : '',
      item.season ? item.season.zh : '',
      item.season ? item.season.en : '',
      item.prereq ? item.prereq.zh : '',
      item.prereq ? item.prereq.en : '',
      item.experience ? item.experience.zh : '',
      item.experience ? item.experience.en : '',
      catSearchText(item.cat),
      stageText(item.stage)
    ];
    (item.skills || []).forEach(function (skill) {
      chunks.push(skill.zh || '', skill.en || '');
    });
    (item.roles || []).forEach(function (role) {
      chunks.push(role.zh || '', role.en || '');
    });
    (item.prep || []).forEach(function (step) {
      chunks.push(step.zh || '', step.en || '');
    });
    (item.tips || []).forEach(function (tip) {
      chunks.push(tip.zh || '', tip.en || '');
    });
    return chunks.join(' ').toLowerCase();
  }

  function matches(item) {
    if (state.starsOnly && !isStarred(item.id)) return false;
    if (state.cat !== 'all' && item.cat !== state.cat) return false;
    if (state.stage !== 'all' && item.stage !== state.stage) return false;
    if (state.level !== 'all' && String(item.level) !== String(state.level)) return false;
    var query = state.query.trim().toLowerCase();
    if (!query) return true;
    return haystack(item).indexOf(query) >= 0;
  }

  function sorted(items) {
    var list = items.slice();
    if (state.sort === 'level') {
      list.sort(function (a, b) {
        return a.level - b.level || String(a.abbr).localeCompare(String(b.abbr));
      });
    } else if (state.sort === 'name') {
      list.sort(function (a, b) {
        return LHT.pickText(a.name).localeCompare(LHT.pickText(b.name));
      });
    } else if (state.sort === 'season') {
      list.sort(function (a, b) {
        return nextOffset(a) - nextOffset(b) || a.level - b.level;
      });
    }
    return list;
  }

  function renderCats() {
    els.cats.innerHTML = '';
    var list = activeContests();
    var all = LHT.el('button', {
      type: 'button', class: 'chip', text: LHT.t('con.allCats'),
      'aria-pressed': state.cat === 'all' ? 'true' : 'false'
    });
    all.addEventListener('click', function () { state.cat = 'all'; render(); });
    els.cats.appendChild(all);

    CATS.forEach(function (cat) {
      var count = list.filter(function (item) { return item.cat === cat.id; }).length;
      if (!count) return;
      var chip = LHT.el('button', {
        type: 'button', class: 'chip',
        html: catText(cat.id) + ' <span class="dim">' + count + '</span>',
        'aria-pressed': state.cat === cat.id ? 'true' : 'false'
      });
      chip.addEventListener('click', function () { state.cat = cat.id; render(); });
      els.cats.appendChild(chip);
    });
  }

  function monthStrip(item) {
    var active = item.months || [];
    return '<div class="month-strip" role="img" aria-label="' +
      LHT.esc(LHT.t('con.season') + ': ' + LHT.pickText(item.season)) + '">' +
      MONTHS.map(function (label, index) {
        var on = active.indexOf(index + 1) >= 0;
        return '<span class="' + (on ? 'on' : '') + '" title="' + (index + 1) + '">' + label + '</span>';
      }).join('') +
    '</div>';
  }

  function renderLinks(item) {
    return (item.links || []).map(function (link, index) {
      return '<a class="btn btn-sm' + (index === 0 ? ' btn-primary' : ' btn-ghost') + '" href="' +
        LHT.esc(link.url) + '" target="_blank" rel="noopener noreferrer">' +
        LHT.esc(link.label) + ' ↗</a>';
    }).join('');
  }

  function roleLine(item) {
    return (item.roles || []).map(function (role) {
      return LHT.lang === 'both' ? (role.zh || role.en) : LHT.pickText(role);
    }).join(' · ');
  }

  function renderProfile(item) {
    return '<div class="contest-profile">' +
      '<div class="profile-cell"><span class="k">' + LHT.esc(LHT.t('con.stage')) + '</span>' +
        '<span class="v">' + LHT.esc(stageText(item.stage)) + '</span></div>' +
      '<div class="profile-cell"><span class="k">' + LHT.esc(LHT.t('con.prepWeeks')) + '</span>' +
        '<span class="v">' + compact(item.prepWeeks) + '</span></div>' +
      '<div class="profile-cell"><span class="k">' + LHT.esc(LHT.t('con.weekly')) + '</span>' +
        '<span class="v">' + compact(item.weekly) + '</span></div>' +
      '<div class="profile-cell"><span class="k">' + LHT.esc(LHT.t('con.roles')) + '</span>' +
        '<span class="v">' + LHT.esc(roleLine(item)) + '</span></div>' +
    '</div>';
  }

  function renderMore(item) {
    var id = item.id;
    var prep = (item.prep || []).map(function (step) {
      return '<li>' + LHT.pick(step) + '</li>';
    }).join('');
    var tips = (item.tips || []).map(function (tip) {
      return '<li>' + LHT.pick(tip) + '</li>';
    }).join('');
    var skills = (item.skills || []).map(function (skill) {
      return '<span class="badge badge-gold">' + LHT.esc(skillText(skill)) + '</span>';
    }).join('');

    return '<div class="contest-more" id="more-' + LHT.esc(id) + '"' +
        (expanded[id] ? '' : ' hidden') + '>' +
      renderProfile(item) +
      '<div class="detail-block">' +
        '<h4>' + LHT.esc(LHT.t('con.prereq')) + '</h4>' +
        '<p>' + LHT.pick(item.prereq) + '</p>' +
      '</div>' +
      '<div class="detail-block">' +
        '<h4>' + LHT.esc(LHT.t('con.format')) + '</h4>' +
        '<p>' + LHT.pick(item.format) + '</p>' +
      '</div>' +
      '<div class="detail-block">' +
        '<h4>' + LHT.esc(LHT.t('con.skills')) + '</h4>' +
        '<div class="tag-row">' + skills + '</div>' +
      '</div>' +
      '<div class="detail-block">' +
        '<h4>' + LHT.esc(LHT.t('con.prep')) + '</h4>' +
        '<ol class="prep-list">' + prep + '</ol>' +
      '</div>' +
      '<div class="detail-block">' +
        '<h4>' + LHT.esc(LHT.t('con.tips')) + '</h4>' +
        '<ol class="tip-list">' + tips + '</ol>' +
      '</div>' +
      '<div class="detail-block detail-experience">' +
        '<h4>' + LHT.esc(LHT.t('con.experience')) + '</h4>' +
        '<p>' + LHT.pick(item.experience) + '</p>' +
      '</div>' +
    '</div>';
  }

  function renderCard(item) {
    var starred = isStarred(item.id);
    var open = !!expanded[item.id];
    var starLabel = LHT.t(starred ? 'con.unstar' : 'con.star');

    return '<article class="contest-card' + (starred ? ' is-starred' : '') + (open ? ' is-open' : '') +
        '" id="c-' + LHT.esc(item.id) + '" data-id="' + LHT.esc(item.id) + '">' +
      '<div class="contest-head">' +
        '<span class="contest-mark" aria-hidden="true">' + LHT.esc(item.abbr) + '</span>' +
        '<div class="contest-title">' +
          '<h3>' + LHT.pick(item.name) + '</h3>' +
        '</div>' +
        '<button type="button" class="contest-star" data-star="' + LHT.esc(item.id) + '"' +
          ' aria-pressed="' + (starred ? 'true' : 'false') + '"' +
          ' aria-label="' + LHT.esc(starLabel) + '" title="' + LHT.esc(starLabel) + '">' +
          (starred ? '★' : '☆') +
        '</button>' +
      '</div>' +
      '<div class="contest-tags">' +
        '<span class="badge badge-accent">' + catText(item.cat) + '</span>' +
        '<span class="badge">' + LHT.esc(stageText(item.stage)) + '</span>' +
        '<span class="badge badge-gold">' + LHT.esc(levelText(item.level)) + '</span>' +
      '</div>' +
      '<p class="contest-summary">' + LHT.pick(item.summary) + '</p>' +
      '<div class="contest-season">' +
        '<div class="season-line"><span class="k">' + LHT.esc(LHT.t('con.season')) + '</span>' +
          '<span class="season-text">' + LHT.pick(item.season) + '</span></div>' +
        monthStrip(item) +
        '<div class="contest-plan">' +
          '<span><b>' + LHT.esc(LHT.t('con.prepWeeks')) + '</b> ' + compact(item.prepWeeks) + '</span>' +
          '<span><b>' + LHT.esc(LHT.t('con.weekly')) + '</b> ' + compact(item.weekly) + '</span>' +
        '</div>' +
      '</div>' +
      renderMore(item) +
      '<div class="contest-foot">' +
        '<div class="contest-links">' + renderLinks(item) + '</div>' +
        '<button type="button" class="btn btn-sm btn-ghost contest-toggle"' +
          ' data-toggle="' + LHT.esc(item.id) + '"' +
          ' aria-expanded="' + (open ? 'true' : 'false') + '"' +
          ' aria-controls="more-' + LHT.esc(item.id) + '">' +
          LHT.esc(open ? LHT.t('con.hide') : LHT.t('con.details')) +
          ' <span aria-hidden="true">' + (open ? '⌃' : '⌄') + '</span>' +
        '</button>' +
      '</div>' +
    '</article>';
  }

  function renderPaths() {
    var byId = {};
    activeContests().forEach(function (item) { byId[item.id] = item; });

    els.paths.innerHTML = activePaths().map(function (path, index) {
      var steps = (path.steps || []).filter(function (id) { return byId[id]; }).map(function (id, i, list) {
        var item = byId[id];
        var arrow = i < list.length - 1 ? '<span class="path-arrow" aria-hidden="true">→</span>' : '';
        return '<button type="button" class="path-chip" data-path-step="' + LHT.esc(id) + '">' +
          '<span class="path-chip-abbr">' + LHT.esc(item.abbr) + '</span>' +
          '<span class="path-chip-name">' + nameText(item) + '</span>' +
        '</button>' + arrow;
      }).join('');

      return '<article class="path-card">' +
        '<div class="path-head">' +
          '<span class="path-num">' + String(index + 1).padStart(2, '0') + '</span>' +
          '<h3>' + LHT.pick(path.title) + '</h3>' +
        '</div>' +
        '<p>' + LHT.pick(path.note) + '</p>' +
        '<div class="path-steps">' + steps + '</div>' +
      '</article>';
    }).join('');
  }

  function renderYears() {
    var byId = {};
    activeContests().forEach(function (item) { byId[item.id] = item; });

    els.years.innerHTML = activeYears().map(function (year, index) {
      var actions = (year.actions || []).map(function (action) {
        return '<li>' + LHT.pick(action) + '</li>';
      }).join('');
      var contests = (year.contests || []).filter(function (id) { return byId[id]; }).map(function (id) {
        var item = byId[id];
        return '<button type="button" class="year-chip" data-year-contest="' + LHT.esc(id) + '">' +
          '<span class="year-chip-abbr">' + LHT.esc(item.abbr) + '</span>' +
          '<span class="year-chip-name">' + nameText(item) + '</span>' +
        '</button>';
      }).join('');

      return '<article class="year-card">' +
        '<div class="year-head">' +
          '<span class="year-num">' + String(index + 1).padStart(2, '0') + '</span>' +
          '<div>' +
            '<h3>' + LHT.pick(year.label) + '</h3>' +
            '<p class="year-focus">' + LHT.pick(year.focus) + '</p>' +
          '</div>' +
        '</div>' +
        '<ol class="year-actions">' + actions + '</ol>' +
        '<div class="year-contests">' + contests + '</div>' +
        '<p class="year-output"><span class="k">' + LHT.esc(LHT.t('con.output')) + '</span>' +
          LHT.pick(year.output) + '</p>' +
      '</article>';
    }).join('');
  }

  function renderGuides() {
    els.guides.innerHTML = GUIDES.map(function (guide, index) {
      return '<article class="guide-card">' +
        '<div class="guide-head">' +
          '<span class="guide-num">' + String(index + 1).padStart(2, '0') + '</span>' +
          '<h3>' + LHT.pick(guide.title) + '</h3>' +
        '</div>' +
        '<p>' + LHT.pick(guide.body) + '</p>' +
      '</article>';
    }).join('');
  }

  function renderStarsButton() {
    els.stars.innerHTML = '<span>' + LHT.esc(LHT.t('con.starsOnly')) + '</span>' +
      '<span class="count-pill">' + stars.length + '</span>';
    els.stars.setAttribute('aria-pressed', state.starsOnly ? 'true' : 'false');
  }

  function render() {
    var list = activeContests();
    if (state.cat !== 'all' && !list.some(function (item) { return item.cat === state.cat; })) {
      state.cat = 'all';
    }
    if (state.stage !== 'all' && !list.some(function (item) { return item.stage === state.stage; })) {
      state.stage = 'all';
    }
    if (state.level !== 'all' && !list.some(function (item) { return String(item.level) === String(state.level); })) {
      state.level = 'all';
    }
    var items = sorted(list.filter(matches));
    els.count.textContent = items.length + ' ' + LHT.t('con.count') +
      (items.length === list.length ? '' : ' / ' + list.length);
    els.grid.innerHTML = items.length
      ? items.map(renderCard).join('')
      : '<div class="empty-state" style="grid-column:1/-1">' + LHT.esc(LHT.t('con.none')) + '</div>';
    renderCats();
    renderStarsButton();
    syncSelects();
  }

  function fillSelect(select, options, current) {
    select.innerHTML = options.map(function (option) {
      return '<option value="' + LHT.esc(option.value) + '"' +
        (String(option.value) === String(current) ? ' selected' : '') + '>' +
        LHT.esc(option.label) + '</option>';
    }).join('');
  }

  function syncSelects() {
    var list = activeContests();
    fillSelect(els.stageSel, [{ value: 'all', label: LHT.t('con.allStages') }].concat(
      STAGES.filter(function (id) {
        return list.some(function (item) { return item.stage === id; });
      }).map(function (id) {
        return { value: id, label: stageText(id) };
      })
    ), state.stage);

    fillSelect(els.levelSel, [
      { value: 'all', label: LHT.t('con.allLevels') },
      { value: 1, label: 'L1 · ' + LHT.t('con.level1') },
      { value: 2, label: 'L2 · ' + LHT.t('con.level2') },
      { value: 3, label: 'L3 · ' + LHT.t('con.level3') }
    ], state.level);

    fillSelect(els.sortSel, [
      { value: 'default', label: LHT.t('con.sortDefault') },
      { value: 'season', label: LHT.t('con.sortSeason') },
      { value: 'level', label: LHT.t('con.sortLevel') },
      { value: 'name', label: LHT.t('con.sortName') }
    ], state.sort);
  }

  function setExpanded(id, open) {
    var card = document.getElementById('c-' + id);
    if (!card) return;
    var more = document.getElementById('more-' + id);
    var toggle = card.querySelector('[data-toggle]');
    if (!more || !toggle) return;
    expanded[id] = open;
    card.classList.toggle('is-open', open);
    if (open) more.removeAttribute('hidden');
    else more.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.innerHTML = LHT.esc(open ? LHT.t('con.hide') : LHT.t('con.details')) +
      ' <span aria-hidden="true">' + (open ? '⌃' : '⌄') + '</span>';
  }

  function focusContest(id) {
    state.query = '';
    state.cat = 'all';
    state.stage = 'all';
    state.level = 'all';
    state.starsOnly = false;
    if (els.search) els.search.value = '';
    render();
    setExpanded(id, true);
    var card = document.getElementById('c-' + id);
    if (!card) return;
    card.classList.add('is-flash');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(function () { card.classList.remove('is-flash'); }, 1400);
  }

  function openFromHash() {
    var match = /^#c-([a-z0-9-]+)$/i.exec(window.location.hash || '');
    if (!match) return;
    var id = match[1];
    var known = activeContests().some(function (item) { return item.id === id; });
    if (!known) return;
    setExpanded(id, true);
    var card = document.getElementById('c-' + id);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function boot() {
    els = {
      search: LHT.$('#con-search'),
      stageSel: LHT.$('#con-stage'),
      levelSel: LHT.$('#con-level'),
      sortSel: LHT.$('#con-sort'),
      cats: LHT.$('#con-cats'),
      grid: LHT.$('#con-grid'),
      count: LHT.$('#con-count'),
      clear: LHT.$('#con-clear'),
      stars: LHT.$('#con-stars'),
      paths: LHT.$('#con-paths'),
      years: LHT.$('#con-years'),
      guides: LHT.$('#con-guides')
    };

    els.search.addEventListener('input', LHT.debounce(function () {
      state.query = els.search.value;
      render();
    }, 140));

    els.stageSel.addEventListener('change', function () {
      state.stage = els.stageSel.value;
      render();
    });
    els.levelSel.addEventListener('change', function () {
      state.level = els.levelSel.value;
      render();
    });
    els.sortSel.addEventListener('change', function () {
      state.sort = els.sortSel.value;
      render();
    });

    els.stars.addEventListener('click', function () {
      state.starsOnly = !state.starsOnly;
      render();
    });

    els.clear.addEventListener('click', function () {
      state.query = '';
      state.cat = 'all';
      state.stage = 'all';
      state.level = 'all';
      state.sort = 'default';
      state.starsOnly = false;
      els.search.value = '';
      render();
    });

    els.grid.addEventListener('click', function (event) {
      var star = event.target.closest('[data-star]');
      if (star) {
        var starId = star.getAttribute('data-star');
        var index = stars.indexOf(starId);
        if (index >= 0) stars.splice(index, 1);
        else stars.push(starId);
        saveStars();
        render();
        var again = els.grid.querySelector('[data-star="' + starId + '"]');
        if (again) again.focus();
        return;
      }

      var toggle = event.target.closest('[data-toggle]');
      if (toggle) {
        var id = toggle.getAttribute('data-toggle');
        setExpanded(id, !expanded[id]);
      }
    });

    els.paths.addEventListener('click', function (event) {
      var step = event.target.closest('[data-path-step]');
      if (step) focusContest(step.getAttribute('data-path-step'));
    });

    els.years.addEventListener('click', function (event) {
      var chip = event.target.closest('[data-year-contest]');
      if (chip) focusContest(chip.getAttribute('data-year-contest'));
    });

    render();
    renderPaths();
    renderYears();
    renderGuides();
    openFromHash();
    window.addEventListener('hashchange', openFromHash);

    var previous = LHT.onLangChange;
    LHT.onLangChange = function (lang) {
      if (typeof previous === 'function') previous(lang);
      render();
      renderPaths();
      renderYears();
      renderGuides();
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
