/* ============================================================
   practice.js — 刷题台控制器
   题目列表 / 筛选 · 题目渲染 · 编辑器（CodeMirror 渐进增强）
   运行测试用例 · 调试预览 · 变量快照 · 草稿本地保存
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var PROBLEMS = window.LHT_PROBLEMS || [];
  var TAGS = window.LHT_TAGS || {};
  var GENERIC = window.LHT_GENERIC_TEMPLATES || {};
  var DIFFS = ['easy', 'medium', 'hard'];

  /* CodeMirror 来源，按顺序尝试：cdnjs 通常可达，jsdelivr 备用。
     编辑器本身只是渐进增强，全部加载失败时会退回纯文本 textarea。 */
  var CM_SOURCES = [
    {
      core: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.js',
      style: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.css',
      asset: function (path) {
        return 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/' + path;
      }
    },
    {
      core: 'https://fastly.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js',
      style: 'https://fastly.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css',
      asset: function (path) {
        return 'https://fastly.jsdelivr.net/npm/codemirror@5.65.16/' + path;
      }
    }
  ];
  var CM_MODES = [
    'addon/mode/simple.js',          // go 模式依赖它，必须最先加载
    'mode/clike/clike.js',
    'mode/python/python.js',
    'mode/javascript/javascript.js',
    'mode/xml/xml.js',
    'mode/css/css.js',
    'mode/htmlmixed/htmlmixed.js',   // php 模式依赖 htmlmixed → xml / css
    'mode/go/go.js',
    'mode/rust/rust.js',
    'mode/php/php.js',
    'mode/ruby/ruby.js',
    'addon/edit/closebrackets.js',
    'addon/edit/matchbrackets.js'
  ];

  var state = {
    problemId: PROBLEMS.length ? PROBLEMS[0].id : null,
    lang: LHT.store('lht.practice.lang') || 'javascript',
    query: '',
    diff: 'all',
    tags: [],
    results: null,
    running: false
  };

  var els = {};
  var view = { kind: 'none', ta: null, cm: null };
  var cmPromise = null;

  /* ---------- 数据工具 ---------- */

  function problem() {
    for (var i = 0; i < PROBLEMS.length; i++) {
      if (PROBLEMS[i].id === state.problemId) return PROBLEMS[i];
    }
    return PROBLEMS[0] || null;
  }

  function tagLabel(key) {
    return TAGS[key] ? LHT.pick(TAGS[key]) : LHT.esc(key);
  }

  function diffLabel(d) {
    return LHT.t('practice.' + d);
  }

  function draftKey(id, lang) { return 'lht.draft.' + id + '.' + lang; }

  function loadDraft(id, lang) {
    return LHT.store(draftKey(id, lang));
  }

  function saveDraft() {
    var p = problem();
    if (!p || !view) return;
    var code = getCode();
    if (code === templateFor(p, state.lang)) {
      try { window.localStorage.removeItem(draftKey(p.id, state.lang)); } catch (e) { /* 忽略 */ }
      return;
    }
    LHT.store(draftKey(p.id, state.lang), code);
  }

  /** C 语言的模板与参考解集中在 data/c-track.js，避免散落在题库的每条记录里 */
  function cTrackEntry(problemId) {
    var track = window.LHT_C_TRACK;
    return (track && track[problemId]) ? track[problemId] : null;
  }

  function templateFor(p, lang) {
    if (!p) return '';
    if (p.templates && p.templates[lang]) return p.templates[lang];
    if (lang === 'c') {
      var entry = cTrackEntry(p.id);
      if (entry && entry.template) return entry.template;
    }
    if (lang === 'js' || lang === 'javascript') {
      return p.templates ? p.templates.js : '';
    }
    if (lang === 'py' || lang === 'python') {
      return p.templates ? p.templates.py : '';
    }
    return GENERIC[lang] || '';
  }

  function solutionFor(p, lang) {
    if (!p) return null;
    if (p.solutions && p.solutions[lang]) return p.solutions[lang];
    if (lang === 'javascript') return (p.solutions && p.solutions.js) || null;
    if (lang === 'python') return (p.solutions && p.solutions.py) || null;
    if (lang === 'c') {
      var entry = cTrackEntry(p.id);
      if (entry && entry.solution) return entry.solution;
    }
    return null;
  }

  /* ---------- 编辑器 ---------- */

  function ensureCodeMirror() {
    if (cmPromise) return cmPromise;
    function trySource(index) {
      if (index >= CM_SOURCES.length) return Promise.resolve(null);
      var src = CM_SOURCES[index];
      return LHT.loadStyle(src.style, 'cm-style-' + index)
        .then(function () { return LHT.loadScript(src.core, 'cm-core-' + index); })
        .then(function () {
          return CM_MODES.reduce(function (chain, path) {
            return chain.then(function () {
              return LHT.loadScript(src.asset(path), 'cm-' + index + '-' + path);
            });
          }, Promise.resolve());
        })
        .then(function () { return window.CodeMirror || null; })
        .catch(function () { return trySource(index + 1); });
    }
    cmPromise = trySource(0);
    return cmPromise;
  }

  function getCode() {
    if (view.kind === 'cm') return view.cm.getValue();
    if (view.kind === 'textarea') return view.ta.value;
    return '';
  }

  function setCode(text) {
    if (view.kind === 'cm') {
      view.cm.setValue(text);
    } else if (view.kind === 'textarea') {
      view.ta.value = text;
    }
    saveDraft();
  }

  function editorMode(langId) {
    var lang = LHT.languageById(langId);
    return lang.mode || 'javascript';
  }

  function mountEditor(text) {
    var host = els.editorHost;
    host.innerHTML = '';
    var ta = LHT.el('textarea', {
      class: 'code-fallback',
      spellcheck: 'false',
      autocapitalize: 'off',
      autocomplete: 'off',
      'aria-label': LHT.t('practice.editor')
    });
    ta.value = text;
    host.appendChild(ta);
    view = { kind: 'textarea', ta: ta, cm: null };
    ta.addEventListener('input', saveDraft);

    ensureCodeMirror().then(function (CM) {
      if (!CM || view.kind !== 'textarea') return;
      var current = view.ta.value;
      var holder = LHT.el('div');
      host.innerHTML = '';
      host.appendChild(holder);
      var cm = CM(holder, {
        value: current,
        mode: editorMode(state.lang),
        theme: 'lht',
        lineNumbers: true,
        indentUnit: 2,
        tabSize: 2,
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        viewportMargin: 40,
        lineWrapping: false,
        extraKeys: {
          Tab: function (instance) { instance.replaceSelection('  '); },
          'Ctrl-Enter': runAll,
          'Cmd-Enter': runAll
        }
      });
      cm.on('change', saveDraft);
      view = { kind: 'cm', ta: null, cm: cm };
      refreshEditor();
    });
  }

  function refreshEditor() { if (view.cm) view.cm.refresh(); }

  function setEditorMode() {
    if (view.cm) view.cm.setOption('mode', editorMode(state.lang));
  }

  /* ---------- 筛选 ---------- */

  function filteredProblems() {
    var q = state.query.trim().toLowerCase();
    return PROBLEMS.filter(function (p) {
      if (state.diff !== 'all' && p.difficulty !== state.diff) return false;
      if (state.tags.length) {
        var hit = state.tags.every(function (t) { return (p.tags || []).indexOf(t) >= 0; });
        if (!hit) return false;
      }
      if (!q) return true;
      var haystack = [];
      if (p.title) { haystack.push(p.title.zh || '', p.title.en || ''); }
      (p.tags || []).forEach(function (t) {
        haystack.push(t, TAGS[t] ? TAGS[t].zh : '', TAGS[t] ? TAGS[t].en : '');
      });
      haystack.push(p.id);
      return haystack.join(' ').toLowerCase().indexOf(q) >= 0;
    });
  }

  function renderFilters() {
    var used = {};
    PROBLEMS.forEach(function (p) { (p.tags || []).forEach(function (t) { used[t] = (used[t] || 0) + 1; }); });

    els.diffFilters.innerHTML = '';
    var allChip = LHT.el('button', {
      type: 'button', class: 'chip', text: LHT.t('practice.diffAll'),
      'aria-pressed': state.diff === 'all' ? 'true' : 'false'
    });
    allChip.addEventListener('click', function () { state.diff = 'all'; renderFilters(); renderList(); });
    els.diffFilters.appendChild(allChip);

    DIFFS.forEach(function (d) {
      var count = PROBLEMS.filter(function (p) { return p.difficulty === d; }).length;
      if (!count) return;
      var chip = LHT.el('button', {
        type: 'button', class: 'chip',
        text: diffLabel(d) + ' ' + count,
        'aria-pressed': state.diff === d ? 'true' : 'false'
      });
      chip.addEventListener('click', function () { state.diff = d; renderFilters(); renderList(); });
      els.diffFilters.appendChild(chip);
    });

    els.tagFilters.innerHTML = '';
    Object.keys(used).sort(function (a, b) {
      return used[b] - used[a] || String(a).localeCompare(String(b));
    }).slice(0, 16).forEach(function (key) {
      var chip = LHT.el('button', {
        type: 'button', class: 'chip',
        html: tagLabel(key) + ' <span class="dim">' + used[key] + '</span>',
        'aria-pressed': state.tags.indexOf(key) >= 0 ? 'true' : 'false'
      });
      chip.addEventListener('click', function () {
        var at = state.tags.indexOf(key);
        if (at >= 0) state.tags.splice(at, 1); else state.tags.push(key);
        renderFilters(); renderList();
      });
      els.tagFilters.appendChild(chip);
    });
  }

  /* ---------- 题目列表 ---------- */

  function renderList() {
    var items = filteredProblems();
    els.problemCount.textContent = items.length + ' / ' + PROBLEMS.length;
    els.problemList.innerHTML = '';

    if (!items.length) {
      els.problemList.appendChild(LHT.el('p', { class: 'hint', text: LHT.t('practice.noMatch') }));
      return;
    }

    items.forEach(function (p) {
      var btn = LHT.el('button', {
        type: 'button',
        class: 'problem-item',
        role: 'option',
        'aria-selected': p.id === state.problemId ? 'true' : 'false'
      });
      btn.innerHTML =
        '<span class="problem-item-top">' +
          '<span class="dot dot-' + p.difficulty + '"></span>' +
          '<span class="problem-item-name">' + LHT.pick(p.title) + '</span>' +
        '</span>' +
        '<span class="problem-item-meta">' +
          '<span class="problem-item-tags">' + (p.tags || []).map(tagLabel).join(' · ') + '</span>' +
        '</span>';
      btn.addEventListener('click', function () { selectProblem(p.id); });
      els.problemList.appendChild(btn);
    });
  }

  /* ---------- 题目说明 ---------- */

  function renderStatement() {
    var p = problem();
    if (!p) {
      els.statementBody.innerHTML = '<p class="hint">' + LHT.esc(LHT.t('practice.noMatch')) + '</p>';
      return;
    }

    var html = '';
    html += '<div class="problem-title-row">' +
      '<h2>' + LHT.pick(p.title) + '</h2>' +
      '<span class="badge badge-' + (p.difficulty === 'easy' ? 'ok' : p.difficulty === 'medium' ? 'warn' : 'danger') + '">' +
        diffLabel(p.difficulty) + '</span>' +
      '<span class="tag-row">' + (p.tags || []).map(function (t) {
        return '<span class="badge">' + tagLabel(t) + '</span>';
      }).join('') + '</span>' +
    '</div>';

    if (p.complexity) {
      html += '<p class="tiny dim mono" style="margin:8px 0 14px">' +
        'target · time ' + LHT.esc(p.complexity.time) + ' · space ' + LHT.esc(p.complexity.space) + '</p>';
    }

    html += '<div class="prose">' + LHT.pick(p.statement) + '</div>';

    html += '<div class="io-grid" style="margin-top:16px">' +
      '<div class="io-block"><h4>' + LHT.esc(LHT.t('practice.inputFmt')) + '</h4>' +
        '<div class="muted small">' + LHT.pick(p.input) + '</div></div>' +
      '<div class="io-block"><h4>' + LHT.esc(LHT.t('practice.outputFmt')) + '</h4>' +
        '<div class="muted small">' + LHT.pick(p.output) + '</div></div>' +
    '</div>';

    if (p.samples && p.samples.length) {
      html += '<h4 style="margin:20px 0 8px">' + LHT.esc(LHT.t('practice.samples')) + '</h4>';
      html += '<div class="sample-grid">' + p.samples.map(function (s, i) {
        return '<div class="sample">' +
          '<div><h5>' + LHT.esc(LHT.t('practice.sampleIn')) + ' ' + (i + 1) + '</h5>' +
            '<pre>' + LHT.esc(s.input) + '</pre></div>' +
          '<div><h5>' + LHT.esc(LHT.t('practice.sampleOut')) + ' ' + (i + 1) + '</h5>' +
            '<pre>' + LHT.esc(s.output) + '</pre></div>' +
        '</div>';
      }).join('') + '</div>';
    }

    if (p.hints && p.hints.length) {
      html += '<h4 style="margin:20px 0 8px">' + LHT.esc(LHT.t('practice.hint')) + '</h4>';
      html += '<div class="stack">' + p.hints.map(function (h) {
        return '<p class="note" style="margin:0">' + LHT.pick(h) + '</p>';
      }).join('') + '</div>';
    }

    els.statementBody.innerHTML = html;

    if (p.demoId) {
      els.statementDemo.innerHTML = '<a class="badge badge-accent" href="demos.html#' + LHT.esc(p.demoId) + '">' +
        LHT.esc(LHT.t('practice.demoLink')) + ' →</a>';
    } else {
      els.statementDemo.innerHTML = '';
    }
  }

  /* ---------- 语言与模板 ---------- */

  function renderLangOptions() {
    els.langSelect.innerHTML = LHT.LANGUAGES.map(function (lang) {
      return '<option value="' + lang.id + '"' + (lang.id === state.lang ? ' selected' : '') + '>' +
        LHT.esc(lang.label) + '</option>';
    }).join('');
  }

  function renderRunnerNote() {
    var lang = LHT.languageById(state.lang);
    els.runnerBadge.textContent = lang.label;
    var text = LHT.t(lang.noteKey || 'practice.runnerRemote');
    if (lang.runner === 'remote') {
      // 只有当这道题确实没有该语言的专属模板时，才提示「用的是通用模板」
      var p = problem();
      var own = p && ((p.templates && p.templates[state.lang]) ||
        (state.lang === 'c' && cTrackEntry(p.id) && cTrackEntry(p.id).template));
      if (!own) text += ' · ' + LHT.t('practice.genericTemplate');
    }
    els.runnerNote.textContent = text;
  }

  function selectProblem(id) {
    saveDraft();
    state.problemId = id;
    state.results = null;
    loadProblemIntoEditor();
    renderList();
    renderStatement();
    renderRunnerNote();
    clearResults();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function loadProblemIntoEditor() {
    var p = problem();
    if (!p) return;
    var saved = loadDraft(p.id, state.lang);
    setCode(saved != null ? saved : templateFor(p, state.lang));
  }

  function switchLang(langId) {
    saveDraft();
    state.lang = langId;
    LHT.store('lht.practice.lang', langId);
    loadProblemIntoEditor();
    setEditorMode();
    renderRunnerNote();
    clearResults();
  }

  /* ---------- 运行 ---------- */

  function sampleTests(p) {
    var source = (p.samples && p.samples.length) ? p.samples : (p.tests || []).slice(0, 2);
    return source.map(function (s, i) {
      return {
        name: LHT.t('practice.sampleLabel') + ' ' + (i + 1),
        input: s.input || '',
        output: s.output || ''
      };
    });
  }

  function setRunning(running) {
    state.running = running;
    els.btnRunAll.disabled = running;
    els.btnRunSample.disabled = running;
    els.btnRunAll.textContent = running ? LHT.t('common.running') : LHT.t('practice.runAll');
  }

  function progressHtml(done, total, label) {
    var pct = total ? Math.round((done / total) * 100) : 0;
    return '<div class="progress-line"><span style="width:' + pct + '%"></span></div>' +
      '<p class="hint" style="margin:10px 0 0">' + LHT.esc(label) + '</p>';
  }

  function runTests(sampleOnly) {
    if (state.running) return;
    var p = problem();
    if (!p) return;
    var code = getCode();
    saveDraft();
    var tests = sampleOnly ? sampleTests(p) : (p.tests || []);
    if (!tests.length) return;

    var lang = LHT.languageById(state.lang);
    setRunning(true);
    showTab('tests');
    els.testsBody.innerHTML = progressHtml(0, tests.length,
      (lang.runner === 'js' ? '' : LHT.t('practice.runnerLoad') + ' '));
    els.debugBody.innerHTML = progressHtml(0, tests.length, LHT.t('practice.tabDebug'));
    els.varsBody.innerHTML = '<p class="hint">' + LHT.esc(LHT.t('practice.noRun')) + '</p>';

    var results = [];

    function runNext(index) {
      if (index >= tests.length) {
        state.results = results;
        setRunning(false);
        renderTests(results, tests, sampleOnly);
        return;
      }
      var t = tests[index];
      els.testsBody.innerHTML = progressHtml(index, tests.length,
        LHT.t('practice.runningCase').replace('{n}', index + 1).replace('{m}', tests.length));

      LHT.runCode(state.lang, code, t.input, { timeout: 6000 }).then(function (res) {
        var expected = LHT.normalizeOutput(t.output).trim();
        var actual = LHT.normalizeOutput(res.stdout).trim();
        results.push({
          name: t.name,
          input: t.input,
          expected: t.output,
          actual: res.stdout,
          error: res.error || '',
          stack: res.stack || '',
          timeMs: res.timeMs,
          remote: !!res.remote,
          loaderError: !!res.loaderError,
          netError: !!res.netError,
          passed: !res.error && actual === expected
        });
        renderTests(results, tests, sampleOnly, index + 1);
        runNext(index + 1);
      });
    }

    runNext(0);
  }

  function renderTests(results, tests, sampleOnly, doneCount) {
    if (doneCount != null && doneCount < tests.length) {
      // 运行中的中间状态：只显示进度
      els.testsBody.innerHTML = progressHtml(doneCount, tests.length,
        LHT.t('practice.runningCase').replace('{n}', doneCount + 1).replace('{m}', tests.length));
      return;
    }

    var passed = results.filter(function (r) { return r.passed; }).length;
    var allOk = passed === results.length && results.length === tests.length;

    var html = '<div class="summary-bar ' + (allOk ? 'pass' : 'fail') + '">' +
      '<span class="summary-key">' + passed + ' / ' + results.length + ' ' + LHT.esc(LHT.t('practice.passed')) + '</span>' +
      '<span class="spacer"></span>' +
      '<span class="small muted">' + LHT.esc(allOk ? LHT.t('practice.statusAllPass') : LHT.t('practice.statusSomeFail')) + '</span>' +
    '</div>';

    results.forEach(function (r, i) {
      var statusBadge = r.error
        ? '<span class="badge badge-danger">' + LHT.esc(LHT.t('practice.runtimeError')) + '</span>'
        : (r.passed ? '<span class="badge badge-ok">' + LHT.esc(LHT.t('practice.passed')) + '</span>'
                    : '<span class="badge badge-warn">' + LHT.esc(LHT.t('practice.wrongAnswer')) + '</span>');

      html += '<div class="test-row ' + (r.passed ? 'pass' : 'fail') + '">' +
        '<span class="test-name">' + LHT.esc(r.name) + '</span>' +
        statusBadge +
        '<span class="spacer"></span>' +
        '<span class="test-result">' + (r.timeMs != null ? r.timeMs + ' ms' : '') + '</span>' +
        '<button type="button" class="btn btn-sm btn-ghost" data-toggle="' + i + '">' +
          LHT.esc(LHT.t('practice.showMore')) + '</button>' +
        '<div class="test-detail" id="test-detail-' + i + '"' + (r.passed ? ' hidden' : '') + '>' +
          '<div class="cell"><h6>' + LHT.esc(LHT.t('practice.stdin')) + '</h6><pre>' + LHT.esc(r.input) + '</pre></div>' +
          '<div class="cell"><h6>' + LHT.esc(LHT.t('practice.expected')) + '</h6><pre>' + LHT.esc(r.expected) + '</pre></div>' +
          '<div class="cell"><h6>' + LHT.esc(LHT.t('practice.actual')) + '</h6><pre>' +
            LHT.esc(r.error ? r.error : (r.actual === '' ? LHT.t('practice.emptyOut') : r.actual)) + '</pre></div>' +
        '</div>' +
      '</div>';
    });

    els.testsBody.innerHTML = html;
    els.countTests.textContent = passed + '/' + results.length;

    LHT.$$('[data-toggle]', els.testsBody).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = btn.getAttribute('data-toggle');
        var box = LHT.$('#test-detail-' + idx, els.testsBody);
        if (!box) return;
        var hidden = box.hasAttribute('hidden');
        if (hidden) box.removeAttribute('hidden'); else box.setAttribute('hidden', '');
        btn.textContent = hidden ? LHT.t('practice.showLess') : LHT.t('practice.showMore');
      });
    });

    renderDebug(results);
    renderVars(results);
  }

  function consoleFor(r) {
    var lines = [];
    var out = LHT.normalizeOutput(r.actual);
    if (out.trim()) lines.push('<span class="out">' + LHT.esc(out) + '</span>');
    if (r.error) lines.push('<span class="err">' + LHT.esc(r.error) + '</span>');
    if (r.stack) lines.push('<span class="meta">' + LHT.esc(r.stack) + '</span>');
    lines.push('<span class="meta">' + LHT.esc(LHT.t('practice.elapsed')) + ': ' + (r.timeMs != null ? r.timeMs + ' ms' : '—') + '</span>');
    return lines.join('\n');
  }

  function renderDebug(results) {
    var html = '';
    results.forEach(function (r) {
      html += '<div style="margin-bottom:14px">' +
        '<div class="row row-tight" style="margin-bottom:6px">' +
          '<strong class="small">' + LHT.esc(r.name) + '</strong>' +
          (r.passed ? '<span class="badge badge-ok">' + LHT.esc(LHT.t('practice.passed')) + '</span>'
                    : '<span class="badge badge-danger">' + LHT.esc(LHT.t('practice.failed')) + '</span>') +
        '</div>' +
        '<pre class="console">' + consoleFor(r) + '</pre>' +
      '</div>';
    });
    els.debugBody.innerHTML = html || '<p class="hint">' + LHT.esc(LHT.t('practice.noRun')) + '</p>';
  }

  function renderVars(results) {
    var total = 0;
    var html = '';
    results.forEach(function (r) {
      if (!r.debug || !r.debug.length) return;
      total += r.debug.length;
      html += '<div style="margin-bottom:16px">' +
        '<div class="small muted" style="margin-bottom:6px">' + LHT.esc(r.name) + '</div>' +
        '<div class="debug-values">' + r.debug.map(function (value, i) {
          return '<div class="debug-line"><span class="debug-tick">#' + (i + 1) + '</span>' +
            '<span class="debug-val">' + LHT.esc(value) + '</span></div>';
        }).join('') + '</div>' +
      '</div>';
    });
    els.countVars.textContent = total ? String(total) : '';
    els.varsBody.innerHTML = html || '<p class="hint">' + LHT.esc(LHT.t('practice.noVars')) + '</p>';
  }

  function clearResults() {
    els.testsBody.innerHTML = '<p class="hint">' + LHT.esc(LHT.t('practice.noRun')) + '</p>';
    els.debugBody.innerHTML = '<p class="hint">' + LHT.esc(LHT.t('practice.noRun')) + '</p>';
    els.varsBody.innerHTML = '<p class="hint">' + LHT.esc(LHT.t('practice.noVars')) + '</p>';
    els.countTests.textContent = '';
    els.countVars.textContent = '';
    state.results = null;
  }

  /* ---------- 标签页 ---------- */

  var TABS = [
    { id: 'tab-tests', panel: 'panel-tests' },
    { id: 'tab-debug', panel: 'panel-debug' },
    { id: 'tab-vars', panel: 'panel-vars' }
  ];

  function showTab(tabId) {
    TABS.forEach(function (tab) {
      var isOn = tab.id === tabId;
      var btn = document.getElementById(tab.id);
      var panel = document.getElementById(tab.panel);
      if (btn) btn.setAttribute('aria-selected', isOn ? 'true' : 'false');
      if (panel) { if (isOn) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', ''); }
    });
  }

  function wireTabs() {
    TABS.forEach(function (tab) {
      var btn = document.getElementById(tab.id);
      if (btn) btn.addEventListener('click', function () { showTab(tab.id); });
    });
  }

  /* ---------- 启动 ---------- */

  function cache() {
    els = {
      problemList: LHT.$('#problem-list'),
      problemCount: LHT.$('#problem-count'),
      problemSearch: LHT.$('#problem-search'),
      diffFilters: LHT.$('#diff-filters'),
      tagFilters: LHT.$('#tag-filters'),
      statementBody: LHT.$('#statement-body'),
      statementDemo: LHT.$('#statement-demo'),
      editorHost: LHT.$('#editor-host'),
      langSelect: LHT.$('#lang-select'),
      runnerBadge: LHT.$('#runner-badge'),
      runnerNote: LHT.$('#runner-note'),
      btnTemplate: LHT.$('#btn-template'),
      btnSolution: LHT.$('#btn-solution'),
      btnRunSample: LHT.$('#btn-run-sample'),
      btnRunAll: LHT.$('#btn-run-all'),
      testsBody: LHT.$('#tests-body'),
      debugBody: LHT.$('#debug-body'),
      varsBody: LHT.$('#vars-body'),
      countTests: LHT.$('#count-tests'),
      countVars: LHT.$('#count-vars')
    };
  }

  function runAll() { runTests(false); }

  function boot() {
    cache();
    if (!PROBLEMS.length) {
      els.statementBody.innerHTML = '<p class="hint">题库为空。</p>';
      return;
    }
    renderFilters();
    renderList();
    renderLangOptions();
    renderRunnerNote();
    mountEditor('');
    loadProblemIntoEditor();
    renderStatement();
    clearResults();
    wireTabs();

    els.problemSearch.addEventListener('input', LHT.debounce(function () {
      state.query = els.problemSearch.value;
      renderList();
    }, 140));

    els.langSelect.addEventListener('change', function () { switchLang(els.langSelect.value); });

    els.btnTemplate.addEventListener('click', function () {
      var p = problem();
      if (!p) return;
      if (!window.confirm(LHT.t('practice.resetConfirm'))) return;
      setCode(templateFor(p, state.lang));
      LHT.toast(LHT.t('practice.templateLoaded'));
    });

    els.btnSolution.addEventListener('click', function () {
      var p = problem();
      var sol = solutionFor(p, state.lang);
      if (!sol) {
        LHT.toast(LHT.t('practice.noSolution'));
        return;
      }
      if (!window.confirm(LHT.t('practice.solutionWarn'))) return;
      setCode(sol);
      showTab('debug');
      LHT.toast(LHT.t('practice.solutionLoaded'));
    });

    els.btnRunSample.addEventListener('click', function () { runTests(true); });
    els.btnRunAll.addEventListener('click', runAll);

    window.addEventListener('resize', LHT.debounce(refreshEditor, 200));

    // 语言或主题切换后重新渲染动态内容
    var previousLangChange = LHT.onLangChange;
    LHT.onLangChange = function (lang) {
      if (typeof previousLangChange === 'function') previousLangChange(lang);
      renderFilters();
      renderList();
      renderStatement();
      renderRunnerNote();
      if (state.results) renderTests(state.results, state.results, false);
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
