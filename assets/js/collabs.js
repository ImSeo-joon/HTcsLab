/* ============================================================
   collabs.js — 高校课题组 / 项目组公开信息索引
   搜索、地区/方向/阶段/类型筛选、导师速览、详情展开
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var ALL = window.LHT_COLLABS || [];
  var REGIONS = window.LHT_COLLAB_REGIONS || [];
  var FIELDS = window.LHT_COLLAB_FIELDS || [];
  var LEVELS = window.LHT_COLLAB_LEVELS || [];
  var TYPES = window.LHT_COLLAB_TYPES || [];

  var TEMPLATES = {
    zh: [
      '论文标题：',
      '会议/期刊与年份：',
      '问题：这篇论文想解决什么？',
      '核心方法：一句话说清。',
      '数据与基线：',
      '主要结果：',
      '局限与失败案例：',
      '我能复现的部分：',
      '我想请教的问题：'
    ].join('\n'),
    en: [
      'Title:',
      'Venue and year:',
      'Problem: what does this paper try to solve?',
      'Core method: one sentence.',
      'Data and baselines:',
      'Main results:',
      'Limitations and failure cases:',
      'What I can reproduce:',
      'Question to ask:'
    ].join('\n'),
    fr: [
      'Titre :',
      'Conférence/revue et année :',
      'Problème : que cherche à résoudre l’article ?',
      'Méthode principale : en une phrase.',
      'Données et baselines :',
      'Résultats principaux :',
      'Limites et cas d’échec :',
      'Ce que je peux reproduire :',
      'Question à poser :'
    ].join('\n')
  };

  var state = {
    query: '',
    region: 'all',
    field: 'all',
    level: 'all',
    type: 'all',
    tier: 'all',
    sort: 'default'
  };

  var expanded = {};
  var els = {};

  function labelOf(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return LHT.lang === 'both'
          ? (list[i].label.zh || list[i].label.en)
          : LHT.pick(list[i].label);
      }
    }
    return id;
  }

  function labelText(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return LHT.pickText(list[i].label);
    }
    return id;
  }

  function langLabel(code) {
    if (code === 'zh') return LHT.t('res.langZh');
    if (code === 'en') return LHT.t('res.langEn');
    if (code === 'fr') return 'FR';
    if (code === 'ja') return LHT.t('collab.langJa');
    return String(code).toUpperCase();
  }

  function bioExcerpt(bio) {
    if (!bio) return '';
    var text = LHT.lang === 'both'
      ? (bio.zh || bio.en)
      : (LHT.lang === 'fr' ? (bio.fr || bio.en) : (bio.en || bio.zh));
    return LHT.esc(String(text)
      .replace(/^公开资料摘要：\s*/, '')
      .replace(/^Public-profile summary:\s*/, ''));
  }

  function hasAny(list, value) {
    return (list || []).indexOf(value) >= 0;
  }

  function matches(item) {
    if (state.region !== 'all' && item.region !== state.region) return false;
    if (state.field !== 'all' && !hasAny(item.fields, state.field)) return false;
    if (state.level !== 'all' && !hasAny(item.levels, state.level)) return false;
    if (state.type !== 'all' && !hasAny(item.types, state.type)) return false;
    if (state.tier === '985' && item.tier !== '985') return false;
    if (state.tier === '211' && item.tier !== '211') return false;
    if (state.tier === 'other' && item.tier) return false;

    var query = state.query.trim().toLowerCase();
    if (!query) return true;

    var hay = [
      item.institution ? item.institution.zh : '',
      item.institution ? item.institution.en : '',
      item.unit ? item.unit.zh : '',
      item.unit ? item.unit.en : '',
      item.mentor ? item.mentor.name.zh : '',
      item.mentor ? item.mentor.name.en : '',
      item.mentor ? item.mentor.title.zh : '',
      item.mentor ? item.mentor.title.en : '',
      item.mentor ? item.mentor.bio.zh : '',
      item.mentor ? item.mentor.bio.en : '',
      item.project ? item.project.title.zh : '',
      item.project ? item.project.title.en : '',
      item.project ? item.project.summary.zh : '',
      item.project ? item.project.summary.en : '',
      item.project ? item.project.methods.zh : '',
      item.project ? item.project.methods.en : '',
      item.project ? item.project.fit.zh : '',
      item.project ? item.project.fit.en : '',
      labelText(REGIONS, item.region)
    ];
    (item.fields || []).forEach(function (id) { hay.push(labelText(FIELDS, id)); });
    (item.levels || []).forEach(function (id) { hay.push(labelText(LEVELS, id)); });
    (item.types || []).forEach(function (id) { hay.push(labelText(TYPES, id)); });
    return hay.join(' ').toLowerCase().indexOf(query) >= 0;
  }

  function sorted(items) {
    var list = items.slice();
    if (state.sort === 'name') {
      list.sort(function (a, b) {
        return LHT.pickText(a.institution).localeCompare(LHT.pickText(b.institution));
      });
    } else if (state.sort === 'region') {
      list.sort(function (a, b) {
        var ra = labelText(REGIONS, a.region);
        var rb = labelText(REGIONS, b.region);
        return ra.localeCompare(rb) || LHT.pickText(a.institution).localeCompare(LHT.pickText(b.institution));
      });
    }
    return list;
  }

  function fillSelect(select, options, current) {
    select.innerHTML = options.map(function (option) {
      return '<option value="' + LHT.esc(option.value) + '"' +
        (String(option.value) === String(current) ? ' selected' : '') + '>' +
        LHT.esc(option.label) + '</option>';
    }).join('');
  }

  function syncSelects() {
    fillSelect(els.regionSel, [{ value: 'all', label: LHT.t('collab.allRegions') }].concat(
      REGIONS.filter(function (region) {
        return ALL.some(function (item) { return item.region === region.id; });
      }).map(function (region) {
        return { value: region.id, label: labelOf(REGIONS, region.id) };
      })
    ), state.region);

    fillSelect(els.fieldSel, [{ value: 'all', label: LHT.t('collab.allFields') }].concat(
      FIELDS.filter(function (field) {
        return ALL.some(function (item) { return hasAny(item.fields, field.id); });
      }).map(function (field) {
        return { value: field.id, label: labelOf(FIELDS, field.id) };
      })
    ), state.field);

    fillSelect(els.levelSel, [{ value: 'all', label: LHT.t('collab.allLevels') }].concat(
      LEVELS.filter(function (level) {
        return ALL.some(function (item) { return hasAny(item.levels, level.id); });
      }).map(function (level) {
        return { value: level.id, label: labelOf(LEVELS, level.id) };
      })
    ), state.level);

    fillSelect(els.typeSel, [{ value: 'all', label: LHT.t('collab.allTypes') }].concat(
      TYPES.filter(function (type) {
        return ALL.some(function (item) { return hasAny(item.types, type.id); });
      }).map(function (type) {
        return { value: type.id, label: labelOf(TYPES, type.id) };
      })
    ), state.type);

    fillSelect(els.tierSel, [
      { value: 'all', label: LHT.t('collab.allTiers') },
      { value: '985', label: '985' },
      { value: '211', label: '211' },
      { value: 'other', label: LHT.t('collab.tierOther') }
    ], state.tier);

    fillSelect(els.sortSel, [
      { value: 'default', label: LHT.t('collab.sortDefault') },
      { value: 'name', label: LHT.t('collab.sortName') },
      { value: 'region', label: LHT.t('collab.sortRegion') }
    ], state.sort);
  }

  function renderMentors() {
    var mentors = ALL.filter(function (item) { return item.mentor && item.mentor.highlight; });
    els.mentors.innerHTML = mentors.map(function (item) {
      return '<button type="button" class="mentor-card" data-mentor-target="' + LHT.esc(item.id) + '">' +
        '<span class="mentor-mark">' + LHT.esc(item.mentor.initials) + '</span>' +
        '<span class="mentor-body">' +
          '<span class="mentor-name">' + LHT.pick(item.mentor.name) + '</span>' +
          '<span class="mentor-title">' + LHT.pick(item.mentor.title) + '</span>' +
          '<span class="mentor-unit">' + LHT.pick(item.institution) + ' · ' + LHT.pick(item.unit) + '</span>' +
          '<span class="mentor-bio">' + bioExcerpt(item.mentor.bio) + '</span>' +
          '<span class="mentor-project">' + LHT.pick(item.project.title) + ' →</span>' +
        '</span>' +
      '</button>';
    }).join('');
  }

  function renderTemplate() {
    if (!els.template) return;
    var lang = LHT.lang === 'both' ? 'zh' : (LHT.lang === 'fr' ? 'fr' : 'en');
    els.template.textContent = TEMPLATES[lang] || TEMPLATES.en;
  }

  function badgeList(list, ids, cls) {
    return (ids || []).map(function (id) {
      return '<span class="badge ' + (cls || '') + '">' + LHT.esc(labelOf(list, id)) + '</span>';
    }).join('');
  }

  function renderCard(item) {
    var open = !!expanded[item.id];
    var mentor = item.mentor;
    var sourceLabel = item.source && item.source.label ? LHT.pick(item.source.label) : LHT.t('collab.sourcePage');
    var applyLabel = item.apply && item.apply.label ? LHT.pick(item.apply.label) : LHT.t('collab.officialApply');

    return '<article class="collab-card" id="collab-' + LHT.esc(item.id) + '" data-id="' + LHT.esc(item.id) + '">' +
      '<div class="collab-card-head">' +
        '<span class="collab-mark" aria-hidden="true">' + LHT.esc(mentor.initials) + '</span>' +
        '<div class="collab-card-title">' +
          '<h3>' + LHT.pick(item.institution) + '</h3>' +
          '<p>' + LHT.pick(item.unit) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="collab-meta">' +
        '<span class="badge">' + LHT.esc(labelOf(REGIONS, item.region)) + '</span>' +
        (item.tier ? '<span class="badge badge-gold">' + LHT.esc(item.tier) + '</span>' : '') +
        (item.kind ? '<span class="badge badge-teal">' + LHT.esc(LHT.t('collab.kind' + item.kind.charAt(0).toUpperCase() + item.kind.slice(1))) + '</span>' : '') +
        '<span class="badge badge-warn">' + LHT.esc(LHT.t('collab.statusCheck')) + '</span>' +
      '</div>' +
      '<div class="collab-tags">' +
        badgeList(FIELDS, item.fields, 'badge-accent') +
        badgeList(LEVELS, item.levels, '') +
        badgeList(TYPES, item.types, '') +
        (item.language || []).map(function (code) {
          return '<span class="badge badge-teal">' + LHT.esc(langLabel(code)) + '</span>';
        }).join('') +
      '</div>' +
      '<h4 class="collab-project">' + LHT.pick(item.project.title) + '</h4>' +
      '<p class="collab-summary">' + LHT.pick(item.project.summary) + '</p>' +
      '<div class="collab-mentor-line">' +
        '<span class="k">' + LHT.esc(LHT.t('collab.mentorLabel')) + '</span>' +
        '<span class="v">' + LHT.pick(mentor.name) + ' · ' + LHT.pick(mentor.title) + '</span>' +
      '</div>' +
      '<div class="collab-more" id="collab-more-' + LHT.esc(item.id) + '"' + (open ? '' : ' hidden') + '>' +
        '<div class="detail-block"><h4>' + LHT.esc(LHT.t('collab.methods')) + '</h4>' +
          '<p>' + LHT.pick(item.project.methods) + '</p></div>' +
        '<div class="detail-block"><h4>' + LHT.esc(LHT.t('collab.fit')) + '</h4>' +
          '<p>' + LHT.pick(item.project.fit) + '</p></div>' +
        '<div class="detail-block"><h4>' + LHT.esc(LHT.t('collab.mentorBio')) + '</h4>' +
          '<p>' + LHT.pick(mentor.bio) + '</p>' +
          '<a class="detail-link" href="' + LHT.esc(mentor.link) + '" target="_blank" rel="noopener noreferrer">' +
            LHT.esc(LHT.t('collab.mentorPage')) + ' ↗</a></div>' +
        '<div class="detail-block"><h4>' + LHT.esc(LHT.t('collab.applyTitle')) + '</h4>' +
          '<p>' + LHT.pick(item.apply.note) + '</p>' +
          '<a class="btn btn-sm btn-primary" href="' + LHT.esc(item.apply.url) + '" target="_blank" rel="noopener noreferrer">' +
            applyLabel + ' ↗</a></div>' +
        '<div class="detail-block"><h4>' + LHT.esc(LHT.t('collab.sourceTitle')) + '</h4>' +
          '<p>' + sourceLabel + ' · ' + LHT.esc(LHT.t('collab.updatedLabel')) + ' ' + LHT.esc(item.updated) +
            ' · ' + LHT.esc(LHT.t('collab.statusCheck')) + '</p>' +
          '<a class="detail-link" href="' + LHT.esc(item.source.url) + '" target="_blank" rel="noopener noreferrer">' +
            LHT.esc(LHT.t('collab.sourcePage')) + ' ↗</a></div>' +
      '</div>' +
      '<div class="collab-card-foot">' +
        '<div class="collab-links">' +
          '<a class="btn btn-sm btn-primary" href="' + LHT.esc(item.apply.url) + '" target="_blank" rel="noopener noreferrer">' +
            LHT.esc(LHT.t('collab.officialApply')) + ' ↗</a>' +
          '<a class="btn btn-sm btn-ghost" href="' + LHT.esc(mentor.link) + '" target="_blank" rel="noopener noreferrer">' +
            LHT.esc(LHT.t('collab.mentorPage')) + ' ↗</a>' +
        '</div>' +
        '<button type="button" class="btn btn-sm btn-ghost collab-toggle" data-toggle="' + LHT.esc(item.id) + '"' +
          ' aria-expanded="' + (open ? 'true' : 'false') + '" aria-controls="collab-more-' + LHT.esc(item.id) + '">' +
          LHT.esc(open ? LHT.t('collab.hide') : LHT.t('collab.details')) +
          ' <span aria-hidden="true">' + (open ? '⌃' : '⌄') + '</span></button>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var items = sorted(ALL.filter(matches));
    els.count.textContent = items.length + ' ' + LHT.t('collab.count') +
      (items.length === ALL.length ? '' : ' / ' + ALL.length);
    els.grid.innerHTML = items.length
      ? items.map(renderCard).join('')
      : '<div class="empty-state" style="grid-column:1/-1">' + LHT.esc(LHT.t('collab.none')) + '</div>';
    syncSelects();
  }

  function setExpanded(id, open) {
    var card = document.getElementById('collab-' + id);
    if (!card) return;
    var more = document.getElementById('collab-more-' + id);
    var toggle = card.querySelector('[data-toggle]');
    if (!more || !toggle) return;
    expanded[id] = open;
    if (open) more.removeAttribute('hidden');
    else more.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.innerHTML = LHT.esc(open ? LHT.t('collab.hide') : LHT.t('collab.details')) +
      ' <span aria-hidden="true">' + (open ? '⌃' : '⌄') + '</span>';
  }

  function focusCollab(id) {
    state.query = '';
    state.region = 'all';
    state.field = 'all';
    state.level = 'all';
    state.type = 'all';
    state.tier = 'all';
    els.search.value = '';
    render();
    setExpanded(id, true);
    var card = document.getElementById('collab-' + id);
    if (!card) return;
    card.classList.add('is-flash');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(function () { card.classList.remove('is-flash'); }, 1400);
  }

  function boot() {
    els = {
      search: LHT.$('#collab-search'),
      regionSel: LHT.$('#collab-region'),
      fieldSel: LHT.$('#collab-field'),
      levelSel: LHT.$('#collab-level'),
      typeSel: LHT.$('#collab-type'),
      tierSel: LHT.$('#collab-tier'),
      sortSel: LHT.$('#collab-sort'),
      grid: LHT.$('#collab-grid'),
      count: LHT.$('#collab-count'),
      clear: LHT.$('#collab-clear'),
      mentors: LHT.$('#collab-mentors'),
      template: LHT.$('#collab-template'),
      copyTemplate: LHT.$('#collab-copy-template')
    };

    els.search.addEventListener('input', LHT.debounce(function () {
      state.query = els.search.value;
      render();
    }, 140));
    els.regionSel.addEventListener('change', function () { state.region = els.regionSel.value; render(); });
    els.fieldSel.addEventListener('change', function () { state.field = els.fieldSel.value; render(); });
    els.levelSel.addEventListener('change', function () { state.level = els.levelSel.value; render(); });
    els.typeSel.addEventListener('change', function () { state.type = els.typeSel.value; render(); });
    els.tierSel.addEventListener('change', function () { state.tier = els.tierSel.value; render(); });
    els.sortSel.addEventListener('change', function () { state.sort = els.sortSel.value; render(); });

    els.clear.addEventListener('click', function () {
      state.query = '';
      state.region = 'all';
      state.field = 'all';
      state.level = 'all';
      state.type = 'all';
      state.tier = 'all';
      state.sort = 'default';
      els.search.value = '';
      render();
    });

    els.grid.addEventListener('click', function (event) {
      var toggle = event.target.closest('[data-toggle]');
      if (toggle) {
        var id = toggle.getAttribute('data-toggle');
        setExpanded(id, !expanded[id]);
      }
    });

    els.mentors.addEventListener('click', function (event) {
      var button = event.target.closest('[data-mentor-target]');
      if (button) focusCollab(button.getAttribute('data-mentor-target'));
    });

    els.copyTemplate.addEventListener('click', function () {
      LHT.copyText(els.template.textContent);
    });

    renderMentors();
    renderTemplate();
    render();

    var previous = LHT.onLangChange;
    LHT.onLangChange = function (lang) {
      if (typeof previous === 'function') previous(lang);
      renderMentors();
      renderTemplate();
      render();
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
