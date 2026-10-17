/* ============================================================
   demo-pca.js — 主成分分析
   二维点云的第一主成分方向就是方差最大的方向。
   拖动相关系数可以看到主轴随之旋转，虚线是各点在主轴上的投影。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  function randn() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  LHT.Demos.register({
    id: 'pca',
    name: { zh: '主成分分析', en: 'Principal component analysis' },
    fr: 'Analyse en composantes principales',
    aspect: 1.95,
    noteKey: 'demos.pcaNote',

    mount: function (ctx) {
      var rho = 0.85;
      var spread = 1;
      var amount = 140;
      var showProjection = true;
      var spinning = false;
      var points = [];

      function generate() {
        points = [];
        for (var i = 0; i < amount; i++) {
          var u = randn();
          var v = randn();
          var x = u;
          var y = rho * u + Math.sqrt(Math.max(1e-6, 1 - rho * rho)) * v;
          points.push({ x: x * spread, y: y * spread });
        }
      }

      function covariance() {
        var n = points.length;
        var mx = 0, my = 0;
        for (var i = 0; i < n; i++) { mx += points[i].x; my += points[i].y; }
        mx /= n; my /= n;
        var sxx = 0, syy = 0, sxy = 0;
        for (i = 0; i < n; i++) {
          var dx = points[i].x - mx, dy = points[i].y - my;
          sxx += dx * dx; syy += dy * dy; sxy += dx * dy;
        }
        return { mx: mx, my: my, sxx: sxx / n, syy: syy / n, sxy: sxy / n };
      }

      function eigen(cov) {
        var base = (cov.sxx + cov.syy) / 2;
        var rad = Math.sqrt(((cov.sxx - cov.syy) / 2) * ((cov.sxx - cov.syy) / 2) + cov.sxy * cov.sxy);
        var theta = 0.5 * Math.atan2(2 * cov.sxy, cov.sxx - cov.syy);
        return { theta: theta, l1: base + rad, l2: base - rad };
      }

      var R = 3.1;

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var size = Math.min(view.w * 0.66, view.h) - 20;
        var ox = (view.w - size) / 2;
        var oy = (view.h - size) / 2;
        var cov = covariance();
        var eig = eigen(cov);

        function sx(x) { return ox + (x + R) / (2 * R) * size; }
        function sy(y) { return oy + (R - y) / (2 * R) * size; }

        c.clearRect(0, 0, view.w, view.h);
        c.fillStyle = K.mix(col.canvas, col.surface, 0.4);
        c.fillRect(ox, oy, size, size);

        // 坐标轴
        c.strokeStyle = K.mix(col.canvas, col.border, 0.75);
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(sx(cov.mx), oy + 4);
        c.lineTo(sx(cov.mx), oy + size - 4);
        c.moveTo(ox + 4, sy(cov.my));
        c.lineTo(ox + size - 4, sy(cov.my));
        c.stroke();

        var dir = { x: Math.cos(eig.theta), y: Math.sin(eig.theta) };
        var len = Math.sqrt(Math.max(eig.l1, 1e-6)) * 2.6;

        // 次轴（与主轴垂直）
        var perp = { x: -dir.y, y: dir.x };
        var len2 = Math.sqrt(Math.max(eig.l2, 1e-6)) * 2.6;
        c.strokeStyle = K.mix(col.canvas, col.dim, 0.8);
        c.setLineDash([4, 4]);
        c.beginPath();
        c.moveTo(sx(cov.mx - perp.x * len2), sy(cov.my - perp.y * len2));
        c.lineTo(sx(cov.mx + perp.x * len2), sy(cov.my + perp.y * len2));
        c.stroke();
        c.setLineDash([]);

        // 投影虚线
        if (showProjection) {
          c.strokeStyle = K.mix(col.canvas, col.violet, 0.5);
          c.lineWidth = 0.9;
          c.beginPath();
          for (var i = 0; i < points.length; i++) {
            var dx = points[i].x - cov.mx;
            var dy = points[i].y - cov.my;
            var t = dx * dir.x + dy * dir.y;
            var px = cov.mx + dir.x * t;
            var py = cov.my + dir.y * t;
            c.moveTo(sx(points[i].x), sy(points[i].y));
            c.lineTo(sx(px), sy(py));
          }
          c.stroke();
        }

        // 主轴
        c.strokeStyle = col.gold;
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(sx(cov.mx - dir.x * len), sy(cov.my - dir.y * len));
        c.lineTo(sx(cov.mx + dir.x * len), sy(cov.my + dir.y * len));
        c.stroke();

        // 点
        for (i = 0; i < points.length; i++) {
          c.beginPath();
          c.arc(sx(points[i].x), sy(points[i].y), 3, 0, Math.PI * 2);
          c.fillStyle = col.accent;
          c.globalAlpha = 0.85;
          c.fill();
          c.globalAlpha = 1;
          c.strokeStyle = col.canvas;
          c.lineWidth = 0.8;
          c.stroke();
        }

        c.strokeStyle = col.border;
        c.strokeRect(ox + 0.5, oy + 0.5, size - 1, size - 1);

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText('θ = ' + (eig.theta * 180 / Math.PI).toFixed(1) + '° · 方差解释比例 ' +
          (eig.l1 / (eig.l1 + eig.l2)).toFixed(3), 8, 14);
      }

      function metrics() {
        var cov = covariance();
        var eig = eigen(cov);
        ctx.setMetrics([
          { k: LHT.t('demos.pcaRho'), v: rho.toFixed(2) },
          { k: LHT.t('demos.pcaTheta'), v: (eig.theta * 180 / Math.PI).toFixed(1) + '°' },
          { k: LHT.t('demos.pcaL1'), v: eig.l1.toFixed(3) },
          { k: LHT.t('demos.pcaRatio'), v: (eig.l1 / (eig.l1 + eig.l2)).toFixed(3) }
        ]);
      }

      /* ---- 控件 ---- */

      ctx.range(LHT.t('demos.pcaRho'), { min: -0.98, max: 0.98, value: rho, step: 0.02 }, function (v) {
        rho = v;
        generate();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.size'), { min: 0.4, max: 2, value: spread, step: 0.1 }, function (v) {
        spread = v;
        generate();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.points'), { min: 30, max: 400, value: amount, step: 10 }, function (v) {
        amount = v;
        generate();
        metrics();
        paint();
      });

      ctx.checkbox(LHT.t('demos.pcaProject'), showProjection, function (v) {
        showProjection = v;
        paint();
      });

      ctx.spacer();

      ctx.button(LHT.t('demos.pcaSpin'), function () {
        spinning = !spinning;
        if (spinning) loop.resume(); else loop.pause();
      }, 'primary');

      ctx.button(LHT.t('demos.shuffle'), function () {
        generate();
        metrics();
        paint();
      });

      var loop = ctx.raf(function () {
        rho = 0.95 * Math.sin(Date.now() / 2600);
        generate();
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });
      generate();
      metrics();
      paint();
    }
  });
})();
