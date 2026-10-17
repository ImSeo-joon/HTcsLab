/* ============================================================
   demo-dp.js — 动态规划填表
   最长公共子序列 / 编辑距离。表格一次性算好，但按行优先逐格揭示，
   每填一格就把它依赖的那几个格子高亮出来 —— 这正是 DP 省掉重复计算的地方。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var PROBLEMS = {
    lcs: {
      label: { zh: '最长公共子序列', en: 'Longest common subsequence' },
      cases: [['AGGTAB', 'GXTXAYB'], ['abcde', 'ace'], ['dynamic', 'program']],
      formula: {
        zh: 'dp[i][j] = dp[i-1][j-1] + 1（字符相同）／ max(dp[i-1][j], dp[i][j-1])（不同）',
        en: 'dp[i][j] = dp[i-1][j-1] + 1 when equal, otherwise max(dp[i-1][j], dp[i][j-1])'
      }
    },
    edit: {
      label: { zh: '编辑距离', en: 'Edit distance' },
      cases: [['horse', 'ros'], ['intention', 'execution'], ['table', 'stable']],
      formula: {
        zh: 'dp[i][j] = dp[i-1][j-1]（字符相同）／ 1 + min(上, 左, 左上)（不同）',
        en: 'dp[i][j] = dp[i-1][j-1] when equal, otherwise 1 + min(top, left, diagonal)'
      }
    }
  };

  var MAX_LEN = 10;

  LHT.Demos.register({
    id: 'dp',
    name: { zh: '动态规划填表', en: 'Dynamic programming table' },
    fr: 'Remplir la table',
    aspect: 2.05,
    noteKey: 'demos.dpNote',

    mount: function (ctx) {
      var kind = 'lcs';
      var a = 'AGGTAB';
      var b = 'GXTXAYB';
      var speed = 2;
      var table = null;
      var deps = null;
      var order = [];
      var revealed = 0;
      var playing = false;
      var caseIndex = 0;

      function build() {
        a = (a || '').slice(0, MAX_LEN);
        b = (b || '').slice(0, MAX_LEN);
        var n = a.length, m = b.length;
        table = [];
        deps = {};
        order = [];
        for (var i = 0; i <= n; i++) {
          table.push(new Array(m + 1).fill(0));
        }
        for (var r = 0; r <= n; r++) {
          for (var cIdx = 0; cIdx <= m; cIdx++) {
            if (r === 0) table[r][cIdx] = kind === 'lcs' ? 0 : cIdx;
            else if (cIdx === 0) table[r][cIdx] = r;
          }
        }
        for (i = 1; i <= n; i++) {
          for (var j = 1; j <= m; j++) {
            var same = a[i - 1] === b[j - 1];
            if (kind === 'lcs') {
              if (same) {
                table[i][j] = table[i - 1][j - 1] + 1;
                deps[i + ',' + j] = [[i - 1, j - 1]];
              } else {
                table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
                deps[i + ',' + j] = [[i - 1, j], [i, j - 1]];
              }
            } else {
              if (same) {
                table[i][j] = table[i - 1][j - 1];
                deps[i + ',' + j] = [[i - 1, j - 1]];
              } else {
                table[i][j] = 1 + Math.min(table[i - 1][j], table[i][j - 1], table[i - 1][j - 1]);
                deps[i + ',' + j] = [[i - 1, j], [i, j - 1], [i - 1, j - 1]];
              }
            }
            order.push([i, j]);
          }
        }
        revealed = 0;
        playing = false;
        loop.pause();
        updateButton();
        metrics();
        paint();
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var n = a.length, m = b.length;
        var headerH = 34;
        var cell = Math.min((view.w - 24) / (m + 2), (view.h - headerH - 18) / (n + 2));
        cell = Math.max(14, cell);
        var tableW = cell * (m + 2);
        var ox = (view.w - tableW) / 2;
        var oy = headerH;

        c.clearRect(0, 0, view.w, view.h);

        c.fillStyle = col.fg;
        c.font = '12.5px "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'left';
        c.fillText(LHT.pick(PROBLEMS[kind].formula), 10, 16);

        var current = revealed > 0 && revealed <= order.length ? order[revealed - 1] : null;
        var depList = current ? (deps[current[0] + ',' + current[1]] || []) : [];
        var filled = {};
        for (var k = 0; k < revealed && k < order.length; k++) filled[order[k][0] + ',' + order[k][1]] = true;

        function cellRect(i, j) {
          return { x: ox + (j + 1) * cell, y: oy + (i + 1) * cell };
        }

        c.font = Math.max(9, Math.min(15, cell * 0.46)) + 'px ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'center';
        c.textBaseline = 'middle';

        for (var i = 0; i <= n; i++) {
          for (var j = 0; j <= m; j++) {
            var rect = cellRect(i, j);
            var isBorder = i === 0 || j === 0;
            var key = i + ',' + j;
            var shown = isBorder || filled[key];
            var isCurrent = current && current[0] === i && current[1] === j;
            var isDep = depList.some(function (d) { return d[0] === i && d[1] === j; });

            c.fillStyle = isCurrent ? col.accent
              : isDep ? K.mix(col.canvas, col.violet, 0.42)
              : isBorder ? K.mix(col.canvas, col.border, 0.32)
              : shown ? K.mix(col.canvas, col.teal, 0.16)
              : K.mix(col.canvas, col.surface, 0.5);
            c.fillRect(rect.x, rect.y, cell - 1, cell - 1);

            if (isDep || isCurrent) {
              c.strokeStyle = isCurrent ? col.accent : col.violet;
              c.lineWidth = 1.5;
              c.strokeRect(rect.x + 0.75, rect.y + 0.75, cell - 2.5, cell - 2.5);
            }

            /* 高亮格是实心蓝底，文字色按底色亮度自动选黑白 */
            c.fillStyle = isCurrent ? K.onColor(col.accent) : (shown ? col.fg : col.dim);
            if (shown) c.fillText(String(table[i][j]), rect.x + cell / 2 - 0.5, rect.y + cell / 2 + 0.5);
          }
        }

        c.textAlign = 'center';
        c.fillStyle = col.teal;
        c.font = Math.max(9, Math.min(15, cell * 0.46)) + 'px ui-monospace, Menlo, Consolas, monospace';
        for (var jj = 1; jj <= m; jj++) {
          var rx = cellRect(0, jj);
          c.fillText(b[jj - 1], rx.x + cell / 2, oy - 1);
        }
        c.fillStyle = col.violet;
        for (var ii = 1; ii <= n; ii++) {
          var ry = cellRect(ii, 0);
          c.textAlign = 'right';
          c.fillText(a[ii - 1], ox - 1, ry.y + cell / 2);
          c.textAlign = 'center';
        }
        c.textBaseline = 'alphabetic';
      }

      function metrics() {
        var done = Math.min(revealed, order.length);
        var complete = done >= order.length && order.length > 0;
        ctx.setMetrics([
          { k: LHT.t('demos.dpAlgorithm'), v: LHT.pick(PROBLEMS[kind].label) },
          { k: LHT.t('demos.dpSize'), v: (a.length + 1) + ' × ' + (b.length + 1) },
          { k: LHT.t('demos.dpFilled'), v: done + ' / ' + order.length },
          { k: LHT.t('demos.dpAnswer'), v: complete ? String(table[a.length][b.length]) : '—' }
        ]);
      }

      function updateButton() {
        runBtn.set(playing ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      function advance(count) {
        if (!order.length) return;
        revealed = Math.min(revealed + count, order.length);
        if (revealed >= order.length) {
          playing = false;
          loop.pause();
          updateButton();
        }
      }

      /* ---- 控件 ---- */

      ctx.select(LHT.t('demos.dpAlgorithm'), Object.keys(PROBLEMS).map(function (key) {
        return { value: key, label: LHT.pick(PROBLEMS[key].label) };
      }), kind, function (value) {
        kind = value;
        caseIndex = 0;
        a = PROBLEMS[kind].cases[0][0];
        b = PROBLEMS[kind].cases[0][1];
        inputA.set(a);
        inputB.set(b);
        build();
      });

      var inputA = ctx.text('A', a, function (value) { a = value.slice(0, MAX_LEN); build(); });
      var inputB = ctx.text('B', b, function (value) { b = value.slice(0, MAX_LEN); build(); });

      ctx.button(LHT.t('demos.dpCase'), function () {
        var cases = PROBLEMS[kind].cases;
        caseIndex = (caseIndex + 1) % cases.length;
        a = cases[caseIndex][0];
        b = cases[caseIndex][1];
        inputA.set(a);
        inputB.set(b);
        build();
      });

      ctx.range(LHT.t('demos.speed'), { min: 1, max: 24, value: speed, step: 1 }, function (value) { speed = value; });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        if (revealed >= order.length) {
          revealed = 0;
          playing = true;
          loop.resume();
        } else {
          playing = !playing;
          if (playing) loop.resume(); else loop.pause();
        }
        updateButton();
        metrics();
        paint();
      }, 'primary');

      ctx.button(LHT.t('demos.step'), function () {
        playing = false;
        loop.pause();
        advance(1);
        updateButton();
        metrics();
        paint();
      });

      ctx.button(LHT.t('demos.reset'), function () { build(); });

      var loop = ctx.raf(function () {
        if (playing) advance(speed);
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });
      build();
    }
  });
})();
