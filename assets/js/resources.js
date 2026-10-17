/* ============================================================
   resources.js — 资料库控制器：搜索、分类、类型、难度、语言、排序
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var ALL = window.LHT_RESOURCES || [];
  var CATS = window.LHT_RES_CATEGORIES || [];
  var TYPES = window.LHT_RES_TYPES || {};

  var state = {
    query: '',
    cat: 'all',
    type: 'all',
    level: 'all',
    lang: 'all',
    sort: 'default'
  };

  var els = {};

  function catLabel(id) {
    for (var i = 0; i < CATS.length; i++) {
      if (CATS[i].id === id) return LHT.pick(CATS[i].label);
    }
    return LHT.esc(id);
  }

  function typeLabel(id) {
    return TYPES[id] ? LHT.pick(TYPES[id]) : LHT.esc(id);
  }

  function levelLabel(level, short) {
    var key = 'res.level' + level;
    if (short) {
      return level === 1 ? 'L1' : level === 2 ? 'L2' : 'L3';
    }
    return LHT.t(key);
  }

  function langLabel(code) {
    if (code === 'zh') return LHT.t('res.langZh');
    if (code === 'en') return LHT.t('res.langEn');
    return LHT.t('res.langBoth');
  }

  function matches(item) {
    if (state.cat !== 'all' && item.cat !== state.cat) return false;
    if (state.type !== 'all' && item.type !== state.type) return false;
    if (state.level !== 'all' && String(item.level) !== String(state.level)) return false;
    if (state.lang !== 'all' && item.lang !== state.lang) return false;
    var q = state.query.trim().toLowerCase();
    if (!q) return true;
    var hay = [
      item.id,
      item.title ? item.title.zh || '' : '',
      item.title ? item.title.en || '' : '',
      item.author || '',
      (item.tags || []).join(' '),
      item.note ? (item.note.zh || '') : '',
      item.note ? (item.note.en || '') : ''
    ].join(' ').toLowerCase();
    return hay.indexOf(q) >= 0;
  }

  function sorted(items) {
    var list = items.slice();
    if (state.sort === 'level') {
      list.sort(function (a, b) { return a.level - b.level || String(a.id).localeCompare(String(b.id)); });
    } else if (state.sort === 'name') {
      list.sort(function (a, b) {
        var sa = (a.title && (a.title.zh || a.title.en)) || '';
        var sb = (b.title && (b.title.zh || b.title.en)) || '';
        return sa.localeCompare(sb);
      });
    }
    return list;
  }

  function renderCats() {
    els.catStrip.innerHTML = '';
    var chipAll = LHT.el('button', {
      type: 'button', class: 'chip', text: LHT.t('res.allCats'),
      'aria-pressed': state.cat === 'all' ? 'true' : 'false'
    });
    chipAll.addEventListener('click', function () { state.cat = 'all'; render(); });
    els.catStrip.appendChild(chipAll);

    CATS.forEach(function (cat) {
      var count = ALL.filter(function (item) { return item.cat === cat.id; }).length;
      if (!count) return;
      var chip = LHT.el('button', {
        type: 'button', class: 'chip',
        html: LHT.pick(cat.label) + ' <span class="dim">' + count + '</span>',
        'aria-pressed': state.cat === cat.id ? 'true' : 'false'
      });
      chip.addEventListener('click', function () { state.cat = cat.id; render(); });
      els.catStrip.appendChild(chip);
    });
  }

  function renderCard(item) {
    var badges = '<span class="badge badge-accent">' + typeLabel(item.type) + '</span>' +
      '<span class="badge">' + LHT.esc(levelLabel(item.level)) + '</span>' +
      '<span class="badge">' + LHT.esc(langLabel(item.lang)) + '</span>' +
      '<span class="badge ' + (item.free ? 'badge-ok' : 'badge-warn') + '">' +
        LHT.esc(LHT.t(item.free ? 'res.free' : 'res.paid')) + '</span>';

    var links = '<a class="btn btn-sm" href="' + LHT.esc(item.url) + '" target="_blank" rel="noopener noreferrer">' +
      LHT.esc(LHT.t('common.open')) + ' ↗</a>';
    (item.alt || []).forEach(function (extra) {
      links += '<a class="btn btn-sm btn-ghost" href="' + LHT.esc(extra.url) + '" target="_blank" rel="noopener noreferrer">' +
        LHT.esc(extra.label) + '</a>';
    });

    return '<article class="res-card">' +
      '<div class="res-meta">' + badges + '</div>' +
      '<h3>' + LHT.pick(item.title) + '</h3>' +
      '<div class="res-note">' + LHT.pick(item.note) + '</div>' +
      '<div class="res-src">' + LHT.esc(item.author) + ' · ' + catLabel(item.cat) + '</div>' +
      '<div class="res-foot">' + links +
        '<span class="tag-row">' + (item.tags || []).map(function (t) {
          return '<span class="badge">' + LHT.esc(t) + '</span>';
        }).join('') + '</span>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var items = sorted(ALL.filter(matches));
    els.resCount.textContent = items.length + ' ' + LHT.t('res.count') +
      (items.length === ALL.length ? '' : ' / ' + ALL.length);
    els.resGrid.innerHTML = items.length
      ? items.map(renderCard).join('')
      : '<div class="empty-state" style="grid-column:1/-1">' + LHT.esc(LHT.t('res.none')) + '</div>';
    renderCats();
    syncSelects();
  }

  function fillSelect(select, options, current) {
    select.innerHTML = options.map(function (opt) {
      return '<option value="' + LHT.esc(opt.value) + '"' + (String(opt.value) === String(current) ? ' selected' : '') + '>' +
        LHT.esc(opt.label) + '</option>';
    }).join('');
  }

  function syncSelects() {
    fillSelect(els.typeSel, [{ value: 'all', label: LHT.t('res.allTypes') }].concat(
      Object.keys(TYPES).filter(function (key) {
        return ALL.some(function (item) { return item.type === key; });
      }).map(function (key) { return { value: key, label: LHT.pick(TYPES[key]) }; })
    ), state.type);

    fillSelect(els.levelSel, [
      { value: 'all', label: LHT.t('res.allLevels') },
      { value: 1, label: LHT.t('res.level1') },
      { value: 2, label: LHT.t('res.level2') },
      { value: 3, label: LHT.t('res.level3') }
    ], state.level);

    fillSelect(els.langSel, [
      { value: 'all', label: LHT.t('res.allLangs') },
      { value: 'zh', label: LHT.t('res.langZh') },
      { value: 'en', label: LHT.t('res.langEn') },
      { value: 'both', label: LHT.t('res.langBoth') }
    ], state.lang);

    fillSelect(els.sortSel, [
      { value: 'default', label: LHT.t('res.sortDefault') },
      { value: 'level', label: LHT.t('res.sortLevel') },
      { value: 'name', label: LHT.t('res.sortName') }
    ], state.sort);
  }

  function boot() {
    els = {
      search: LHT.$('#res-search'),
      typeSel: LHT.$('#res-type'),
      levelSel: LHT.$('#res-level'),
      langSel: LHT.$('#res-lang'),
      sortSel: LHT.$('#res-sort'),
      catStrip: LHT.$('#cat-strip'),
      resGrid: LHT.$('#res-grid'),
      resCount: LHT.$('#res-count'),
      clear: LHT.$('#res-clear')
    };

    els.search.addEventListener('input', LHT.debounce(function () {
      state.query = els.search.value;
      render();
    }, 140));

    els.typeSel.addEventListener('change', function () { state.type = els.typeSel.value; render(); });
    els.levelSel.addEventListener('change', function () { state.level = els.levelSel.value; render(); });
    els.langSel.addEventListener('change', function () { state.lang = els.langSel.value; render(); });
    els.sortSel.addEventListener('change', function () { state.sort = els.sortSel.value; render(); });

    els.clear.addEventListener('click', function () {
      state.query = '';
      state.cat = 'all';
      state.type = 'all';
      state.level = 'all';
      state.lang = 'all';
      state.sort = 'default';
      els.search.value = '';
      render();
    });

    render();

    var previous = LHT.onLangChange;
    LHT.onLangChange = function (lang) {
      if (typeof previous === 'function') previous(lang);
      render();
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
