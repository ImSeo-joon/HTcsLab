/* ============================================================
   sandbox.js — 三种代码执行后端

   1) JavaScript  iframe 沙箱（sandbox="allow-scripts"），真实执行，离线可用
   2) Python      Pyodide（浏览器内 wasm），首次使用需联网下载运行时
   3) 其他语言    Piston 公共执行接口，需要联网，有频率限制

   之所以用 iframe 而不是 Web Worker：file:// 直接打开页面时，
   Worker 与模块脚本都会被浏览器拦住，而 srcdoc iframe 不受影响。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;

  var PYODIDE_VERSION = 'v0.26.4';
  var PYODIDE_NPM_VERSION = '0.26.4';

  /* Pyodide 镜像列表，按顺序尝试。
     实测：cdn.jsdelivr.net 与 unpkg.com 在中国大陆网络下常被重置，
     fastly.jsdelivr.net 与 cdnjs 通常可达，所以排在前面。 */
  var PYODIDE_BASES = [
    'https://fastly.jsdelivr.net/pyodide/' + PYODIDE_VERSION + '/full/',
    'https://cdnjs.cloudflare.com/ajax/libs/pyodide/' + PYODIDE_NPM_VERSION + '/',
    'https://cdn.jsdelivr.net/pyodide/' + PYODIDE_VERSION + '/full/',
    'https://unpkg.com/pyodide@' + PYODIDE_NPM_VERSION + '/full/'
  ];
  /* 远程执行后端。
     主用 Wandbox：免密钥、允许跨域，实测可用。
     备用 Piston：公共实例自 2026-02-15 起改为白名单制，必须自建，
     用 LHT.configureRemote({ pistonBase: 'https://your-host/api/v2' }) 切换过去。 */
  var WANDBOX_BASE = 'https://wandbox.org/api';

  var REMOTE_LANG = {
    typescript: 'TypeScript',
    c: 'C',
    cpp: 'C++',
    java: 'Java',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    php: 'PHP',
    ruby: 'Ruby'
  };

  LHT.REMOTE = {
    pistonBase: LHT.store('lht.piston.base') || '',
    pistonKey: LHT.store('lht.piston.key') || ''
  };

  LHT.configureRemote = function (options) {
    if (!options) return LHT.REMOTE;
    if (options.pistonBase != null) {
      LHT.REMOTE.pistonBase = options.pistonBase;
      LHT.store('lht.piston.base', options.pistonBase);
    }
    if (options.pistonKey != null) {
      LHT.REMOTE.pistonKey = options.pistonKey;
      LHT.store('lht.piston.key', options.pistonKey);
    }
    return LHT.REMOTE;
  };
  var DEFAULT_TIMEOUT = 6000;

  /* ---------- 语言表 ---------- */

  LHT.LANGUAGES = [
    { id: 'c',          label: 'C',          runner: 'remote', piston: 'c',      mode: 'clike', file: 'main.c',  noteKey: 'practice.runnerRemote' },
    { id: 'python',     label: 'Python',     runner: 'py', mode: 'python',     noteKey: 'practice.runnerPy' },
    { id: 'javascript', label: 'JavaScript', runner: 'js', mode: 'javascript', noteKey: 'practice.runnerJs' },
    { id: 'typescript', label: 'TypeScript', runner: 'remote', piston: 'typescript', mode: 'javascript', file: 'main.ts', noteKey: 'practice.runnerRemote' },
    { id: 'cpp',        label: 'C++',        runner: 'remote', piston: 'c++',    mode: 'clike', file: 'main.cpp', noteKey: 'practice.runnerRemote' },
    { id: 'java',       label: 'Java',       runner: 'remote', piston: 'java',   mode: 'clike', file: 'Main.java', noteKey: 'practice.runnerRemote' },
    { id: 'csharp',     label: 'C#',         runner: 'remote', piston: 'csharp', mode: 'clike', file: 'Program.cs', noteKey: 'practice.runnerRemote' },
    { id: 'go',         label: 'Go',         runner: 'remote', piston: 'go',     mode: 'go',    file: 'main.go', noteKey: 'practice.runnerRemote' },
    { id: 'rust',       label: 'Rust',       runner: 'remote', piston: 'rust',   mode: 'rust',  file: 'main.rs', noteKey: 'practice.runnerRemote' },
    { id: 'php',        label: 'PHP',        runner: 'remote', piston: 'php',    mode: 'php',   file: 'main.php', noteKey: 'practice.runnerRemote' },
    { id: 'ruby',       label: 'Ruby',       runner: 'remote', piston: 'ruby',   mode: 'ruby',  file: 'main.rb', noteKey: 'practice.runnerRemote' }
  ];

  LHT.languageById = function (id) {
    for (var i = 0; i < LHT.LANGUAGES.length; i++) {
      if (LHT.LANGUAGES[i].id === id) return LHT.LANGUAGES[i];
    }
    return LHT.LANGUAGES[0];
  };

  /* ---------- 通用工具 ---------- */

  function normalize(text) {
    return String(text == null ? '' : text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  function firstLines(text, count) {
    var lines = String(text || '').split('\n');
    return lines.slice(0, count || 5).join('\n');
  }

  LHT.normalizeOutput = normalize;

  /* ============================================================
     1) JavaScript —— iframe 沙箱
     ============================================================ */

  var SCRIPT_CLOSE = '<' + '/script>';

  var BOOTSTRAP = [
    '<!doctype html>',
    '<meta charset="utf-8">',
    '<title>lht-js-sandbox</title>',
    '<script>',
    '(function () {',
    '  "use strict";',
    '  var stdinText = "";',
    '  var out = [];',
    '  var debugLog = [];',
    '',
    '  function fmt(value, depth) {',
    '    depth = depth || 0;',
    '    if (value === null) return "null";',
    '    var t = typeof value;',
    '    if (t === "undefined") return "undefined";',
    '    if (t === "number" || t === "boolean" || t === "bigint") return String(value);',
    '    if (t === "string") return depth === 0 ? value : JSON.stringify(value);',
    '    if (t === "function") return "function " + (value.name || "anonymous");',
    '    if (value instanceof Error) return value.name + ": " + value.message;',
    '    if (depth > 3) return "…";',
    '    try {',
    '      var arr = Array.isArray(value);',
    '      if (arr) {',
    '        var n = Math.min(value.length, 60);',
    '        var items = [];',
    '        for (var i = 0; i < n; i++) items.push(fmt(value[i], depth + 1));',
    '        if (value.length > n) items.push("… +" + (value.length - n));',
    '        return "[" + items.join(", ") + "]";',
    '      }',
    '      var keys = Object.keys(value);',
    '      var m = Math.min(keys.length, 40);',
    '      var pairs = [];',
    '      for (var j = 0; j < m; j++) pairs.push(keys[j] + ": " + fmt(value[keys[j]], depth + 1));',
    '      if (keys.length > m) pairs.push("… +" + (keys.length - m));',
    '      return "{" + pairs.join(", ") + "}";',
    '    } catch (e) { return String(value); }',
    '  }',
    '',
    '  function push(level, args) {',
    '    out.push({ level: level, text: Array.prototype.map.call(args, function (a) { return fmt(a, 0); }).join(" ") });',
    '  }',
    '',
    '  window.console = {',
    '    log: function () { push("log", arguments); },',
    '    info: function () { push("log", arguments); },',
    '    debug: function () { push("log", arguments); },',
    '    warn: function () { push("log", arguments); },',
    '    error: function () { push("error", arguments); }',
    '  };',
    '  window.print = function () { push("log", arguments); };',
    '  window.debug = function () {',
    '    debugLog.push(Array.prototype.map.call(arguments, function (a) { return fmt(a, 1); }).join(" | "));',
    '  };',
    '',
    '  var lines = [];',
    '  var cursor = 0;',
    '  window.readAll = function () { return stdinText; };',
    '  window.readline = function () { return cursor < lines.length ? lines[cursor++] : null; };',
    '  window.readLine = window.readline;',
    '',
    '  window.addEventListener("message", function (event) {',
    '    var data = event.data;',
    '    if (!data || data.source !== "lht-host" || data.type !== "run") return;',
    '    stdinText = data.stdin || "";',
    '    lines = stdinText.replace(/\\r\\n/g, "\\n").split("\\n");',
    '    cursor = 0;',
    '    out = [];',
    '    debugLog = [];',
    '    var started = (window.performance || Date).now();',
    '',
    '    function finish(error, stack) {',
    '      parent.postMessage({',
    '        source: "lht-sandbox",',
    '        type: "done",',
    '        runId: data.runId,',
    '        stdout: out.filter(function (x) { return x.level !== "error"; }).map(function (x) { return x.text; }).join("\\n"),',
    '        stderr: out.filter(function (x) { return x.level === "error"; }).map(function (x) { return x.text; }).join("\\n"),',
    '        debug: debugLog,',
    '        error: error || null,',
    '        stack: stack || null,',
    '        timeMs: (window.performance || Date).now() - started',
    '      }, "*");',
    '    }',
    '',
    '    var runner;',
    '    try {',
    '      runner = new Function("return (async () => {\\n" + data.code + "\\n})();");',
    '    } catch (err) {',
    '      finish(err.name + ": " + err.message, null);',
    '      return;',
    '    }',
    '    Promise.resolve().then(runner).then(function () { finish(null, null); }, function (err) {',
    '      finish(err && err.name ? err.name + ": " + err.message : String(err), err && err.stack ? err.stack : null);',
    '    });',
    '  });',
    '',
    '  parent.postMessage({ source: "lht-sandbox", type: "ready" }, "*");',
    '})();',
    SCRIPT_CLOSE
  ].join('\n');

  var runCounter = 0;

  function runJavaScript(code, stdin, timeoutMs) {
    return new Promise(function (resolve) {
      var runId = 'js-' + (++runCounter);
      var frame = document.createElement('iframe');
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
      frame.srcdoc = BOOTSTRAP;

      var settled = false;

      function cleanup() {
        window.removeEventListener('message', onMessage);
        if (frame.parentNode) frame.parentNode.removeChild(frame);
      }

      var timer = setTimeout(function () {
        settle({
          ok: false, timedOut: true, stdout: '', stderr: '',
          error: 'TimeoutError: 运行超过 ' + (timeoutMs / 1000) + ' 秒，已强制中断（检查是否有死循环）',
          debug: [], timeMs: timeoutMs
        });
      }, timeoutMs);

      function settle(result) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        cleanup();
        resolve(result);
      }

      function onMessage(event) {
        var data = event.data;
        if (!data || data.source !== 'lht-sandbox') return;
        if (event.source !== frame.contentWindow) return;

        if (data.type === 'ready') {
          frame.contentWindow.postMessage({
            source: 'lht-host', type: 'run', runId: runId, code: code, stdin: stdin
          }, '*');
          return;
        }
        if (data.type === 'done' && data.runId === runId) {
          settle({
            ok: !data.error,
            stdout: normalize(data.stdout),
            stderr: normalize(data.stderr),
            error: data.error || '',
            stack: data.stack ? firstLines(data.stack, 4) : '',
            debug: data.debug || [],
            timeMs: Math.round(data.timeMs)
          });
        }
      }

      window.addEventListener('message', onMessage);
      document.body.appendChild(frame);
    });
  }

  /* ============================================================
     2) Python —— Pyodide
     ============================================================ */

  var pyodideReady = null;
  var pyodideBase = '';

  var PY_PRELUDE = [
    'import sys, io',
    '_lht_debug_log = []',
    'def debug(*args):',
    '    _lht_debug_log.append(" ".join(str(a) for a in args))'
  ].join('\n');

  /** 当前 Pyodide 实际使用的镜像，调试时有用。 */
  LHT.pyodideInfo = function () { return { base: pyodideBase, version: PYODIDE_VERSION }; };

  function loadPyodideFrom(index, failures) {
    if (index >= PYODIDE_BASES.length) {
      throw new Error('Pyodide 运行时加载失败（已尝试 ' + PYODIDE_BASES.length +
        ' 个镜像）：' + failures.join(' | '));
    }
    var base = PYODIDE_BASES[index];
    return LHT.loadScript(base + 'pyodide.js', 'pyodide:' + base)
      .then(function () {
        if (!window.loadPyodide) throw new Error('脚本已加载但未暴露 loadPyodide');
        return window.loadPyodide({ indexURL: base });
      })
      .then(function (py) {
        pyodideBase = base;
        py.runPython(PY_PRELUDE);
        return py;
      })
      .catch(function (err) {
        failures.push(base.replace(/^https:\/\//, '').replace(/\/$/, '') + ' → ' +
          (err && err.message ? err.message : err));
        window.loadPyodide = undefined;
        return loadPyodideFrom(index + 1, failures);
      });
  }

  LHT.ensurePython = function () {
    if (pyodideReady) return pyodideReady;
    pyodideReady = loadPyodideFrom(0, []).catch(function (err) {
      pyodideReady = null;      // 失败后允许下次重试
      throw err;
    });
    return pyodideReady;
  };

  var PY_WRAPPER = [
    'import io, sys, traceback',
    'sys.stdin = io.StringIO(__lht_stdin)',
    '_lht_out = io.StringIO()',
    '_lht_err = io.StringIO()',
    'sys.stdout = _lht_out',
    'sys.stderr = _lht_err',
    'del _lht_debug_log[:]',
    '_lht_trace = ""',
    'try:',
    '    exec(compile(__lht_code, "<solution>", "exec"))',
    'except SystemExit:',
    '    pass',
    'except BaseException:',
    '    _lht_trace = traceback.format_exc()',
    'finally:',
    '    sys.stdout = sys.__stdout__',
    '    sys.stderr = sys.__stderr__',
    '_lht_result = (_lht_out.getvalue(), _lht_err.getvalue(), _lht_trace, list(_lht_debug_log))'
  ].join('\n');

  function runPython(code, stdin) {
    return LHT.ensurePython().then(function (py) {
      py.globals.set('__lht_stdin', stdin);
      py.globals.set('__lht_code', code);
      var started = (window.performance || Date).now();
      var proxy = null;
      try {
        py.runPython(PY_WRAPPER);
        proxy = py.globals.get('_lht_result');
        var arr = proxy.toJs();
        proxy.destroy();
        proxy = null;
        var stdout = normalize(arr[0]);
        var stderr = normalize(arr[1]);
        var trace = arr[2] || '';
        var debug = arr[3] || [];
        // 去掉 traceback 尾部的样板行，保留最有用的部分
        var errorText = '';
        if (trace) {
          var lines = trace.replace(/\n$/, '').split('\n');
          errorText = lines[lines.length - 1];
          if (!/^\w*(Error|Exception|Interrupt|Exit)/.test(errorText)) errorText = lines.join('\n');
        }
        return {
          ok: !trace,
          stdout: stdout,
          stderr: stderr,
          error: errorText,
          stack: trace ? firstLines(trace, 6) : '',
          debug: debug,
          timeMs: Math.round((window.performance || Date).now() - started)
        };
      } finally {
        if (proxy) { try { proxy.destroy(); } catch (e) { /* 忽略 */ } }
        try { py.globals.delete('__lht_code'); } catch (e) { /* 忽略 */ }
      }
    }).catch(function (err) {
      return {
        ok: false, stdout: '', stderr: '', debug: [], timeMs: 0,
        error: err && err.message ? err.message : String(err),
        loaderError: true
      };
    });
  }

  /* ============================================================
     3) 其他语言 —— Piston 公共接口
     ============================================================ */

  var compilerCache = null;

  /** 把任意版本字符串拆成数字序列，方便比较 'jdk-22+36' 这类写法 */
  function versionKey(text) {
    var m = String(text == null ? '' : text).match(/\d+/g);
    return m ? m.map(Number) : [0];
  }

  function compareVersions(a, b) {
    var ka = versionKey(a), kb = versionKey(b);
    var len = Math.max(ka.length, kb.length);
    for (var i = 0; i < len; i++) {
      var x = ka[i] || 0, y = kb[i] || 0;
      if (x !== y) return x - y;
    }
    return 0;
  }

  function fetchCompilers() {
    if (compilerCache) return compilerCache;
    compilerCache = fetch(WANDBOX_BASE + '/list.json')
      .then(function (res) {
        if (!res.ok) throw new Error('编译器列表请求失败 HTTP ' + res.status);
        return res.json();
      })
      .then(function (list) {
        if (!Array.isArray(list) || !list.length) throw new Error('编译器列表为空');
        return list;
      })
      .catch(function (err) {
        compilerCache = null;
        throw err;
      });
    return compilerCache;
  }

  /* 各语言的编译器偏好：
     C / C++ 必须挑 GCC，否则 #include <bits/stdc++.h> 找不到；
     C# 挑 mono，Wandbox 上的 dotnetcore 目前构建会崩。 */
  var COMPILER_PREFERENCE = {
    'C': function (name) { return /^gcc-/.test(name) && /-c$/.test(name); },
    'C++': function (name) { return /^gcc-/.test(name) && !/-c$/.test(name); },
    'C#': function (name) { return /^mono-/.test(name); }
  };

  /** 在 Wandbox 编译器列表里挑一个：先按偏好过滤，再优先正式版，最后取版本号最大的 */
  function pickCompiler(list, language) {
    var pool = list.filter(function (item) { return item.language === language; });
    if (!pool.length) return null;
    var prefer = COMPILER_PREFERENCE[language];
    if (prefer) {
      var preferred = pool.filter(function (item) { return prefer(item.name); });
      if (preferred.length) pool = preferred;
    }
    var stable = pool.filter(function (item) {
      return !/head/i.test(item.name) && !/experimental/i.test(String(item.version));
    });
    var candidates = (stable.length ? stable : pool).slice();
    candidates.sort(function (a, b) { return compareVersions(b.version, a.version); });
    return candidates[0];
  }

  function remoteFailure(err, extra) {
    return {
      ok: false, stdout: '', stderr: '', debug: [], timeMs: 0, remote: true,
      netError: true,
      error: (err && err.message ? err.message : String(err)) + ' — ' + extra
    };
  }

  /* --- Wandbox（默认远程后端） --- */

  function runWandbox(langDef, code, stdin, started) {
    var language = REMOTE_LANG[langDef.id];
    if (!language) {
      return Promise.resolve({
        ok: false, stdout: '', stderr: '', debug: [], remote: true, timeMs: 0,
        error: langDef.label + ' 暂时没有可用的远程编译器'
      });
    }
    return fetchCompilers().then(function (list) {
      var compiler = pickCompiler(list, language);
      if (!compiler) throw new Error('Wandbox 暂无 ' + langDef.label + ' 编译器');
      return fetch(WANDBOX_BASE + '/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ compiler: compiler.name, code: code, stdin: stdin || '' })
      }).then(function (res) {
        if (res.status === 429) throw new Error('请求过于频繁，请等几秒再试');
        if (res.status === 503) throw new Error('远程编译队列繁忙，稍后重试');
        if (!res.ok) throw new Error('执行接口返回 HTTP ' + res.status);
        return res.json().then(function (data) { return { data: data, compiler: compiler }; });
      });
    }).then(function (result) {
      var data = result.data || {};
      var compileError = normalize(data.compiler_error || '');
      var programError = normalize(data.program_error || '');
      var status = String(data.status == null ? '0' : data.status);
      var signal = String(data.signal || '');
      var error = '';
      if (compileError) {
        error = LHT.t('practice.compileError') + ':\n' + compileError;
      } else if (signal || status === '137' || status === '124') {
        error = LHT.t('practice.timeout') + (signal ? '（' + signal + '）' : '');
        if (programError) error += '\n' + programError;
      } else if (status !== '0') {
        error = programError || (LHT.t('practice.runtimeError') + '（退出码 ' + status + '）');
      }
      return {
        ok: !error,
        stdout: normalize(data.program_output || ''),
        stderr: programError,
        error: error,
        stack: LHT.t('practice.runnerVersion') + ': ' +
          (result.compiler.display_name || result.compiler.name) + ' ' + (result.compiler.version || ''),
        debug: [],
        remote: true,
        timeMs: Math.round((window.performance || Date).now() - started)
      };
    }).catch(function (err) {
      return remoteFailure(err, LHT.t('practice.remoteFail'));
    });
  }

  /* --- Piston（自建实例，可选） --- */

  function runPiston(langDef, code, stdin, started) {
    var base = String(LHT.REMOTE.pistonBase || '').replace(/\/+$/, '');
    if (!base) {
      return Promise.resolve({
        ok: false, stdout: '', stderr: '', debug: [], remote: true, timeMs: 0,
        error: LHT.t('practice.remoteFail')
      });
    }
    var headers = { 'Content-Type': 'application/json' };
    if (LHT.REMOTE.pistonKey) headers.Authorization = 'Bearer ' + LHT.REMOTE.pistonKey;

    return fetch(base + '/runtimes', { headers: headers })
      .then(function (res) {
        if (!res.ok) throw new Error('运行时列表请求失败 HTTP ' + res.status);
        return res.json();
      })
      .then(function (list) {
        var want = String(langDef.piston || langDef.id).toLowerCase();
        var match = null;
        list.forEach(function (rt) {
          var name = String(rt.language).toLowerCase();
          if (name !== want && name !== want + '.net') return;
          if (!match || compareVersions(rt.version, match.version) > 0) match = rt;
        });
        if (!match) throw new Error('该实例没有 ' + langDef.label + ' 运行时');
        return fetch(base + '/execute', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            language: match.language,
            version: match.version,
            files: [{ name: langDef.file || 'main.txt', content: code }],
            stdin: stdin || ''
          })
        });
      })
      .then(function (res) {
        if (!res.ok) throw new Error('执行接口返回 HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var compileOut = normalize((data.compile && data.compile.output) || '');
        var run = data.run || {};
        var compileFailed = data.compile && data.compile.code !== 0;
        var error = '';
        if (compileFailed) error = LHT.t('practice.compileError') + (compileOut ? ':\n' + compileOut : '');
        else if (run.code !== 0) error = normalize(run.stderr || '') || LHT.t('practice.runtimeError');
        return {
          ok: !error,
          stdout: normalize(run.stdout || ''),
          stderr: normalize(run.stderr || ''),
          error: error,
          stack: compileOut,
          debug: [],
          remote: true,
          timeMs: Math.round((window.performance || Date).now() - started)
        };
      })
      .catch(function (err) {
        return remoteFailure(err, LHT.t('practice.remoteFail'));
      });
  }

  function runRemote(langDef, code, stdin) {
    var started = (window.performance || Date).now();
    if (LHT.REMOTE.pistonBase) return runPiston(langDef, code, stdin, started);
    return runWandbox(langDef, code, stdin, started);
  }

  /* ---------- 统一入口 ---------- */

  LHT.runCode = function (langId, code, stdin, options) {
    var lang = LHT.languageById(langId);
    var timeout = (options && options.timeout) || DEFAULT_TIMEOUT;
    if (lang.runner === 'js') return runJavaScript(code, stdin, timeout);
    if (lang.runner === 'py') return runPython(code, stdin);
    return runRemote(lang, code, stdin);
  };

  LHT.warmUp = function (langId) {
    var lang = LHT.languageById(langId);
    if (lang.runner === 'py') return LHT.ensurePython();
    if (lang.runner === 'remote') {
      return LHT.REMOTE.pistonBase ? Promise.resolve() : fetchCompilers();
    }
    return Promise.resolve();
  };
})();
