/* ============================================================
   demo-integral.js — 定积分与黎曼和
   可调区间端点与分段数，实时看到梯形面积和逼近曲线下面积。
   同时显示近似值、精确值与误差，n 越大误差越小。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var FUNCS = {
    square: { zh: 'f(x) = x²', en: 'f(x) = x²', f: function (x) { return x * x; },
      exact: function (a, b) { return (b * b * b - a * a * a) / 3; } },
    cubic: { zh: 'f(x) = x³', en: 'f(x) = x³', f: function (x) { return x * x * x; },
      exact: function (a, b) { return (b * b * b * b - a * a * a * a) / 4; } },
    hyper: { zh: 'f(x) = 1/(1+x)', en: 'f(x) = 1/(1+x)', f: function (x) { return 1 / (1 + x); },
      exact: function (a, b) { return Math.log((1 + b) / (1 + a)); } }
  };

  LHT.Demos.register({
    id: 'integral',
    name: { zh: '定积分与黎曼和', en: 'Definite integrals and Riemann sums' },
    fr: 'Intégrales et sommes de Riemann',
    aspect: 2.0,
    noteKey: 'demos.integralNote',

    mount: function (ctx) {
      var key = 'square';
      var a = 0, b = 2;
      var n = 8;
      var animating = false;

      function trapezoid(a0, b0, count) {
        var h = (b0 - a0) / count;
        var total = 0;
        for (var i = 0; i < count; i++) {
          var x0 = a0 + i * h, x1 = x0 + h;
          total += (FUNCS[key].f(x0) + FUNCS[key].f(x1)) * h / 2;
        }
        return total;
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var f = FUNCS[key].f;

        var pad = 36;
        var plotW = Math.min(view.w - pad * 2, 620);
        var plotH = Math.min(view.h - pad * 2, 380);
        var ox = (view.w - plotW) / 2;
        var oy = (view.h - plotH) / 2;

        var xmin = Math.min(0, a) - 0.4, xmax = Math.max(b, 1) + 0.4;
        var ymin = 0, ymax = 0;
        for (var t = 0; t <= 60; t++) {
          var xv = xmin + (xmax - xmin) * t / 60;
          ymax = Math.max(ymax, f(xv));
        }
        ymax = Math.max(ymax, 0.5) * 1.15;

        function sx(x) { return ox + (x - xmin) / (xmax - xmin) * plotW; }
        function sy(y) { return oy + plotH - (y - ymin) / (ymax - ymin) * plotH; }

        c.clearRect(0, 0, view.w, view.h);
        c.fillStyle = K.mix(col.canvas, col.surface, 0.4);
        c.fillRect(ox, oy, plotW, plotH);
        c.strokeStyle = col.border;
        c.strokeRect(ox + 0.5, oy + 0.5, plotW - 1, plotH - 1);

        // 坐标轴
        c.strokeStyle = K.mix(col.canvas, col.dim, 0.8);
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(sx(xmin), sy(0)); c.lineTo(sx(xmax), sy(0));
        c.stroke();

        // 梯形
        var h = (b - a) / n;
        c.fillStyle = K.mix(col.canvas, col.accent, 0.28);
        c.strokeStyle = K.mix(col.canvas, col.accent, 0.75);
        c.lineWidth = 1;
        for (var i = 0; i < n; i++) {
          var x0 = a + i * h, x1 = x0 + h;
          var y0 = f(x0), y1 = f(x1);
          c.beginPath();
          c.moveTo(sx(x0), sy(0));
          c.lineTo(sx(x0), sy(y0));
          c.lineTo(sx(x1), sy(y1));
          c.lineTo(sx(x1), sy(0));
          c.closePath();
          c.fill();
          c.stroke();
        }

        // 曲线
        c.strokeStyle = col.gold;
        c.lineWidth = 2;
        c.beginPath();
        for (var s = 0; s <= 240; s++) {
          var xx = xmin + (xmax - xmin) * s / 240;
          if (s === 0) c.moveTo(sx(xx), sy(f(xx))); else c.lineTo(sx(xx), sy(f(xx)));
        }
        c.stroke();

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText(FUNCS[key].zh + ' · [' + a.toFixed(2) + ', ' + b.toFixed(2) + '] · n = ' + n, 8, 14);
      }

      function metrics() {
        var approx = trapezoid(a, b, n);
        var exact = FUNCS[key].exact(a, b);
        ctx.setMetrics([
          { k: LHT.t('demos.integralApprox'), v: approx.toFixed(5) },
          { k: LHT.t('demos.integralExact'), v: exact.toFixed(5) },
          { k: LHT.t('demos.integralError'), v: Math.abs(approx - exact).toExponential(2) },
          { k: 'n', v: String(n) }
        ]);
      }

      /* ---- 控件 ---- */
      ctx.select(LHT.t('demos.integralFunc'), Object.keys(FUNCS).map(function (k2) {
        return { value: k2, label: FUNCS[k2].en };
      }), key, function (v) { key = v; paint(); metrics(); });

      ctx.range('a', { min: -1.5, max: 1.5, value: a, step: 0.05 }, function (v) {
        a = Math.min(v, b - 0.1); paint(); metrics();
      });
      ctx.range('b', { min: -1, max: 3, value: b, step: 0.05 }, function (v) {
        b = Math.max(v, a + 0.1); paint(); metrics();
      });
      ctx.range('n', { min: 1, max: 64, value: n, step: 1 }, function (v) {
        n = v; paint(); metrics();
      });

      ctx.spacer();
      ctx.button(LHT.t('demos.integralAuto'), function () {
        animating = !animating;
        if (animating) loop.resume(); else loop.pause();
      }, 'primary');

      var loop = ctx.raf(function () {
        n = Math.min(64, n + 1);
        if (n >= 64) { animating = false; loop.pause(); }
        paint(); metrics();
      });
      loop.pause();

      ctx.onResize(paint);
      paint();
      metrics();
    }
  });
})();
