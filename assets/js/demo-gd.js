/* ============================================================
   demo-gd.js — 梯度下降与损失曲面
   目标函数 f(x, y) = 0.5 (k1 x² + k2 y²)，条件数 k2/k1 可调。
   画布左侧是损失曲面的等高线，右侧是损失随步数的变化。
   可调学习率与动量，直观看到"步子太大会震荡发散"这件事。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var START = { x: 1.7, y: 1.25 };

  LHT.Demos.register({
    id: 'gd',
    name: { zh: '梯度下降与损失曲面', en: 'Gradient descent and loss surface' },
    fr: 'Descente de gradient',
    aspect: 2.15,
    noteKey: 'demos.gdNote',

    mount: function (ctx) {
      var lr = 0.05;
      var momentum = 0.0;
      var cond = 12;              // k2 / k1
      var lrScale = 30;           // 每帧步数
      var pos = { x: START.x, y: START.y };
      var vel = { x: 0, y: 0 };
      var trace = [];
      var losses = [];
      var running = false;

      function k1() { return 1; }
      function k2() { return cond; }

      function loss(x, y) { return 0.5 * (k1() * x * x + k2() * y * y); }
      function grad(x, y) { return { x: k1() * x, y: k2() * y }; }

      function reset() {
        pos = { x: START.x, y: START.y };
        vel = { x: 0, y: 0 };
        trace = [{ x: pos.x, y: pos.y }];
        losses = [loss(pos.x, pos.y)];
        running = false;
        loop.pause();
        updateButton();
        metrics();
        paint();
      }

      function step() {
        var g = grad(pos.x, pos.y);
        vel.x = momentum * vel.x - lr * g.x;
        vel.y = momentum * vel.y - lr * g.y;
        pos.x += vel.x;
        pos.y += vel.y;
        if (!isFinite(pos.x) || !isFinite(pos.y) || Math.abs(pos.x) > 50 || Math.abs(pos.y) > 50) {
          running = false;
          loop.pause();
          updateButton();
          return 'diverged';
        }
        trace.push({ x: pos.x, y: pos.y });
        losses.push(loss(pos.x, pos.y));
        if (trace.length > 4000) { trace.shift(); losses.shift(); }
        return 'ok';
      }

      /* ---- 绘制 ---- */

      var RANGE = 2.2;

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var gap = 14;
        var plotW = Math.min((view.w - gap) * 0.54, view.h);
        var plotH = plotW;
        var ox = 8;
        var oy = (view.h - plotH) / 2;

        c.clearRect(0, 0, view.w, view.h);

        // 左侧：损失曲面等高线。注意要裁剪到绘图区内，
        // 否则外圈椭圆会画到右边的损失曲线上（椭圆的半轴随损失平方增长）。
        c.save();
        c.beginPath();
        c.rect(ox, oy, plotW, plotH);
        c.clip();

        var steps = 30;
        var maxLoss = loss(RANGE, RANGE);
        for (var i = steps; i >= 1; i--) {
          var level = (i / steps) * maxLoss;
          c.beginPath();
          var a = Math.sqrt(2 * level / k1());
          var b = Math.sqrt(2 * level / k2());
          c.ellipse(ox + plotW / 2, oy + plotH / 2,
            a / RANGE * (plotW / 2), b / RANGE * (plotH / 2), 0, 0, Math.PI * 2);
          // 颜色语义：越靠外损失越大，颜色越深
          var shade = 0.05 + 0.35 * (i / steps);
          c.fillStyle = K.mix(col.canvas, col.accent, shade);
          c.fill();
          c.strokeStyle = K.mix(col.canvas, col.border, 0.7);
          c.lineWidth = 1;
          c.stroke();
        }

        function toScreen(x, y) {
          return {
            sx: ox + plotW / 2 + (x / RANGE) * (plotW / 2),
            sy: oy + plotH / 2 - (y / RANGE) * (plotH / 2)
          };
        }

        // 轨迹
        c.strokeStyle = col.accent;
        c.lineWidth = 1.6;
        c.beginPath();
        for (var t = 0; t < trace.length; t++) {
          var p = toScreen(trace[t].x, trace[t].y);
          if (t === 0) c.moveTo(p.sx, p.sy); else c.lineTo(p.sx, p.sy);
        }
        c.stroke();

        var head = toScreen(pos.x, pos.y);
        c.beginPath();
        c.arc(head.sx, head.sy, 4.5, 0, Math.PI * 2);
        c.fillStyle = col.gold || col.accent;
        c.fill();
        c.restore();

        c.strokeStyle = col.border;
        c.lineWidth = 1;
        c.strokeRect(ox + 0.5, oy + 0.5, plotW - 1, plotH - 1);

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText('f(x,y) = 0.5(x² + ' + cond + 'y²)', ox + 4, Math.max(12, oy - 5));

        // 右侧：损失曲线
        var bx = plotW + gap + 8;
        var bw = view.w - bx - 10;
        var bh = view.h - 40;
        var by = 26;
        c.strokeStyle = col.border;
        c.lineWidth = 1;
        c.strokeRect(bx + 0.5, by + 0.5, bw, bh);
        c.fillStyle = col.muted;
        c.fillText('loss', bx, by - 8);

        if (losses.length > 1) {
          // 用 log(1+loss) 作纵轴：收敛是几何速度的，线性刻度上后半程会贴地看不见
          var top = 0;
          for (var m = 0; m < losses.length; m++) if (losses[m] > top) top = losses[m];
          var topLog = Math.log(1 + Math.max(top, 1e-9));
          c.beginPath();
          for (var n = 0; n < losses.length; n++) {
            var px = bx + (n / (losses.length - 1)) * bw;
            var ratio = Math.max(0, Math.min(1, Math.log(1 + losses[n]) / topLog));
            var py = by + bh - ratio * bh;
            if (n === 0) c.moveTo(px, py); else c.lineTo(px, py);
          }
          c.strokeStyle = col.teal;
          c.lineWidth = 1.7;
          c.stroke();
          c.fillStyle = col.dim;
          c.font = '10px "IBM Plex Mono", ui-monospace, monospace';
          c.fillText('log(1+loss)', bx + 4, by + bh - 6);
        }
      }

      function metrics() {
        var g = grad(pos.x, pos.y);
        ctx.setMetrics([
          { k: LHT.t('demos.gdStep'), v: String(losses.length - 1) },
          { k: LHT.t('demos.loss'), v: loss(pos.x, pos.y).toFixed(4) },
          { k: LHT.t('demos.gdGrad'), v: Math.sqrt(g.x * g.x + g.y * g.y).toFixed(4) },
          { k: LHT.t('demos.gdState'), v: running ? LHT.t('demos.playing') : LHT.t('demos.idle') }
        ]);
      }

      function updateButton() {
        runBtn.set(running ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      /* ---- 控件 ---- */

      ctx.range(LHT.t('demos.lr'), { min: 0.5, max: 90, value: lr * 1000, step: 1 }, function (v) {
        lr = v / 1000;
        reset();
      }).relabel(LHT.t('demos.lr') + '（‰）');

      ctx.range(LHT.t('demos.momentum'), { min: 0, max: 0.98, value: momentum, step: 0.02 }, function (v) {
        momentum = v;
        reset();
      });

      ctx.range(LHT.t('demos.gdCond'), { min: 1, max: 30, value: cond, step: 1 }, function (v) {
        cond = v;
        reset();
      });

      ctx.range(LHT.t('demos.speed'), { min: 1, max: 60, value: lrScale, step: 1 }, function (v) { lrScale = v; });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        running = !running;
        if (running) loop.resume(); else loop.pause();
        updateButton();
      }, 'primary');

      ctx.button(LHT.t('demos.step'), function () {
        running = false;
        loop.pause();
        step();
        updateButton();
        metrics();
        paint();
      });

      ctx.button(LHT.t('demos.reset'), function () { reset(); });

      var loop = ctx.raf(function () {
        if (running) {
          for (var i = 0; i < lrScale; i++) {
            if (step() === 'diverged') break;
          }
        }
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });
      reset();
    }
  });
})();
