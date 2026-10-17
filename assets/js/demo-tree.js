/* ============================================================
   demo-tree.js — 决策树如何选择划分
   对二维数据贪心地找「信息增益最大」的轴对齐划分，逐层展开。
   画布上直接画出每个结点覆盖的矩形区域、切分线与叶子投票结果。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var DATASETS = {
    moons:  { zh: '两个月牙', en: 'Two moons' },
    quad:   { zh: '异或四象限', en: 'XOR quadrants' },
    blobs:  { zh: '重叠两团', en: 'Overlapping blobs' }
  };

  function randn() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function entropy(labels) {
    if (!labels.length) return 0;
    var count = {};
    for (var i = 0; i < labels.length; i++) count[labels[i]] = (count[labels[i]] || 0) + 1;
    var h = 0;
    for (var key in count) {
      var p = count[key] / labels.length;
      if (p > 0) h -= p * Math.log(p) / Math.LN2;
    }
    return h;
  }

  LHT.Demos.register({
    id: 'tree',
    name: { zh: '决策树与信息增益', en: 'Decision tree and information gain' },
    fr: 'Arbre de décision',
    aspect: 2.0,
    noteKey: 'demos.treeNote',

    mount: function (ctx) {
      var dataset = 'moons';
      var maxDepth = 2;
      var points = [];
      var nodes = [];
      var revealed = 0;
      var playing = false;
      var speed = 1;

      function generate() {
        points = [];
        var i, t, x, y, label;
        if (dataset === 'moons') {
          for (i = 0; i < 90; i++) {
            t = Math.random() * Math.PI;
            x = Math.cos(t) - 0.5 + randn() * 0.09;
            y = Math.sin(t) - 0.25 + randn() * 0.09;
            label = 0;
            points.push({ x: x, y: y, label: label });
          }
          for (i = 0; i < 90; i++) {
            t = Math.random() * Math.PI;
            x = 0.5 - Math.cos(t) + randn() * 0.09;
            y = 0.25 - Math.sin(t) + randn() * 0.09;
            points.push({ x: x, y: y, label: 1 });
          }
        } else if (dataset === 'quad') {
          for (i = 0; i < 180; i++) {
            x = randn() * 0.34;
            y = randn() * 0.34;
            label = (x > 0) !== (y > 0) ? 1 : 0;
            points.push({ x: x, y: y, label: label });
          }
        } else {
          for (i = 0; i < 170; i++) {
            x = (i % 2 === 0 ? -0.32 : 0.32) + randn() * 0.3;
            y = randn() * 0.42;
            points.push({ x: x, y: y, label: i % 2 === 0 ? 0 : 1 });
          }
        }
        build();
      }

      function majority(labels) {
        var count = { 0: 0, 1: 0 };
        for (var i = 0; i < labels.length; i++) count[labels[i]]++;
        return count[1] > count[0] ? 1 : 0;
      }

      function bestSplit(indices) {
        var best = { gain: 0, feature: -1, threshold: 0, left: [], right: [] };
        var labels = indices.map(function (id) { return points[id].label; });
        var base = entropy(labels);
        if (base <= 0) return best;

        for (var feature = 0; feature < 2; feature++) {
          var values = indices.map(function (id) {
            return feature === 0 ? points[id].x : points[id].y;
          }).sort(function (a, b) { return a - b; });
          for (var i = 0; i + 1 < values.length; i++) {
            if (values[i] === values[i + 1]) continue;
            var threshold = (values[i] + values[i + 1]) / 2;
            var left = [], right = [];
            for (var j = 0; j < indices.length; j++) {
              var v = feature === 0 ? points[indices[j]].x : points[indices[j]].y;
              if (v <= threshold) left.push(indices[j]); else right.push(indices[j]);
            }
            if (!left.length || !right.length) continue;
            var weighted = (left.length / indices.length) * entropy(left.map(function (id) { return points[id].label; }))
              + (right.length / indices.length) * entropy(right.map(function (id) { return points[id].label; }));
            var gain = base - weighted;
            if (gain > best.gain + 1e-9) {
              best = { gain: gain, feature: feature, threshold: threshold, left: left, right: right };
            }
          }
        }
        return best;
      }

      function bounds(indices) {
        var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
        for (var i = 0; i < indices.length; i++) {
          var p = points[indices[i]];
          if (p.x < x0) x0 = p.x;
          if (p.x > x1) x1 = p.x;
          if (p.y < y0) y0 = p.y;
          if (p.y > y1) y1 = p.y;
        }
        return { x0: x0, x1: x1, y0: y0, y1: y1 };
      }

      function build() {
        nodes = [];
        var root = {
          depth: 0,
          indices: points.map(function (p, i) { return i; }),
          rect: bounds(points.map(function (p, i) { return i; })),
          split: null,
          label: 0
        };
        var queue = [root];
        while (queue.length) {
          var node = queue.shift();
          node.label = majority(node.indices.map(function (id) { return points[id].label; }));
          node.entropy = entropy(node.indices.map(function (id) { return points[id].label; }));
          node.order = nodes.length;
          nodes.push(node);
          if (node.depth < maxDepth && node.indices.length >= 6) {
            var split = bestSplit(node.indices);
            if (split.gain > 1e-6) {
              node.split = split;
              queue.push({ depth: node.depth + 1, indices: split.left, rect: bounds(split.left), split: null, parent: node });
              queue.push({ depth: node.depth + 1, indices: split.right, rect: bounds(split.right), split: null, parent: node });
            }
          }
        }
        // 显式维护父子关系：BFS 顺序下兄弟结点是相邻的，展开时可以成对推进，
        // 这样任何时刻「已展开的部分树」都是一棵完整的树，区域不会互相重叠。
        for (var w = 0; w < nodes.length; w++) nodes[w].children = [];
        for (var v = 0; v < nodes.length; v++) {
          if (nodes[v].parent) nodes[v].parent.children.push(nodes[v]);
        }
        revealed = 1;          // 先把根结点作为唯一的叶子显示出来
        playing = false;
        loop.pause();
        updateButton();
        metrics();
        paint();
      }

      /** 已展开的部分树里，所有子结点都已出现的结点算内部结点 */
      function isInternal(node, revealedCount) {
        if (!node.children || !node.children.length) return false;
        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].order >= revealedCount) return false;
        }
        return true;
      }

      function activeLeaves(revealedCount) {
        var list = [];
        for (var i = 0; i < revealedCount && i < nodes.length; i++) {
          if (!isInternal(nodes[i], revealedCount)) list.push(nodes[i]);
        }
        return list;
      }

      function accuracyOf(revealedCount) {
        var correct = 0;
        var leaves = activeLeaves(revealedCount);
        for (var i = 0; i < leaves.length; i++) {
          for (var j = 0; j < leaves[i].indices.length; j++) {
            if (points[leaves[i].indices[j]].label === leaves[i].label) correct++;
          }
        }
        return points.length ? correct / points.length : 0;
      }

      var R = 1.35;

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var size = Math.min(view.w, view.h) - 20;
        var ox = (view.w - size) / 2;
        var oy = (view.h - size) / 2;

        function sx(x) { return ox + (x + R) / (2 * R) * size; }
        function sy(y) { return oy + (R - y) / (2 * R) * size; }

        c.clearRect(0, 0, view.w, view.h);
        c.fillStyle = K.mix(col.canvas, col.surface, 0.4);
        c.fillRect(ox, oy, size, size);

        var count = Math.min(revealed, nodes.length);
        for (var i = 0; i < count; i++) {
          var node = nodes[i];
          if (isInternal(node, count)) {
            // 内部结点：画切分线
            c.strokeStyle = col.gold;
            c.lineWidth = 1.8;
            c.beginPath();
            if (node.split.feature === 0) {
              c.moveTo(sx(node.split.threshold), sy(node.rect.y0) - 6);
              c.lineTo(sx(node.split.threshold), sy(node.rect.y1) + 6);
            } else {
              c.moveTo(sx(node.rect.x0) - 6, sy(node.split.threshold));
              c.lineTo(sx(node.rect.x1) + 6, sy(node.split.threshold));
            }
            c.stroke();
          } else {
            // 叶子：填色表示投票结果
            c.fillStyle = node.label === 1
              ? K.mix(col.canvas, col.teal, 0.34)
              : K.mix(col.canvas, col.violet, 0.34);
            c.fillRect(sx(node.rect.x0), sy(node.rect.y1),
              Math.max(1, sx(node.rect.x1) - sx(node.rect.x0)),
              Math.max(1, sy(node.rect.y0) - sy(node.rect.y1)));
          }
        }

        for (var p = 0; p < points.length; p++) {
          c.beginPath();
          c.arc(sx(points[p].x), sy(points[p].y), 3.1, 0, Math.PI * 2);
          c.fillStyle = points[p].label === 1 ? col.teal : col.violet;
          c.fill();
          c.strokeStyle = col.canvas;
          c.lineWidth = 0.8;
          c.stroke();
        }

        c.strokeStyle = col.border;
        c.strokeRect(ox + 0.5, oy + 0.5, size - 1, size - 1);

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText(LHT.pick(DATASETS[dataset]) + ' · 深度 ' + maxDepth +
          ' · 已展开 ' + count + '/' + nodes.length, 8, 14);
      }

      function metrics() {
        var count = Math.min(revealed, nodes.length);
        var leaves = activeLeaves(count);
        var gainSum = 0, gainCount = 0, entropySum = 0;
        for (var i = 0; i < count; i++) {
          var node = nodes[i];
          if (isInternal(node, count)) {
            gainSum += node.split.gain;
            gainCount++;
          }
        }
        for (var j = 0; j < leaves.length; j++) entropySum += leaves[j].entropy;
        ctx.setMetrics([
          { k: LHT.t('demos.treeLeaves'), v: String(leaves.length) },
          { k: LHT.t('demos.treeAccuracy'), v: (accuracyOf(count) * 100).toFixed(1) + '%' },
          { k: LHT.t('demos.treeGain'), v: gainCount ? (gainSum / gainCount).toFixed(3) : '—' },
          { k: LHT.t('demos.treeEntropy'), v: leaves.length ? (entropySum / leaves.length).toFixed(3) : '—' }
        ]);
      }

      function updateButton() {
        runBtn.set(playing ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      /** 根结点先单独展开，之后每次成对展开兄弟结点 */
      function advance(count) {
        if (!nodes.length) return;
        if (revealed === 0) revealed = 1;
        revealed = Math.min(revealed + 2 * count, nodes.length);
        if (revealed >= nodes.length) {
          playing = false;
          loop.pause();
          updateButton();
        }
      }

      /* ---- 控件 ---- */

      ctx.select(LHT.t('demos.dataset'), Object.keys(DATASETS).map(function (key) {
        return { value: key, label: LHT.pick(DATASETS[key]) };
      }), dataset, function (v) { dataset = v; generate(); });

      ctx.range(LHT.t('demos.treeDepth'), { min: 1, max: 3, value: maxDepth, step: 1 }, function (v) {
        maxDepth = v;
        build();
      });

      ctx.range(LHT.t('demos.speed'), { min: 1, max: 4, value: speed, step: 1 }, function (v) { speed = v; });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        if (revealed >= nodes.length) revealed = 0;
        playing = !playing;
        if (playing) loop.resume(); else loop.pause();
        updateButton();
      }, 'primary');

      ctx.button(LHT.t('demos.step'), function () {
        playing = false;
        loop.pause();
        advance(1);
        updateButton();
        metrics();
        paint();
      });

      ctx.button(LHT.t('demos.shuffle'), function () { generate(); });

      var loop = ctx.raf(function () {
        if (playing) advance(speed);
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });
      generate();
    }
  });
})();
