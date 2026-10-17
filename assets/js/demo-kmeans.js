/* ============================================================
   demo-kmeans.js — K 均值聚类
   合成若干高斯簇，随机初始化质心，逐步展示"分配 → 更新"两个阶段。
   可以清楚看到目标函数 J（簇内平方和）单调下降，以及空簇的处理。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  LHT.Demos.register({
    id: 'kmeans',
    name: { zh: 'K 均值聚类', en: 'K-means clustering' },
    fr: 'Classification automatique',
    aspect: 2.0,
    noteKey: 'demos.kmeansNote',

    mount: function (ctx) {
      var k = 3;
      var points = [];
      var centroids = [];
      var assign = [];
      var rounds = 0;
      var phase = 'assign';
      var running = false;
      var changed = 0;

      function generate() {
        points = [];
        var groups = 4;
        for (var g = 0; g < groups; g++) {
          var cx = (Math.random() * 2 - 1) * 0.72;
          var cy = (Math.random() * 2 - 1) * 0.72;
          for (var i = 0; i < 28; i++) {
            points.push({
              x: cx + gauss() * 0.17,
              y: cy + gauss() * 0.17
            });
          }
        }
        initCentroids();
      }

      function initCentroids() {
        centroids = [];
        var used = {};
        for (var c = 0; c < k; c++) {
          var pick;
          do { pick = Math.floor(Math.random() * points.length); }
          while (used[pick] && Object.keys(used).length < points.length);
          used[pick] = true;
          centroids.push({ x: points[pick].x, y: points[pick].y });
        }
        assign = new Array(points.length).fill(-1);
        rounds = 0;
        phase = 'assign';
        changed = 0;
        assignStep();          // 先做一次分配，加载后就能看到初始的分簇与 J
        rounds = 0;
        running = false;
        loop.pause();
        updateButton();
        metrics();
        paint();
      }

      function assignStep() {
        changed = 0;
        for (var i = 0; i < points.length; i++) {
          var best = 0, bestDist = Infinity;
          for (var c = 0; c < centroids.length; c++) {
            var dx = points[i].x - centroids[c].x;
            var dy = points[i].y - centroids[c].y;
            var d = dx * dx + dy * dy;
            if (d < bestDist) { bestDist = d; best = c; }
          }
          if (assign[i] !== best) changed++;
          assign[i] = best;
        }
        phase = 'update';
      }

      function updateStep() {
        var sum = [];
        for (var c = 0; c < centroids.length; c++) sum.push({ x: 0, y: 0, n: 0 });
        for (var i = 0; i < points.length; i++) {
          var c2 = assign[i];
          if (c2 < 0) continue;
          sum[c2].x += points[i].x;
          sum[c2].y += points[i].y;
          sum[c2].n++;
        }
        for (var j = 0; j < centroids.length; j++) {
          if (sum[j].n > 0) {
            centroids[j].x = sum[j].x / sum[j].n;
            centroids[j].y = sum[j].y / sum[j].n;
          }
        }
        rounds++;
        phase = 'assign';
      }

      function inertia() {
        var total = 0;
        for (var i = 0; i < points.length; i++) {
          var c = assign[i];
          if (c < 0) continue;
          var dx = points[i].x - centroids[c].x;
          var dy = points[i].y - centroids[c].y;
          total += dx * dx + dy * dy;
        }
        return total;
      }

      var PALETTE = ['accent', 'teal', 'violet', 'gold', 'danger', 'ok'];

      function colorOf(index) {
        var col = ctx.colors();
        var key = PALETTE[index % PALETTE.length];
        return col[key] || col.accent;
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var size = Math.min(view.w, view.h) - 24;
        var ox = (view.w - size) / 2;
        var oy = (view.h - size) / 2;
        var R = 1.15;

        function sx(x) { return ox + (x + R) / (2 * R) * size; }
        function sy(y) { return oy + (R - y) / (2 * R) * size; }

        c.clearRect(0, 0, view.w, view.h);

        c.fillStyle = K.mix(col.canvas, col.surface, 0.45);
        c.fillRect(ox, oy, size, size);
        c.strokeStyle = col.border;
        c.lineWidth = 1;
        c.strokeRect(ox + 0.5, oy + 0.5, size - 1, size - 1);

        for (var i = 0; i < points.length; i++) {
          var label = assign[i];
          c.beginPath();
          c.arc(sx(points[i].x), sy(points[i].y), 3.4, 0, Math.PI * 2);
          c.fillStyle = label < 0 ? col.dim : colorOf(label);
          c.globalAlpha = label < 0 ? 0.7 : 0.92;
          c.fill();
          c.globalAlpha = 1;
        }

        for (var j = 0; j < centroids.length; j++) {
          var px = sx(centroids[j].x), py = sy(centroids[j].y);
          c.beginPath();
          c.arc(px, py, 7, 0, Math.PI * 2);
          c.fillStyle = colorOf(j);
          c.fill();
          c.strokeStyle = col.canvas;
          c.lineWidth = 2;
          c.stroke();
          c.fillStyle = col.canvas;
          c.font = 'bold 9px "IBM Plex Mono", ui-monospace, monospace';
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText(String(j + 1), px, py + 0.5);
          c.textBaseline = 'alphabetic';
        }

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText('k = ' + k + ' · ' + (phase === 'assign' ? '分配' : '更新') + ' · 第 ' + rounds + ' 轮', 8, 14);
      }

      function metrics() {
        ctx.setMetrics([
          { k: LHT.t('demos.kmeansK'), v: String(k) },
          { k: LHT.t('demos.kmeansRounds'), v: String(rounds) },
          { k: LHT.t('demos.kmeansInertia'), v: inertia().toFixed(3) },
          { k: LHT.t('demos.kmeansChanged'), v: String(changed) }
        ]);
      }

      function updateButton() {
        runBtn.set(running ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      function stepOnce() {
        if (phase === 'assign') assignStep(); else updateStep();
      }

      /* ---- 控件 ---- */

      ctx.range(LHT.t('demos.kmeansK'), { min: 2, max: 6, value: k, step: 1 }, function (v) {
        k = v;
        initCentroids();
      });

      var speed = 1;
      ctx.range(LHT.t('demos.speed'), { min: 1, max: 4, value: speed, step: 1 }, function (v) { speed = v; });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        running = !running;
        if (running) loop.resume(); else loop.pause();
        updateButton();
      }, 'primary');

      ctx.button(LHT.t('demos.step'), function () {
        running = false;
        loop.pause();
        stepOnce();
        updateButton();
        metrics();
        paint();
      });

      ctx.button(LHT.t('demos.shuffle'), function () { generate(); });

      ctx.button(LHT.t('demos.kmeansReset'), function () { initCentroids(); });

      var loop = ctx.raf(function () {
        if (running) {
          for (var i = 0; i < speed; i++) stepOnce();
        }
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });
      generate();
    }
  });
})();
