/* ============================================================
   demo-attn.js — 注意力矩阵
   给每个词元一个 d 维向量，用两个随机投影得到 Q 与 K，
   计算 QKᵀ/√d 后对每一行做 softmax —— 这就是自注意力里那句
   「每个词元按权重看向其他词元」的完整数学过程。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var TOKENS = ['la', 'table', 'haute', 'le', 'chat', 'dort', 'sur', 'un',
    'livre', 'noir', 'code', 'vite', 'et', 'encore'];

  var STRUCTURES = {
    cluster:  { zh: '语义聚类', en: 'Semantic clusters' },
    position: { zh: '位置局部性', en: 'Positional locality' },
    random:   { zh: '完全随机', en: 'Pure noise' }
  };

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a += 0x6D2B79F5;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  LHT.Demos.register({
    id: 'attention',
    name: { zh: '注意力矩阵', en: 'Attention matrix' },
    fr: 'Matrice d\u2019attention',
    aspect: 1.75,
    noteKey: 'demos.attentionNote',

    mount: function (ctx) {
      var tokens = 8;
      var dim = 12;
      var temperature = 1;
      var structure = 'cluster';
      var seed = 20261017;
      var selectedRow = 0;
      var weights = [];
      var peakWeight = 1;
      var matrix = { x: 0, y: 0, cell: 0, size: 0, labelW: 34 };

      function build() {
        var rnd = mulberry32(seed);
        var n = tokens;
        var d = dim;
        var i, j, k;

        // 词元向量：三种结构决定相似度的来源
        var emb = [];
        var centers = [];
        for (k = 0; k < 3; k++) {
          var center = [];
          for (j = 0; j < d; j++) center.push(rnd() * 2 - 1);
          centers.push(center);
        }
        for (i = 0; i < n; i++) {
          var vec = new Array(d);
          if (structure === 'position') {
            for (j = 0; j < d; j++) {
              vec[j] = Math.sin(i * (1 + (j % 4)) * 0.6 + j * 0.21);
            }
          } else if (structure === 'cluster') {
            var c = centers[i % 3];
            for (j = 0; j < d; j++) vec[j] = c[j] + (rnd() * 2 - 1) * 0.22;
          } else {
            for (j = 0; j < d; j++) vec[j] = rnd() * 2 - 1;
          }
          // 归一化：让点积落在 [-1, 1]，softmax 的对比度才可控
          var norm = 0;
          for (j = 0; j < d; j++) norm += vec[j] * vec[j];
          norm = Math.sqrt(norm) || 1;
          for (j = 0; j < d; j++) vec[j] = vec[j] / norm;
          emb.push(vec);
        }

        // Q、K 投影矩阵
        function projection() {
          var m = [];
          for (i = 0; i < d; i++) {
            var row = new Array(d);
            for (j = 0; j < d; j++) row[j] = (rnd() * 2 - 1) / Math.sqrt(d);
            m.push(row);
          }
          return m;
        }
        /* 真实 Transformer 里 Q 和 K 是两套各自学习的投影；这里为了演示
           「注意力 = 向量相似度」这件事，让两者共用同一个随机投影，
           否则两个不同随机投影会把嵌入里的结构洗掉，softmax 变成均匀分布。 */
        var W = projection();

        function project(v, m) {
          var out = new Array(d).fill(0);
          for (i = 0; i < d; i++) {
            var sum = 0;
            for (j = 0; j < d; j++) sum += m[i][j] * v[j];
            out[i] = sum;
          }
          return out;
        }

        var Q = emb.map(function (v) { return project(v, W); });
        var Kk = emb.map(function (v) { return project(v, W); });
        /* 增益：单位向量的点积本身很小，乘一个系数后 softmax 才会有明显的峰 */
        var GAIN = 5;
        var scoreScale = GAIN / temperature;

        peakWeight = 0;
        weights = [];
        for (i = 0; i < n; i++) {
          var scores = new Array(n);
          var best = -Infinity;
          for (j = 0; j < n; j++) {
            var dot = 0;
            for (k = 0; k < d; k++) dot += Q[i][k] * Kk[j][k];
            scores[j] = dot * scoreScale;
            if (scores[j] > best) best = scores[j];
          }
          var total = 0;
          var exps = new Array(n);
          for (j = 0; j < n; j++) {
            exps[j] = Math.exp(scores[j] - best);
            total += exps[j];
          }
          var probs = new Array(n);
          for (j = 0; j < n; j++) {
            probs[j] = exps[j] / total;
            if (probs[j] > peakWeight) peakWeight = probs[j];
          }
          weights.push(probs);
        }
        if (selectedRow >= n) selectedRow = 0;
      }

      function entropy(probs) {
        var h = 0;
        for (var i = 0; i < probs.length; i++) {
          var p = probs[i];
          if (p > 1e-9) h -= p * Math.log(p);
        }
        return h;
      }

      /* ---- 绘制 ---- */

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var n = tokens;
        var labelW = 34;
        var topH = 18;
        var size = Math.min(view.h - topH - 8, (view.w - labelW - 24) * 0.56);
        var ox = labelW;
        var oy = topH;
        var cell = size / n;
        matrix = { x: ox, y: oy, cell: cell, size: size, labelW: labelW };

        c.clearRect(0, 0, view.w, view.h);

        var maxW = peakWeight || 1;
        for (var i = 0; i < n; i++) {
          for (var j = 0; j < n; j++) {
            var w = weights[i][j];
            var x = ox + j * cell;
            var y = oy + i * cell;
            c.fillStyle = K.mix(col.canvas, col.accent, Math.pow(w / maxW, 0.75));
            c.fillRect(x, y, cell - 0.6, cell - 0.6);
          }
        }

        // 选中行描边
        c.strokeStyle = col.fg;
        c.lineWidth = 1.6;
        c.strokeRect(ox - 0.5, oy + selectedRow * cell - 0.5, size + 1, cell + 1);

        c.textAlign = 'center';
        c.fillStyle = col.muted;
        c.font = Math.max(9, Math.min(11, cell * 0.42)) + 'px ui-monospace, Menlo, Consolas, monospace';
        for (j = 0; j < n; j++) {
          c.fillText(TOKENS[j % TOKENS.length].slice(0, 4), ox + j * cell + cell / 2, oy - 6);
        }

        c.textBaseline = 'middle';
        c.textAlign = 'right';
        c.fillStyle = col.muted;
        for (i = 0; i < n; i++) {
          c.fillText(TOKENS[i % TOKENS.length].slice(0, 4), ox - 4, oy + i * cell + cell / 2);
        }
        c.textBaseline = 'alphabetic';

        /* 右侧：选中行的权重柱状图 */
        var bx = ox + size + 22;
        var bw = view.w - bx - 8;
        var rowH = Math.max(9, Math.min(20, (view.h - 24) / n));
        var labelSpace = Math.min(48, Math.max(20, bw * 0.3));
        var barSpace = Math.max(20, bw - labelSpace);
        c.font = Math.max(9, Math.min(12, rowH * 0.75)) + 'px ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'right';
        for (j = 0; j < n; j++) {
          var by = 14 + j * rowH;
          var p = weights[selectedRow][j];
          c.fillStyle = col.muted;
          c.fillText(TOKENS[j % TOKENS.length].slice(0, 6), bx + labelSpace - 6, by + rowH * 0.72);
          c.fillStyle = K.mix(col.canvas, col.border, 0.5);
          c.fillRect(bx + labelSpace, by + 1, barSpace, rowH - 3);
          c.fillStyle = j === argmax(weights[selectedRow]) ? col.accent : col.teal;
          c.fillRect(bx + labelSpace, by + 1, Math.max(1, barSpace * (p / maxW)), rowH - 3);
        }

        c.textAlign = 'left';
        c.fillStyle = col.muted;
        c.fillText(LHT.t('demos.similarity') + ' · ' + LHT.t('demos.selectedRow') + ': ' +
          TOKENS[selectedRow % TOKENS.length], 6, view.h - 6);
      }

      function argmax(list) {
        var best = 0;
        for (var i = 1; i < list.length; i++) if (list[i] > list[best]) best = i;
        return best;
      }

      function metrics() {
        var total = 0;
        weights.forEach(function (row) { total += entropy(row); });
        var normalized = weights.length ? total / weights.length / Math.log(Math.max(2, tokens)) : 0;
        ctx.setMetrics([
          { k: LHT.t('demos.tokens'), v: String(tokens) },
          { k: LHT.t('demos.dim'), v: String(dim) },
          { k: LHT.t('demos.maxWeight'), v: peakWeight.toFixed(3) },
          { k: LHT.t('demos.entropy'), v: normalized.toFixed(3) }
        ]);
      }

      /* ---- 交互：点击选行 ---- */

      function onClick(event) {
        var rect = ctx.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var row = Math.floor((y - matrix.y) / matrix.cell);
        if (row < 0 || row >= tokens) return;
        if (x < matrix.x - matrix.labelW || x > matrix.x + matrix.size) return;
        selectedRow = row;
        metrics();
        paint();
      }

      ctx.canvas.addEventListener('click', onClick);
      ctx.onCleanup(function () { ctx.canvas.removeEventListener('click', onClick); });

      /* ---- 控件 ---- */

      ctx.range(LHT.t('demos.tokens'), { min: 4, max: TOKENS.length, value: tokens, step: 1 }, function (value) {
        tokens = value;
        selectedRow = 0;
        build();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.dim'), { min: 4, max: 32, value: dim, step: 2 }, function (value) {
        dim = value;
        build();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.temperature'), { min: 0.2, max: 3, value: temperature, step: 0.1 }, function (value) {
        temperature = value;
        build();
        metrics();
        paint();
      });

      ctx.select(LHT.t('demos.structure'), Object.keys(STRUCTURES).map(function (key) {
        return { value: key, label: LHT.pick(STRUCTURES[key]) };
      }), structure, function (value) {
        structure = value;
        build();
        metrics();
        paint();
      });

      ctx.spacer();

      ctx.button(LHT.t('demos.shuffle'), function () {
        seed = Math.floor(Math.random() * 1e9);
        build();
        metrics();
        paint();
      }, 'primary');

      ctx.onResize(function () { paint(); });

      build();
      metrics();
      paint();
    }
  });
})();
