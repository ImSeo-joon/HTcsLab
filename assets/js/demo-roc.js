/* ============================================================
   demo-roc.js — ROC 曲线与 P-R 曲线
   同一批带分数的样本，拖动阈值可以同时看到两个曲线上的工作点如何移动，
   以及对应的混淆矩阵。重叠度越小，AUC 越接近 1。
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
    id: 'roc',
    name: { zh: 'ROC 曲线与 P-R 曲线', en: 'ROC and precision-recall curves' },
    fr: 'Courbes ROC et précision-rappel',
    aspect: 1.95,
    noteKey: 'demos.rocNote',

    mount: function (ctx) {
      var overlap = 1.1;      // 两类均值之差，越小越难分
      var amount = 220;
      var threshold = 0.5;
      var samples = [];
      var stats = null;

      function generate() {
        samples = [];
        var i;
        for (i = 0; i < amount; i++) {
          var label = i % 2;
          var mean = label === 1 ? 0.5 + overlap * 0.22 : 0.5 - overlap * 0.22;
          var score = Math.max(0, Math.min(1, mean + randn() * 0.13));
          samples.push({ score: score, label: label });
        }
        computeStats();
      }

      function computeStats() {
        var ordered = samples.slice().sort(function (a, b) { return b.score - a.score; });
        var P = 0, N = 0, i;
        for (i = 0; i < ordered.length; i++) { if (ordered[i].label === 1) P++; else N++; }

        var roc = [{ x: 0, y: 0 }];
        var pr = [];
        var tp = 0, fp = 0, area = 0, best = 0;
        for (i = 0; i < ordered.length; i++) {
          if (ordered[i].label === 1) tp++; else fp++;
          var fpr = N > 0 ? fp / N : 0;
          var tpr = P > 0 ? tp / P : 0;
          roc.push({ x: fpr, y: tpr });
          var precision = tp + fp > 0 ? tp / (tp + fp) : 1;
          var recall = P > 0 ? tp / P : 0;
          pr.push({ x: recall, y: precision });
          if (Math.min(precision, recall) > best) best = Math.min(precision, recall);
          if (ordered[i].label === 0) area += tpr * (1 / N);
        }
        stats = { P: P, N: N, roc: roc, pr: pr, auc: area, bep: best, ordered: ordered };
      }

      function confusion(limit) {
        var tp = 0, fp = 0, fn = 0, tn = 0;
        for (var i = 0; i < samples.length; i++) {
          var positive = samples[i].score >= limit;
          if (samples[i].label === 1 && positive) tp++;
          else if (samples[i].label === 0 && positive) fp++;
          else if (samples[i].label === 1 && !positive) fn++;
          else tn++;
        }
        var fpr = stats.N > 0 ? fp / stats.N : 0;
        var tpr = stats.P > 0 ? tp / stats.P : 0;
        var precision = tp + fp > 0 ? tp / (tp + fp) : 1;
        var recall = stats.P > 0 ? tp / stats.P : 0;
        return { tp: tp, fp: fp, fn: fn, tn: tn, fpr: fpr, tpr: tpr, precision: precision, recall: recall };
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var gap = 26;
        var size = Math.min((view.w - gap - 24) / 2, view.h - 46);
        var top = 26;
        var boxes = [
          { x: 12, y: top, size: size, title: 'ROC' },
          { x: 12 + size + gap, y: top, size: size, title: 'P-R' }
        ];
        var current = confusion(threshold);

        c.clearRect(0, 0, view.w, view.h);

        function frame(box) {
          c.fillStyle = K.mix(col.canvas, col.surface, 0.4);
          c.fillRect(box.x, box.y, box.size, box.size);
          c.strokeStyle = col.border;
          c.lineWidth = 1;
          c.strokeRect(box.x + 0.5, box.y + 0.5, box.size - 1, box.size - 1);
          c.fillStyle = col.muted;
          c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
          c.textAlign = 'left';
          c.fillText(box.title, box.x, box.y - 8);
        }

        /* ---- 左：ROC ---- */
        var roc = boxes[0];
        frame(roc);
        c.strokeStyle = K.mix(col.canvas, col.dim, 0.85);
        c.setLineDash([4, 4]);
        c.beginPath();
        c.moveTo(roc.x, roc.y + roc.size);
        c.lineTo(roc.x + roc.size, roc.y);
        c.stroke();
        c.setLineDash([]);

        function px(box, t) { return box.x + t * box.size; }
        function py(box, t) { return box.y + box.size - t * box.size; }

        c.strokeStyle = col.accent;
        c.lineWidth = 2;
        c.beginPath();
        stats.roc.forEach(function (pt, i) {
          if (i === 0) c.moveTo(px(roc, pt.x), py(roc, pt.y));
          else c.lineTo(px(roc, pt.x), py(roc, pt.y));
        });
        c.stroke();
        c.beginPath();
        c.arc(px(roc, current.fpr), py(roc, current.tpr), 5, 0, Math.PI * 2);
        c.fillStyle = col.gold;
        c.fill();
        c.fillStyle = col.muted;
        c.font = '11px "IBM Plex Mono", ui-monospace, monospace';
        c.fillText('FPR', roc.x + roc.size - 26, roc.y + roc.size + 14);
        c.fillText('TPR', roc.x + 4, roc.y + 12);

        /* ---- 右：P-R ---- */
        var prBox = boxes[1];
        frame(prBox);
        c.strokeStyle = col.teal;
        c.lineWidth = 2;
        c.beginPath();
        stats.pr.forEach(function (pt, i) {
          if (i === 0) c.moveTo(px(prBox, pt.x), py(prBox, pt.y));
          else c.lineTo(px(prBox, pt.x), py(prBox, pt.y));
        });
        c.stroke();
        c.beginPath();
        c.arc(px(prBox, current.recall), py(prBox, current.precision), 5, 0, Math.PI * 2);
        c.fillStyle = col.gold;
        c.fill();
        c.fillStyle = col.muted;
        c.fillText('recall', prBox.x + prBox.size - 42, prBox.y + prBox.size + 14);
        c.fillText('precision', prBox.x + 4, prBox.y + 12);

        /* ---- 下方：阈值位置与混淆矩阵 ---- */
        var barY = top + size + 26;
        var barW = view.w - 24;
        c.fillStyle = K.mix(col.canvas, col.border, 0.6);
        c.fillRect(12, barY, barW, 6);
        c.fillStyle = col.gold;
        c.fillRect(12 + (barW - 3) * threshold, barY - 3, 3, 12);
        c.fillStyle = col.dim;
        c.font = '10.5px "IBM Plex Mono", ui-monospace, monospace';
        c.fillText('score 0', 12, barY + 22);
        c.fillText('1', 12 + barW - 6, barY + 22);
      }

      function metrics() {
        var current = confusion(threshold);
        ctx.setMetrics([
          { k: 'AUC', v: stats.auc.toFixed(3) },
          { k: 'BEP', v: stats.bep.toFixed(3) },
          { k: LHT.t('demos.rocPoint'), v: 'P ' + current.precision.toFixed(2) + ' / R ' + current.recall.toFixed(2) },
          { k: LHT.t('demos.rocMatrix'), v: current.tp + ' / ' + current.fp + ' / ' + current.fn + ' / ' + current.tn }
        ]);
      }

      /* ---- 控件 ---- */

      ctx.range(LHT.t('demos.rocOverlap'), { min: 0.2, max: 2.4, value: overlap, step: 0.1 }, function (v) {
        overlap = v;
        generate();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.points'), { min: 60, max: 600, value: amount, step: 20 }, function (v) {
        amount = v;
        generate();
        metrics();
        paint();
      });

      ctx.range(LHT.t('demos.rocThreshold'), { min: 0, max: 1, value: threshold, step: 0.01 }, function (v) {
        threshold = v;
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
