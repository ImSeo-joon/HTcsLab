/* ============================================================
   site.js — 主题、语言切换、通用 DOM 工具、页脚
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var doc = document;

  /* ---------- DOM 工具 ---------- */

  LHT.$ = function (sel, root) { return (root || doc).querySelector(sel); };
  LHT.$$ = function (sel, root) {
    return Array.prototype.slice.call((root || doc).querySelectorAll(sel));
  };

  LHT.el = function (tag, attrs, children) {
    var node = doc.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var val = attrs[key];
        if (val == null || val === false) return;
        if (key === 'class') node.className = val;
        else if (key === 'text') node.textContent = val;
        else if (key === 'html') node.innerHTML = val;
        else if (key === 'dataset') {
          Object.keys(val).forEach(function (d) { node.dataset[d] = val[d]; });
        } else node.setAttribute(key, val === true ? '' : val);
      });
    }
    if (children != null) {
      (Array.isArray(children) ? children : [children]).forEach(function (child) {
        if (child == null) return;
        node.appendChild(typeof child === 'string' ? doc.createTextNode(child) : child);
      });
    }
    return node;
  };

  LHT.debounce = function (fn, wait) {
    var timer = null;
    return function () {
      var args = arguments, self = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(self, args); }, wait || 160);
    };
  };

  LHT.raf = function (fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; fn(); });
    };
  };

  /* ---------- 提示条 ---------- */

  var toastTimer = null;
  LHT.toast = function (message, kind) {
    var host = LHT.$('#lht-toast');
    if (!host) {
      host = LHT.el('div', { id: 'lht-toast', class: 'lht-toast', role: 'status', 'aria-live': 'polite' });
      doc.body.appendChild(host);
    }
    host.textContent = message;
    host.className = 'lht-toast is-visible' + (kind ? ' is-' + kind : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { host.className = 'lht-toast'; }, 2200);
  };

  LHT.copyText = function (text) {
    function legacy() {
      var ta = doc.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      doc.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
      doc.body.removeChild(ta);
      return ok;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { LHT.toast(LHT.t('common.copied'), 'ok'); },
        function () {
          LHT.toast(legacy() ? LHT.t('common.copied') : LHT.t('common.copyFail'), legacy() ? 'ok' : 'err');
        }
      );
    }
    LHT.toast(legacy() ? LHT.t('common.copied') : LHT.t('common.copyFail'), legacy() ? 'ok' : 'err');
    return Promise.resolve();
  };

  /* ---------- 外部资源加载（离线时优雅失败） ---------- */

  LHT.loadScript = function (url, key) {
    return new Promise(function (resolve, reject) {
      var mark = key || url;
      var existing = doc.querySelector('script[data-lht-src="' + mark + '"]');
      if (existing) {
        if (existing.dataset.loaded === '1') { resolve(); return; }
        if (existing.dataset.failed === '1') { reject(new Error('加载失败: ' + url)); return; }
        existing.addEventListener('load', function () { resolve(); });
        existing.addEventListener('error', function () { reject(new Error('加载失败: ' + url)); });
        return;
      }
      var tag = doc.createElement('script');
      tag.src = url;
      tag.async = true;
      tag.dataset.lhtSrc = mark;
      tag.addEventListener('load', function () { tag.dataset.loaded = '1'; resolve(); });
      tag.addEventListener('error', function () {
        tag.dataset.failed = '1';
        reject(new Error('加载失败: ' + url));
      });
      doc.head.appendChild(tag);
    });
  };

  LHT.loadStyle = function (url, key) {
    return new Promise(function (resolve, reject) {
      var mark = key || url;
      var existing = doc.querySelector('link[data-lht-href="' + mark + '"]');
      if (existing) { resolve(); return; }
      var tag = doc.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
      tag.dataset.lhtHref = mark;
      tag.addEventListener('load', function () { resolve(); });
      tag.addEventListener('error', function () { reject(new Error('加载失败: ' + url)); });
      doc.head.appendChild(tag);
    });
  };

  /* ---------- 主题 ---------- */

  var THEME_KEY = 'lht.theme';

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  LHT.themePref = function () {
    var saved = LHT.store(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'auto';
  };

  LHT.applyTheme = function () {
    var pref = LHT.themePref();
    var effective = pref === 'auto' ? systemTheme() : pref;
    doc.documentElement.setAttribute('data-theme', effective);
    doc.documentElement.setAttribute('data-theme-pref', pref);
    LHT.$$('[data-theme-set]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-theme-set') === pref ? 'true' : 'false');
    });
    if (typeof LHT.onThemeChange === 'function') LHT.onThemeChange(effective);
  };

  LHT.setTheme = function (pref) {
    LHT.store(THEME_KEY, pref);
    LHT.applyTheme();
  };

  /* ---------- 头部工具区 ---------- */

  function langLabel(code) {
    if (code === 'en') return 'EN';
    if (code === 'both') return 'EN·中';
    if (code === 'ja') return 'JA';
    return 'FR';
  }

  function buildHeaderTools(node) {
    var langSeg = LHT.el('div', { class: 'seg', role: 'group', 'aria-label': LHT.t('common.lang') });
    ['en', 'both', 'fr', 'ja'].forEach(function (code) {
      var b = LHT.el('button', {
        type: 'button',
        'aria-pressed': LHT.lang === code ? 'true' : 'false',
        title: code === 'en' ? 'English' : code === 'both' ? 'English + 中文' : code === 'ja' ? '日本語' : 'Français',
        text: langLabel(code)
      });
      b.addEventListener('click', function () {
        LHT.setLang(code);
        LHT.$$('[data-lang-set]', langSeg).forEach(function (other) {
          other.setAttribute('aria-pressed', 'false');
        });
        b.setAttribute('aria-pressed', 'true');
      });
      b.setAttribute('data-lang-set', code);
      langSeg.appendChild(b);
    });

    var themeSeg = LHT.el('div', { class: 'seg', role: 'group', 'aria-label': LHT.t('common.theme') });
    [['auto', '◐'], ['light', '☀'], ['dark', '☾']].forEach(function (pair) {
      var b = LHT.el('button', {
        type: 'button',
        'data-theme-set': pair[0],
        'aria-pressed': LHT.themePref() === pair[0] ? 'true' : 'false',
        title: pair[0] === 'auto' ? LHT.t('theme.auto') : LHT.t(pair[0] === 'light' ? 'common.themeLight' : 'common.themeDark'),
        text: pair[1]
      });
      b.addEventListener('click', function () { LHT.setTheme(pair[0]); });
      themeSeg.appendChild(b);
    });

    node.appendChild(langSeg);
    node.appendChild(themeSeg);
  }

  /* ---------- 页脚 ---------- */

  var REF_LINKS = [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LeetCode', url: 'https://leetcode.com/' },
    { label: 'OI Wiki', url: 'https://oi-wiki.org/' },
    { label: 'Hugging Face', url: 'https://huggingface.co/' },
    { label: 'arXiv', url: 'https://arxiv.org/' }
  ];

  function buildFooter(node) {
    var meta = LHT.META;
    var pages = [
      ['index.html', 'nav.home'],
      ['practice.html', 'nav.practice'],
      ['resources.html', 'nav.resources'],
      ['demos.html', 'nav.demos'],
      ['contests.html', 'nav.contests'],
      ['collabs.html', 'nav.collab'],
      ['battle.html', 'nav.battle'],
      ['notes.html', 'nav.notes']
    ];
    var html = '' +
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="brand-fr">' + LHT.esc(meta.nameFr) + '</div>' +
            '<p class="muted small" style="margin-top:8px;max-width:38ch">' + LHT.esc(LHT.t('footer.tagText')) + '</p>' +
            '<p class="dim tiny">' + LHT.esc(meta.taglineFr) + '</p>' +
          '</div>' +
          '<div>' +
            '<h4>' + LHT.esc(LHT.t('footer.nav')) + '</h4>' +
            '<ul>' + pages.map(function (p) {
              return '<li><a href="' + p[0] + '">' + LHT.esc(LHT.t(p[1])) + '</a></li>';
            }).join('') + '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>' + LHT.esc(LHT.t('footer.ref')) + '</h4>' +
            '<ul>' + REF_LINKS.map(function (l) {
              return '<li><a href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + LHT.esc(l.label) + '</a></li>';
            }).join('') + '</ul>' +
          '</div>' +
          '<div id="install-block"></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<div class="row row-between small dim">' +
            '<span>' + LHT.esc(LHT.t('footer.built')) + ' v' + LHT.esc(meta.version) + '</span>' +
            '<span class="colophon">' + LHT.esc(LHT.t('footer.colophon')) + '</span>' +
          '</div>' +
          '<p class="dim tiny" style="margin:8px 0 0">© ' + meta.year + ' ' +
            LHT.esc(meta.nameFr) + ' · ' + LHT.esc(LHT.t('footer.licenseNote')) + '</p>' +
        '</div>' +
      '</div>';
    node.innerHTML = html;
    renderInstallBlock();
  }

  /* ---------- 桌面快捷方式 / PWA 安装 ---------- */

  LHT.installEvent = null;

  function isStandalone() {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
    if (window.matchMedia && window.matchMedia('(display-mode: window-controls-overlay)').matches) return true;
    return window.navigator.standalone === true;
  }

  /** 没有安装事件时，按平台给出可以照做的说明 */
  function platformInstallHint() {
    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    var inApp = /MicroMessenger|WeChat|MQQBrowser|QQ\/|Weibo|Quark|UCBrowser|baiduboxapp|AlipayClient|DingTalk|BytedanceWebview/i.test(ua);

    if (inApp) return LHT.t('install.hintInApp');
    if (isIOS) return LHT.t('install.hintIOS');
    if (mobile) return LHT.t('install.hintAndroid');
    return LHT.t('install.hintBrowser');
  }

  function renderInstallBlock() {
    var host = LHT.$('#install-block');
    if (!host) return;
    var html = '<h4>' + LHT.esc(LHT.t('install.title')) + '</h4>';

    if (isStandalone()) {
      html += '<p class="tiny dim" style="margin:0">' + LHT.esc(LHT.t('install.installed')) + '</p>';
    } else if (LHT.installEvent) {
      html += '<button type="button" class="btn btn-sm btn-primary" id="install-app">' +
        LHT.esc(LHT.t('install.button')) + '</button>' +
        '<p class="tiny dim" style="margin:9px 0 0">' + LHT.esc(LHT.t('install.hintPwa')) + '</p>';
    } else if (location.protocol === 'file:') {
      html += '<p class="tiny dim" style="margin:0">' + LHT.esc(LHT.t('install.hintLocal')) + '</p>';
    } else {
      html += '<p class="tiny dim" style="margin:0">' + LHT.esc(platformInstallHint()) + '</p>';
    }

    host.innerHTML = html;

    var btn = LHT.$('#install-app');
    if (btn) {
      btn.addEventListener('click', function () {
        var pending = LHT.installEvent;
        if (!pending) return;
        btn.disabled = true;
        pending.prompt();
        pending.userChoice.then(function (choice) {
          LHT.toast(choice && choice.outcome === 'accepted' ? LHT.t('install.done') : LHT.t('install.ready'));
          LHT.installEvent = null;
          renderInstallBlock();
        }, function () {
          btn.disabled = false;
        });
      });
    }
  }

  function wireInstall() {
    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      LHT.installEvent = event;
      renderInstallBlock();
    });
    window.addEventListener('appinstalled', function () {
      LHT.installEvent = null;
      LHT.toast(LHT.t('install.done'), 'ok');
      renderInstallBlock();
    });
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* 离线或隐私模式：忽略 */ });
    });
  }

  /* ---------- 启动 ---------- */

  function paint() {
    LHT.applyTheme();
    LHT.applyI18n();
    var tools = LHT.$('[data-header-tools]');
    if (tools) { tools.innerHTML = ''; buildHeaderTools(tools); }
    var footer = LHT.$('#site-footer');
    if (footer) buildFooter(footer);
    // 当前页导航高亮
    var here = location.pathname.split('/').pop() || 'index.html';
    LHT.$$('.nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === here) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (typeof LHT.onLangChange === 'function') LHT.onLangChange(LHT.lang);
  }

  LHT.onLangChange = null;
  LHT.onThemeChange = null;

  LHT.refreshChrome = paint;

  function boot() {
    paint();
    wireInstall();
    registerServiceWorker();
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
    if (media) {
      var handler = function () { if (LHT.themePref() === 'auto') LHT.applyTheme(); };
      if (media.addEventListener) media.addEventListener('change', handler);
      else if (media.addListener) media.addListener(handler);
    }
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
