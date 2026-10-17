/* ============================================================
   demo-knn.js — k 近邻的决策边界
   背景是每个网格点被 k 近邻投票的结果，颜色深浅表示票数比例。
   k 调大边界变平滑、k=1 时边界锯齿状 —— 偏差-方差权衡的直观演示。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var DATASETS = {
    blobs: { zh: '两组团', en: 'Two blobs' },
    moons: { zh: '两个月牙', en: 'Two moons' },
    quad:  { zh: '异或象限', en: 'XOR quadrants' }
  };

  var GRID_W = 84;
  var GRID_H = 60;

  function randn() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  LHT.Demos.register({
    id: 'knn',
    name: { zh: 'k 近邻决策边界', en: 'k-NN decision boundary' },
    fr: 'Frontière des k plus proches',
    aspect: 2.05,
    noteKey: 'demos.knnNote',

    mount: function (ctx) {
      var k = 5;
      var dataset = 'moons';
      var amount = 160;
      var noise = 0.28;
      var points = [];
      var heat = null;
      var heatDirty = true;

      function generate() {
        points = [];
        var i, t, x, y, label;
        if (dataset === 'blobs') {
          for (i = 0; i < amount; i++) {
            label = i % 2;
            x = (label === 0 ? -0.45 : 0.45) + randn() * 0.28;
            y = randn() * 0.42;
            points.push({ x: x, y: y, label: label });
          }
        } else if (dataset === 'moons') {
          var half = Math.floor(amount / 2);
          for (i = 0; i < half; i++) {
            t = Math.random() * Math.PI;
            points.push({ x: Math.cos(t) - 0.45, y: Math.sin(t) - 0.22, label: 0 });
          }
          for (i = 0; i < amount - half; i++) {
            t = Math.random() * Math.PI;
            points.push({ x: 0.45 - Math.cos(t), y: 0.22 - Math.sin(t), label: 1 });
          }
        } else {
          for (i = 0; i < amount; i++) {
            x = randn() * 0.5;
            y = randn() * 0.5;
            points.push({ x: x, y: y, label: (x > 0) !== (y > 0) ? 1 : 0 });
          }
        }
        for (i = 0; i < points.length; i++) {
          points[i].x += randn() * noise * 0.5;
          points[i].y += randn() * noise * 0.5;
          if (Math.random() < noise * 0.1) points[i].label = 1 - points[i].label;
        }
        heatDirty = true;
      }

      function predict(x, y) {
        var list = [];
        for (var i = 0; i < points.length; i++) {
          var dx = points[i].x - x;
          var dy = points[i].y - y;
          list.push({ d: dx * dx + dy * dy, label: points[i].label });
        }
        list.sort(function (a, b) { return a.d - b.d; });
        var votes = 0;
        var take = Math.min(k, list.length);
        for (var j = 0; j < take; j++) votes += list[j].label;
        return votes / take;
      }

      function buildHeat() {
        if (!heat) {
          heat = document.createElement('canvas');
          heat.width = GRID_W;
          heat.height = GRID_H;
        }
        var hc = heat.getContext('2d');
        var img = hc.createImageData(GRID_W, GRID_H);
        var a = toRgb(ctx.colors().violet);
        var b = toRgb(ctx.colors().teal);
        var at = 0;
        for (var gy = 0; gy < GRID_H; gy++) {
          var y = 1.5 - (3 * gy) / (GRID_H - 1);
          for (var gx = 0; gx < GRID_W; gx++) {
            var x = (3 * gx) / (GRID_W - 1) - 1.5;
            var p = predict(x, y);
            img.data[at] = a[0] + (b[0] - a[0]) * p;
            img.data[at + 1] = a[1] + (b[1] - a[1]) * p;
            img.data[at + 2] = a[2] + (b[2] - a[2]) * p;
            img.data[at + 3] = 205;
            at += 4;
          }
        }
        hc.putImageData(img, 0, 0);
        heatDirty = false;
      }

      function toRgb(value) {
        var text = String(value || '').trim();
        var hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (hex) {
          var h = hex[1];
          if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
          return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
        }
        var rgb = text.match(/^rgba?\(([^)]+)\)$/i);
        if (rgb) {
          var parts = rgb[1].split(',').map(function (v) { return parseFloat(v) || 0; });
          return [parts[0], parts[1], parts[2]];
        }
        return [128, 128, 128];
      }

      function trainAccuracy() {
        var correct = 0;
        for (var i = 0; i < points.length; i++) {
          var p = predict(points[i].x, points[i].y);
          if ((p > 0.5 ? 1 : 0) === points[i].label) correct++;
        }
        return points.length ? correct / points.length : 0;
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var size = Math.min(view.w * 0.72, view.h) - 20;
        var ox = (view.w - size) / 2;
        var oy = (view.h - size) / 2;
        var R = 1.5;

        if (heatDirty) buildHeat();

        c.clearRect(0, 0, view.w, view.h);
        c.save();
        c.imageSmoothingEnabled = true;
        c.globalAlpha = 0.9;
        c.drawImage(heat, ox, oy, size, size);
        c.restore();
        c.strokeStyle = col.border;
        c.lineWidth = 1;
        c.strokeRect(ox + 0.5, oy + 0.5, size - 1, size - 1);

        function sx(x) { return ox + (x + R) / (2 * R) * size; }
        function sy(y) { return oy + (R - y) / (2 * R) * size; }

        for (var i = 0; i < points.length; i++) {
          c.beginPath();
          c.arc(sx(points[i].x), sy(points[i].y), 3, 0, Math.PI * 2);
          c.fillStyle = points[i].label === 1 ? col.teal : col.violet;
          c.fill();
          c.lineWidth = 1;
          c.strokeStyle = col.canvas;
          c.stroke();
        }

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText('k = ' + k + ' · ' + LHT.pick(DATASETS[dataset]) + ' · n = ' + points.length, 8, 14);
      }

      function metrics() {
        var area = 0, probes = 0;
        for (var gy = 0; gy < 14; gy++) {
          for (var gx = 0; gx < 20; gx++) {
            var x = (3 * gx) / 19 - 1.5;
            var y = 1.5 - (3 * gy) / 13;
            if (predict(x, y) > 0.5) area++;
            probes++;
          }
        }
        ctx.setMetrics([
          { k: LHT.t('demos.knnK'), v: String(k) },
          { k: LHT.t('demos.knnAccuracy'), v: (trainAccuracy() * 100).toFixed(1) + '%' },
          { k: LHT.t('demos.knnArea'), v: (area / probes * 100).toFixed(1) + '%' },
          { k: LHT.t('demos.points'), v: String(points.length) }
        ]);
      }

      /* ---- 控件 ---- */

      ctx.range(LHT.t('demos.knnK'), { min: 1, max: 25, value: k, step: 2 }, function (v) {
        k = v;
        heatDirty = true;
        metrics();
        paint();
      });

      ctx.select(LHT.t('demos.dataset'), Object.keys(DATASETS).map(function (key) {
        return { value: key, label: LHT.pick(DATASETS[key]) };
      }), dataset, function (v) {
        dataset = v;
        generate();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.points'), { min: 40, max: 400, value: amount, step: 20 }, function (v) {
        amount = v;
        generate();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.noise'), { min: 0, max: 1, value: noise, step: 0.05 }, function (v) {
        noise = v;
        generate();
        metrics();
        paint();
      });

      ctx.spacer();

      ctx.button(LHT.t('demos.shuffle'), function () {
        generate();
        metrics();
        paint();
      }, 'primary');

      ctx.onResize(function () { paint(); });

      generate();
      metrics();
      paint();
    }
  });
})();
