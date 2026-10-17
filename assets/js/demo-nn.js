/* ============================================================
   demo-nn.js — 神经网络决策边界
   两层 tanh 隐藏层 + sigmoid 输出，全批量梯度下降，纯 JS 手写前向与反向。
   背景是把整个平面上每个点的预测概率画成热力图，所以能看到边界被推平的过程。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var DATASETS = {
    circle: { label: { zh: '同心圆', en: 'Concentric circles' } },
    xor:    { label: { zh: '异或棋盘', en: 'XOR quadrants' } },
    spiral: { label: { zh: '双螺旋', en: 'Two spirals' } },
    blobs:  { label: { zh: '高斯双簇', en: 'Gaussian blobs' } }
  };

  var GRID_W = 66;
  var GRID_H = 40;

  function randn() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function makeData(kind, count, noise) {
    var xs = [], ys = [], labels = [];
    var i, r, t, x, y, label;
    for (i = 0; i < count; i++) {
      if (kind === 'circle') {
        r = Math.sqrt(Math.random()) * 0.95;
        t = Math.random() * Math.PI * 2;
        x = r * Math.cos(t);
        y = r * Math.sin(t);
        label = r > 0.52 ? 1 : 0;
      } else if (kind === 'xor') {
        x = (Math.random() * 2 - 1) * 0.9;
        y = (Math.random() * 2 - 1) * 0.9;
        label = (x > 0) !== (y > 0) ? 1 : 0;
      } else if (kind === 'spiral') {
        var half = Math.floor(count / 2);
        var arm = i < half ? 0 : 1;
        var k = i < half ? i / half : (i - half) / half;
        var angle = 2.6 * Math.PI * k + arm * Math.PI;
        r = 0.16 + 0.78 * k;
        x = r * Math.cos(angle);
        y = r * Math.sin(angle);
        label = arm;
      } else {
        var cx = i % 2 === 0 ? -0.5 : 0.5;
        x = cx + randn() * 0.22;
        y = randn() * 0.36;
        label = i % 2 === 0 ? 0 : 1;
      }
      x += randn() * noise * 0.35;
      y += randn() * noise * 0.35;
      if (Math.random() < noise * 0.12) label = 1 - label;
      xs.push(Math.max(-1, Math.min(1, x)));
      ys.push(Math.max(-1, Math.min(1, y)));
      labels.push(label);
    }
    return { xs: xs, ys: ys, labels: labels };
  }

  LHT.Demos.register({
    id: 'nn',
    name: { zh: '神经网络决策边界', en: 'Neural decision boundary' },
    fr: 'Frontière de décision',
    aspect: 2.1,
    noteKey: 'demos.nnNote',

    mount: function (ctx) {
      var dataset = 'circle';
      var hidden = 8;
      var lr = 0.3;
      var noise = 0.35;
      var speed = 4;
      var MOMENTUM = 0.9;
      var data = null;
      var W1, b1, W2, b2, W3, b3;
      var vW1, vb1, vW2, vb2, vW3, vb3;
      var training = false;
      var epoch = 0;
      var loss = 0;
      var accuracy = 0;
      var heat = null;
      var heatDirty = true;

      var plot = { x: 0, y: 0, w: 0, h: 0 };

      function initModel() {
        function rand(size, scale) {
          var arr = new Float32Array(size);
          for (var i = 0; i < size; i++) arr[i] = (Math.random() * 2 - 1) * scale;
          return arr;
        }
        W1 = rand(hidden * 2, 1.0);
        b1 = new Float32Array(hidden);
        W2 = rand(hidden * hidden, 1.0 / Math.sqrt(hidden));
        b2 = new Float32Array(hidden);
        W3 = rand(hidden, 1.0 / Math.sqrt(hidden));
        b3 = new Float32Array(1);
        vW1 = new Float32Array(W1.length);
        vb1 = new Float32Array(hidden);
        vW2 = new Float32Array(W2.length);
        vb2 = new Float32Array(hidden);
        vW3 = new Float32Array(hidden);
        vb3 = new Float32Array(1);
        epoch = 0;
        loss = 0;
        accuracy = 0;
        heatDirty = true;
      }

      function forward(x, y, h1, h2) {
        var i, j, sum;
        for (i = 0; i < hidden; i++) {
          sum = b1[i] + W1[i * 2] * x + W1[i * 2 + 1] * y;
          h1[i] = Math.tanh(sum);
        }
        for (i = 0; i < hidden; i++) {
          sum = b2[i];
          for (j = 0; j < hidden; j++) sum += W2[i * hidden + j] * h1[j];
          h2[i] = Math.tanh(sum);
        }
        sum = b3[0];
        for (i = 0; i < hidden; i++) sum += W3[i] * h2[i];
        return 1 / (1 + Math.exp(-sum));
      }

      function trainSteps(steps) {
        var h1 = new Float32Array(hidden);
        var h2 = new Float32Array(hidden);
        var gW1 = new Float32Array(W1.length);
        var gb1 = new Float32Array(hidden);
        var gW2 = new Float32Array(W2.length);
        var gb2 = new Float32Array(hidden);
        var gW3 = new Float32Array(hidden);
        var gb3 = new Float32Array(1);
        var n = data.xs.length;
        var s, i, j, k;
        var d1 = new Float32Array(hidden);
        var d0 = new Float32Array(hidden);

        for (s = 0; s < steps; s++) {
          gW1.fill(0); gb1.fill(0); gW2.fill(0); gb2.fill(0); gW3.fill(0); gb3.fill(0);
          var totalLoss = 0;
          var correct = 0;

          for (k = 0; k < n; k++) {
            var x = data.xs[k], y = data.ys[k], label = data.labels[k];
            var out = forward(x, y, h1, h2);
            var eps = 1e-7;
            totalLoss += -(label * Math.log(out + eps) + (1 - label) * Math.log(1 - out + eps));
            if ((out > 0.5 ? 1 : 0) === label) correct++;

            var dz = out - label;
            for (i = 0; i < hidden; i++) {
              gW3[i] += dz * h2[i];
              gb3[0] += dz;
            }
            for (i = 0; i < hidden; i++) {
              var dh2 = dz * W3[i];
              d1[i] = dh2 * (1 - h2[i] * h2[i]);
            }
            for (i = 0; i < hidden; i++) {
              for (j = 0; j < hidden; j++) gW2[i * hidden + j] += d1[i] * h1[j];
              gb2[i] += d1[i];
            }
            for (j = 0; j < hidden; j++) {
              var dh1 = 0;
              for (i = 0; i < hidden; i++) dh1 += d1[i] * W2[i * hidden + j];
              d0[j] = dh1 * (1 - h1[j] * h1[j]);
            }
            for (j = 0; j < hidden; j++) {
              gW1[j * 2] += d0[j] * x;
              gW1[j * 2 + 1] += d0[j] * y;
              gb1[j] += d0[j];
            }
          }

          // 带动量的梯度下降：v = μv + lr·grad 的均值，参数沿 v 反向更新
          var scale = lr / n;
          for (i = 0; i < W3.length; i++) { vW3[i] = MOMENTUM * vW3[i] + scale * gW3[i]; W3[i] -= vW3[i]; }
          for (i = 0; i < W2.length; i++) { vW2[i] = MOMENTUM * vW2[i] + scale * gW2[i]; W2[i] -= vW2[i]; }
          for (i = 0; i < W1.length; i++) { vW1[i] = MOMENTUM * vW1[i] + scale * gW1[i]; W1[i] -= vW1[i]; }
          for (i = 0; i < hidden; i++) {
            vb1[i] = MOMENTUM * vb1[i] + scale * gb1[i]; b1[i] -= vb1[i];
            vb2[i] = MOMENTUM * vb2[i] + scale * gb2[i]; b2[i] -= vb2[i];
          }
          vb3[0] = MOMENTUM * vb3[0] + scale * gb3[0]; b3[0] -= vb3[0];

          epoch++;
          loss = totalLoss / n;
          accuracy = correct / n;
          heatDirty = true;
        }
      }

      /* ---- 绘制 ---- */

      function buildHeat() {
        if (!heat) {
          heat = document.createElement('canvas');
          heat.width = GRID_W;
          heat.height = GRID_H;
        }
        var hc = heat.getContext('2d');
        var img = hc.createImageData(GRID_W, GRID_H);
        var h1 = new Float32Array(hidden);
        var h2 = new Float32Array(hidden);
        var col = ctx.colors();
        var a = toRgb(col.violet);
        var b = toRgb(col.teal);
        var at = 0;
        for (var gy = 0; gy < GRID_H; gy++) {
          var y = 1 - (2 * gy) / (GRID_H - 1);
          for (var gx = 0; gx < GRID_W; gx++) {
            var x = (2 * gx) / (GRID_W - 1) - 1;
            var p = forward(x, y, h1, h2);
            img.data[at] = a[0] + (b[0] - a[0]) * p;
            img.data[at + 1] = a[1] + (b[1] - a[1]) * p;
            img.data[at + 2] = a[2] + (b[2] - a[2]) * p;
            img.data[at + 3] = 210;
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

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var size = Math.min(view.w - 20, view.h - 20);
        var ox = (view.w - size) / 2;
        var oy = (view.h - size) / 2;
        plot = { x: ox, y: oy, w: size, h: size };

        c.clearRect(0, 0, view.w, view.h);

        if (heatDirty) buildHeat();
        c.save();
        c.imageSmoothingEnabled = true;
        c.globalAlpha = 0.9;
        c.drawImage(heat, ox, oy, size, size);
        c.restore();

        c.strokeStyle = col.border;
        c.lineWidth = 1;
        c.strokeRect(ox + 0.5, oy + 0.5, size - 1, size - 1);

        // 中轴线
        c.strokeStyle = K.mix(col.canvas, col.border, 0.7);
        c.beginPath();
        c.moveTo(ox + size / 2, oy);
        c.lineTo(ox + size / 2, oy + size);
        c.moveTo(ox, oy + size / 2);
        c.lineTo(ox + size, oy + size / 2);
        c.stroke();

        for (var i = 0; i < data.xs.length; i++) {
          var px = ox + ((data.xs[i] + 1) / 2) * size;
          var py = oy + (1 - (data.ys[i] + 1) / 2) * size;
          c.beginPath();
          c.arc(px, py, 3.1, 0, Math.PI * 2);
          c.fillStyle = data.labels[i] ? col.teal : col.violet;
          c.fill();
          c.lineWidth = 1;
          c.strokeStyle = col.canvas;
          c.stroke();
        }

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'left';
        c.fillText(LHT.pick(DATASETS[dataset].label) +
          ' · ' + LHT.t('demos.hidden') + ' ' + hidden + '×2' +
          ' · lr ' + lr + ' · momentum ' + MOMENTUM, 6, 15);
      }

      function metrics() {
        ctx.setMetrics([
          { k: LHT.t('demos.epoch'), v: String(epoch) },
          { k: LHT.t('demos.loss'), v: loss.toFixed(4) },
          { k: LHT.t('demos.accuracy'), v: (accuracy * 100).toFixed(1) + '%' },
          { k: LHT.t('demos.hidden'), v: hidden + ' × 2' }
        ]);
      }

      function reset(hard) {
        data = makeData(dataset, 220, noise);
        initModel();
        training = false;
        loop.pause();
        trainBtn.set(LHT.t('demos.train'));
        if (hard) { metrics(); paint(); }
      }

      /* ---- 控件 ---- */

      ctx.select(LHT.t('demos.dataset'), Object.keys(DATASETS).map(function (key) {
        return { value: key, label: LHT.pick(DATASETS[key].label) };
      }), dataset, function (value) {
        dataset = value;
        reset(true);
      });

      ctx.range(LHT.t('demos.hidden'), { min: 2, max: 16, value: hidden, step: 1 }, function (value) {
        hidden = value;
        reset(true);
      });

      ctx.select(LHT.t('demos.lr'), [
        { value: '0.003', label: '0.003' },
        { value: '0.01', label: '0.01' },
        { value: '0.03', label: '0.03' },
        { value: '0.1', label: '0.1' },
        { value: '0.3', label: '0.3' },
        { value: '1', label: '1.0' }
      ], String(lr), function (value) { lr = Number(value); });

      ctx.range(LHT.t('demos.noise'), { min: 0, max: 1, value: noise, step: 0.05 }, function (value) {
        noise = value;
        data = makeData(dataset, 220, noise);
      });

      ctx.range(LHT.t('demos.speed'), { min: 1, max: 20, value: speed, step: 1 }, function (value) { speed = value; });

      ctx.spacer();

      var trainBtn = ctx.button(LHT.t('demos.train'), function () {
        training = !training;
        if (training) loop.resume(); else loop.pause();
        trainBtn.set(training ? LHT.t('demos.pauseTrain') : LHT.t('demos.train'));
      }, 'primary');

      ctx.button(LHT.t('demos.clearModel'), function () { reset(true); });

      var loop = ctx.raf(function () {
        if (training) trainSteps(speed);
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });
      reset(true);
    }
  });
})();
