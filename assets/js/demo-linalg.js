/* ============================================================
   demo-linalg.js — 线性变换与行列式
   用四个滑块调 2×2 矩阵，看网格怎么被拉伸、旋转、压扁。
   单位方格变形后的面积就是 |det|；det=0 时整个平面塌成一条线。
   画布任意位置可以拖动一个向量 v，同时显示 A·v。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  LHT.Demos.register({
    id: 'linalg',
    name: { zh: '线性变换与行列式', en: 'Linear maps and determinants' },
    fr: 'Applications linéaires',
    aspect: 1.9,
    noteKey: 'demos.linalgNote',

    mount: function (ctx) {
      var a = 1, b = 0.5, c = 0.3, d = 1;
      var vec = { x: 1.6, y: 1.1 };
      var R = 3.2;

      function det() { return a * d - b * c; }
      function apply(p) { return { x: a * p.x + b * p.y, y: c * p.x + d * p.y }; }

      function paint() {
        var view = ctx.view();
        var cv = view.c;
        var col = ctx.colors();
        var size = Math.min(view.w, view.h) - 16;
        var ox = (view.w - size) / 2;
        var oy = (view.h - size) / 2;

        function sx(x) { return ox + (x + R) / (2 * R) * size; }
        function sy(y) { return oy + (R - y) / (2 * R) * size; }

        cv.clearRect(0, 0, view.w, view.h);
        cv.fillStyle = K.mix(col.canvas, col.surface, 0.42);
        cv.fillRect(ox, oy, size, size);

        // 原始网格（很淡）
        cv.strokeStyle = K.mix(col.canvas, col.border, 0.45);
        cv.lineWidth = 1;
        for (var i = -3; i <= 3; i++) {
          cv.beginPath();
          cv.moveTo(sx(i), sy(-R)); cv.lineTo(sx(i), sy(R));
          cv.moveTo(sx(-R), sy(i)); cv.lineTo(sx(R), sy(i));
          cv.stroke();
        }

        // 变换后的网格
        cv.strokeStyle = K.mix(col.canvas, col.accent, 0.55);
        cv.lineWidth = 1.1;
        for (var k = -3; k <= 3; k++) {
          var p1 = apply({ x: k, y: -R }), p2 = apply({ x: k, y: R });
          cv.beginPath(); cv.moveTo(sx(p1.x), sy(p1.y)); cv.lineTo(sx(p2.x), sy(p2.y)); cv.stroke();
          var q1 = apply({ x: -R, y: k }), q2 = apply({ x: R, y: k });
          cv.beginPath(); cv.moveTo(sx(q1.x), sy(q1.y)); cv.lineTo(sx(q2.x), sy(q2.y)); cv.stroke();
        }

        // 单位方格及其像
        var corners = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
        cv.fillStyle = K.mix(col.canvas, col.gold, 0.3);
        cv.beginPath();
        corners.forEach(function (p, i) {
          var t = apply(p);
          if (i === 0) cv.moveTo(sx(t.x), sy(t.y)); else cv.lineTo(sx(t.x), sy(t.y));
        });
        cv.closePath(); cv.fill();
        cv.strokeStyle = col.gold; cv.lineWidth = 1.6; cv.stroke();

        // 基向量 e1、e2 与它们的像
        function arrow(from, to, color, width) {
          var x1 = sx(from.x), y1 = sy(from.y), x2 = sx(to.x), y2 = sy(to.y);
          cv.strokeStyle = color; cv.lineWidth = width || 2;
          cv.beginPath(); cv.moveTo(x1, y1); cv.lineTo(x2, y2); cv.stroke();
          var ang = Math.atan2(y2 - y1, x2 - x1);
          cv.beginPath();
          cv.moveTo(x2, y2);
          cv.lineTo(x2 - 8 * Math.cos(ang - 0.4), y2 - 8 * Math.sin(ang - 0.4));
          cv.lineTo(x2 - 8 * Math.cos(ang + 0.4), y2 - 8 * Math.sin(ang + 0.4));
          cv.closePath(); cv.fillStyle = color; cv.fill();
        }
        arrow({ x: 0, y: 0 }, apply({ x: 1, y: 0 }), col.teal);
        arrow({ x: 0, y: 0 }, apply({ x: 0, y: 1 }), col.violet);
        arrow({ x: 0, y: 0 }, vec, col.dim, 1.4);
        arrow({ x: 0, y: 0 }, apply(vec), col.accent, 2.2);

        cv.fillStyle = col.muted;
        cv.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        cv.textAlign = 'left';
        cv.fillText('A = [[' + a.toFixed(2) + ', ' + b.toFixed(2) + '], [' +
          c.toFixed(2) + ', ' + d.toFixed(2) + ']]  det = ' + det().toFixed(3), 8, 14);
        if (Math.abs(det()) < 0.02) {
          cv.fillStyle = col.danger;
          cv.fillText('奇异：平面被压成一条线', 8, 30);
        }
      }

      function metrics() {
        var v2 = apply(vec);
        ctx.setMetrics([
          { k: 'det(A)', v: det().toFixed(3) },
          { k: LHT.t('demos.linalgArea'), v: Math.abs(det()).toFixed(3) },
          { k: LHT.t('demos.linalgRank'), v: Math.abs(det()) < 1e-9 ? '1' : '2' },
          { k: '|A·v|', v: Math.sqrt(v2.x * v2.x + v2.y * v2.y).toFixed(3) }
        ]);
      }

      /* ---- 拖动向量 ---- */
      var dragging = false;
      function toMath(ev) {
        var rect = ctx.canvas.getBoundingClientRect();
        var size = Math.min(rect.width, rect.height) - 16;
        var ox = (rect.width - size) / 2, oy = (rect.height - size) / 2;
        var px = ev.clientX - rect.left, py = ev.clientY - rect.top;
        return {
          x: ((px - ox) / size) * 2 * R - R,
          y: R - ((py - oy) / size) * 2 * R
        };
      }
      function down(ev) { dragging = true; vec = toMath(ev); paint(); metrics(); }
      function move(ev) { if (!dragging) return; vec = toMath(ev); paint(); metrics(); }
      function up() { dragging = false; }
      ctx.canvas.addEventListener('pointerdown', down);
      ctx.canvas.addEventListener('pointermove', move);
      ctx.canvas.addEventListener('pointerup', up);
      ctx.onCleanup(function () {
        ctx.canvas.removeEventListener('pointerdown', down);
        ctx.canvas.removeEventListener('pointermove', move);
        ctx.canvas.removeEventListener('pointerup', up);
      });

      /* ---- 控件 ---- */
      ctx.range('a', { min: -2, max: 2, value: a, step: 0.05 }, function (v) { a = v; paint(); metrics(); });
      ctx.range('b', { min: -2, max: 2, value: b, step: 0.05 }, function (v) { b = v; paint(); metrics(); });
      ctx.range('c', { min: -2, max: 2, value: c, step: 0.05 }, function (v) { c = v; paint(); metrics(); });
      ctx.range('d', { min: -2, max: 2, value: d, step: 0.05 }, function (v) { d = v; paint(); metrics(); });

      ctx.spacer();
      ctx.button(LHT.t('demos.linalgRotate'), function () {
        var t = Math.PI / 6;
        a = Math.cos(t); b = -Math.sin(t); c = Math.sin(t); d = Math.cos(t);
        paint(); metrics();
      });
      ctx.button(LHT.t('demos.linalgReset'), function () {
        a = 1; b = 0.5; c = 0.3; d = 1;
        paint(); metrics();
      }, 'primary');

      ctx.onResize(paint);
      paint();
      metrics();
    }
  });
})();
