/* ============================================================
   demos.js — 演示室宿主

   每个演示是一个自注册模块（assets/js/demo-*.js）：
     LHT.Demos.register({ id, name, fr, tag, note, aspect, mount })
   mount(ctx) 拿到画布、控件容器和一组辅助方法，返回时无需手动清理，
   只要用 ctx.raf / ctx.onCleanup 注册的资源都会在切换演示时自动释放。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var registry = [];
  var els = {};
  var active = null;
  var colorCache = null;

  LHT.Demos = {
    register: function (def) {
      if (!def || !def.id || typeof def.mount !== 'function') return;
      registry.push(def);
    },
    all: function () { return registry; }
  };

  /* ---------- 画布配色（跟随主题） ---------- */

  function colors() {
    if (colorCache) return colorCache;
    var cs = window.getComputedStyle(document.documentElement);
    function read(name, fallback) {
      var value = cs.getPropertyValue(name);
      return (value && value.trim()) || fallback;
    }
    colorCache = {
      canvas: read('--bg-elev', '#111820'),
      surface: read('--surface', '#131b25'),
      surface2: read('--surface-2', '#18222e'),
      surface3: read('--surface-3', '#1e2a38'),
      fg: read('--fg', '#e7eef6'),
      muted: read('--fg-muted', '#93a3b5'),
      dim: read('--fg-dim', '#6b7c8f'),
      border: read('--border', '#24313f'),
      accent: read('--accent', '#e0a94c'),
      gold: read('--gold', '#c9a856'),
      teal: read('--teal', '#46c9ae'),
      violet: read('--violet', '#9b8cf0'),
      danger: read('--danger', '#f2708c'),
      ok: read('--ok', '#56d68a'),
      warn: read('--warn', '#e8b757')
    };
    return colorCache;
  }

  /** 把颜色按透明度混合到另一颜色上（canvas 里没有 color-mix）。 */
  function mix(hexA, hexB, ratio) {
    var a = parseColor(hexA), b = parseColor(hexB);
    if (!a || !b) return hexA;
    var r = Math.round(a[0] + (b[0] - a[0]) * ratio);
    var g = Math.round(a[1] + (b[1] - a[1]) * ratio);
    var bl = Math.round(a[2] + (b[2] - a[2]) * ratio);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }

  function parseColor(value) {
    if (!value) return null;
    var text = String(value).trim();
    var hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      var h = hex[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    var rgb = text.match(/^rgba?\(([^)]+)\)$/i);
    if (rgb) {
      var parts = rgb[1].split(',').map(function (p) { return parseFloat(p); });
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
    }
    return null;
  }

  LHT.demoKit = { colors: colors, mix: mix };

  /** 相对亮度（sRGB 伽马校正），用来决定压在色块上的文字该用黑还是白 */
  function relativeLuminance(color) {
    var rgb = parseColor(color);
    if (!rgb) return 1;
    function channel(value) {
      var v = value / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
  }

  /** 给定底色，返回可读的文字色。0.2 是"白字/黑字对比度相等"的分界点 */
  LHT.demoKit.onColor = function (background) {
    return relativeLuminance(background) > 0.2 ? '#0b1220' : '#ffffff';
  };

  /* ---------- 上下文 ---------- */

  function createContext(def) {
    var cleanups = [];
    var resizeFns = [];
    var canvas = els.canvas;
    var aspect = def.aspect || 2.2;
    var size = { w: 0, h: 0, dpr: 1 };
    var rafs = [];

    var ctx = {
      canvas: canvas,
      controls: els.controls,
      t: function (key, fallback) { return LHT.t(key, fallback); },
      colors: colors,
      mix: mix,
      esc: LHT.esc,
      pick: LHT.pick,

      /** 每帧调用：按容器宽度自适应画布，返回逻辑坐标系下的绘图句柄。 */
      view: function () {
        var parent = canvas.parentNode;
        var cssW = Math.max(280, parent.clientWidth - 24);
        var cssH = Math.round(cssW / aspect);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (Math.abs(cssW - size.w) > 0.5 || cssH !== size.h || dpr !== size.dpr) {
          size = { w: cssW, h: cssH, dpr: dpr };
          canvas.style.height = cssH + 'px';
          canvas.width = Math.round(cssW * dpr);
          canvas.height = Math.round(cssH * dpr);
        }
        var c = canvas.getContext('2d');
        c.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
        return { c: c, w: size.w, h: size.h, dpr: size.dpr };
      },

      onCleanup: function (fn) { if (typeof fn === 'function') cleanups.push(fn); },

      /** 演示暂停时窗口尺寸变化仍需要重画一次 */
      onResize: function (fn) { if (typeof fn === 'function') resizeFns.push(fn); },

      fireResize: function () {
        resizeFns.forEach(function (fn) { try { fn(); } catch (e) { /* 忽略 */ } });
      },

      /** 注册一个 requestAnimationFrame 循环，返回控制句柄。 */
      raf: function (step) {
        var handle = { running: true, stopped: false, last: 0 };
        function frame(now) {
          if (handle.stopped) return;
          if (!handle.last) handle.last = now;
          var dt = now - handle.last;
          handle.last = now;
          if (handle.running) {
            try { step(dt); } catch (err) { /* 单个演示出错不应拖垮页面 */ }
          }
          requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        rafs.push(handle);
        cleanups.push(function () { handle.stopped = true; });
        return {
          pause: function () { handle.running = false; },
          resume: function () { handle.running = true; handle.last = 0; },
          isRunning: function () { return handle.running; }
        };
      },

      setMetrics: function (list) {
        var html = (list || []).map(function (item) {
          return '<div class="metric"><div class="k">' + LHT.esc(item.k) + '</div>' +
            '<div class="v">' + LHT.esc(item.v) + '</div></div>';
        }).join('');
        if (html === ctx._metricsHtml) return;   // 每帧都会调用，值没变就不动 DOM
        ctx._metricsHtml = html;
        els.metrics.innerHTML = html;
      },

      setStatus: function (text) {
        els.status.textContent = text || '';
        els.status.style.display = text ? '' : 'none';
      },

      /* ----- 控件工厂：返回句柄，便于演示读取当前值 ----- */

      select: function (label, options, current, onChange) {
        var wrap = LHT.el('div', { class: 'ctl' });
        wrap.appendChild(LHT.el('label', { text: label }));
        var sel = LHT.el('select');
        sel.innerHTML = options.map(function (opt) {
          return '<option value="' + LHT.esc(opt.value) + '">' + LHT.esc(opt.label) + '</option>';
        }).join('');
        sel.value = current;
        sel.addEventListener('change', function () { onChange(sel.value); });
        wrap.appendChild(sel);
        ctx.controls.appendChild(wrap);
        return {
          el: sel,
          value: function () { return sel.value; },
          set: function (value) { sel.value = value; },
          relabel: function (text) { wrap.querySelector('label').textContent = text; }
        };
      },

      range: function (label, opts, onInput) {
        var wrap = LHT.el('div', { class: 'ctl' });
        var head = LHT.el('div', { class: 'row row-between row-tight' });
        var lab = LHT.el('label', { text: label });
        var val = LHT.el('span', { class: 'ctl-value', text: String(opts.value) });
        head.appendChild(lab);
        head.appendChild(val);
        var input = LHT.el('input', {
          type: 'range',
          min: opts.min, max: opts.max, step: opts.step || 1, value: opts.value,
          'aria-label': label
        });
        input.addEventListener('input', function () {
          val.textContent = input.value;
          if (onInput) onInput(Number(input.value));
        });
        wrap.appendChild(head);
        wrap.appendChild(input);
        ctx.controls.appendChild(wrap);
        return {
          el: input,
          value: function () { return Number(input.value); },
          set: function (value) { input.value = value; val.textContent = String(value); },
          relabel: function (text) { lab.textContent = text; }
        };
      },

      text: function (label, value, onInput) {
        var wrap = LHT.el('div', { class: 'ctl' });
        wrap.appendChild(LHT.el('label', { text: label }));
        var input = LHT.el('input', { type: 'text', value: value, autocapitalize: 'off', autocomplete: 'off' });
        input.addEventListener('input', function () { onInput(input.value); });
        wrap.appendChild(input);
        ctx.controls.appendChild(wrap);
        return {
          el: input,
          value: function () { return input.value; },
          set: function (v) { input.value = v; if (onInput) onInput(v); },
          relabel: function (text) { wrap.querySelector('label').textContent = text; }
        };
      },

      button: function (label, onClick, kind) {
        var wrap = LHT.el('div', { class: 'ctl', style: 'min-width:0' });
        var btn = LHT.el('button', {
          type: 'button',
          class: 'btn' + (kind === 'primary' ? ' btn-primary' : kind === 'ghost' ? ' btn-ghost' : ''),
          text: label
        });
        btn.addEventListener('click', onClick);
        wrap.appendChild(btn);
        ctx.controls.appendChild(wrap);
        return {
          el: btn,
          set: function (text) { btn.textContent = text; },
          disable: function (v) { btn.disabled = !!v; }
        };
      },

      checkbox: function (label, value, onChange) {
        var wrap = LHT.el('div', { class: 'ctl', style: 'min-width:0' });
        var holder = LHT.el('label', { class: 'switch' });
        var input = LHT.el('input', { type: 'checkbox' });
        input.checked = !!value;
        input.addEventListener('change', function () { onChange(input.checked); });
        holder.appendChild(input);
        holder.appendChild(LHT.el('span', { text: label }));
        wrap.appendChild(holder);
        ctx.controls.appendChild(wrap);
        return {
          el: input,
          value: function () { return input.checked; },
          set: function (v) { input.checked = !!v; }
        };
      },

      /** 在控件行里插入一个分隔 */
      spacer: function () {
        ctx.controls.appendChild(LHT.el('div', { class: 'spacer' }));
      }
    };

    ctx.cleanupAll = function () {
      cleanups.forEach(function (fn) { try { fn(); } catch (e) { /* 忽略 */ } });
      cleanups.length = 0;
      rafs.length = 0;
      resizeFns.length = 0;
    };

    return ctx;
  }

  /* ---------- 导航与切换 ---------- */

  function renderNav() {
    els.nav.innerHTML = '';
    registry.forEach(function (def) {
      var btn = LHT.el('button', {
        type: 'button', role: 'tab',
        'aria-selected': active && active.id === def.id ? 'true' : 'false',
        'data-demo': def.id
      });
      btn.innerHTML = '<span class="nm">' + LHT.pick(def.name) + '</span>' +
        '<span class="fr">' + LHT.esc(def.fr || '') + '</span>';
      btn.addEventListener('click', function () { select(def.id); });
      els.nav.appendChild(btn);
    });
  }

  function select(id) {
    var def = null;
    for (var i = 0; i < registry.length; i++) {
      if (registry[i].id === id) { def = registry[i]; break; }
    }
    if (!def) def = registry[0];
    if (!def) return;
    if (active && active.ctx) active.ctx.cleanupAll();

    active = def;
    els.title.textContent = LHT.pickText(def.name);
    els.fr.textContent = def.fr || '';
    els.note.innerHTML = def.noteKey ? LHT.esc(LHT.t(def.noteKey))
      : (def.note ? LHT.pick(def.note) : '');
    els.controls.innerHTML = '';
    els.metrics.innerHTML = '';
    els.status.style.display = 'none';

    var ctx = createContext(def);
    active.ctx = ctx;
    try {
      def.mount(ctx);
    } catch (err) {
      els.note.innerHTML = 'Error: ' + LHT.esc(err && err.message ? err.message : String(err));
    }
    renderNav();
    if (location.hash !== '#' + def.id) {
      try { history.replaceState(null, '', '#' + def.id); } catch (e) { /* file:// 下可能不支持 */ }
    }
    window.scrollTo({ top: els.shell.offsetTop - 70, behavior: 'smooth' });
  }

  function boot() {
    els = {
      shell: LHT.$('#demo-shell'),
      nav: LHT.$('#demo-nav'),
      canvas: LHT.$('#demo-canvas'),
      controls: LHT.$('#demo-controls'),
      metrics: LHT.$('#demo-metrics'),
      note: LHT.$('#demo-note'),
      title: LHT.$('#demo-title'),
      fr: LHT.$('#demo-fr'),
      status: LHT.$('#demo-status')
    };
    if (!registry.length) {
      els.note.textContent = '没有可用的演示模块。';
      return;
    }
    renderNav();
    var wanted = (location.hash || '').replace('#', '');
    select(wanted || registry[0].id);

    LHT.onThemeChange = function () {
      colorCache = null;
      if (active && active.ctx) active.ctx.fireResize();
    };

    window.addEventListener('resize', LHT.debounce(function () {
      if (active && active.ctx) active.ctx.fireResize();
    }, 160));

    // 页内 hash 变化（例如从刷题台点“相关演示”返回）也能切换演示
    window.addEventListener('hashchange', function () {
      var id = (location.hash || '').replace('#', '');
      if (!id || (active && active.id === id)) return;
      var found = registry.some(function (def) { return def.id === id; });
      if (found) select(id);
    });

    var previous = LHT.onLangChange;
    LHT.onLangChange = function (lang) {
      if (typeof previous === 'function') previous(lang);
      if (active) {
        els.title.textContent = LHT.pickText(active.name);
        els.note.innerHTML = active.noteKey ? LHT.esc(LHT.t(active.noteKey))
          : (active.note ? LHT.pick(active.note) : '');
      }
      renderNav();
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
