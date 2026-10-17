/* ============================================================
   demo-pylist.js — 列表推导式的求值顺序
   一步一步走 [expr for x in xs if cond]：
   取一个元素 → 判断条件 → 通过才求值并追加。左侧是被扫描的源列表，
   右侧是正在生成的结果，能直观看到「过滤发生在求值之前」。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var CONDS = {
    even:  { zh: '只保留偶数  x % 2 == 0', en: 'keep evens  x % 2 == 0', test: function (x) { return x % 2 === 0; } },
    pos:   { zh: '只保留正数  x > 0', en: 'keep positives  x > 0', test: function (x) { return x > 0; } },
    none:  { zh: '不过滤', en: 'no filter', test: function () { return true; } }
  };

  var EXPRS = {
    square: { zh: 'x * x', en: 'x * x', apply: function (x) { return x * x; } },
    inc:    { zh: 'x + 1', en: 'x + 1', apply: function (x) { return x + 1; } },
    double: { zh: 'x * 2', en: 'x * 2', apply: function (x) { return x * 2; } }
  };

  LHT.Demos.register({
    id: 'pylist',
    name: { zh: '列表推导式的求值顺序', en: 'How a comprehension evaluates' },
    fr: 'Ordre d’évaluation d’une compréhension',
    aspect: 2.1,
    noteKey: 'demos.pylistNote',

    mount: function (ctx) {
      var size = 10;
      var cond = 'even';
      var expr = 'square';
      var source = [];
      var cursor = 0;
      var out = [];
      var playing = false;
      var speed = 1;

      function build() {
        source = [];
        for (var i = 0; i < size; i++) source.push(i - Math.floor(size / 3));
        cursor = 0;
        out = [];
        playing = false;
        loop.pause();
        updateButton();
        metrics();
        paint();
      }

      function step() {
        if (cursor >= source.length) {
          playing = false;
          loop.pause();
          updateButton();
          return;
        }
        var x = source[cursor];
        if (CONDS[cond].test(x)) out.push(EXPRS[expr].apply(x));
        cursor++;
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var cell = Math.min(34, (view.w - 180) / Math.max(size, 8));
        var top = 46;

        c.clearRect(0, 0, view.w, view.h);

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.textAlign = 'left';
        c.fillText('[ ' + EXPRS[expr].zh + ' for x in xs if ' +
          (cond === 'none' ? 'True' : (cond === 'even' ? 'x % 2 == 0' : 'x > 0')) + ' ]', 10, 20);
        c.fillStyle = col.dim;
        c.fillText('xs = ' + '[' + source.join(', ') + ']', 10, 38);

        // 源列表
        c.fillStyle = col.muted;
        c.fillText('scan', 10, top - 8);
        for (var i = 0; i < source.length; i++) {
          var x = source[i];
          var y = top + i * (cell + 2);
          var done = i < cursor;
          var passed = CONDS[cond].test(x);
          c.fillStyle = !done ? K.mix(col.canvas, col.border, 0.5)
            : passed ? K.mix(col.canvas, col.teal, 0.35)
            : K.mix(col.canvas, col.danger, 0.18);
          c.fillRect(10, y, cell * 1.6, cell);
          if (i === cursor) {
            c.strokeStyle = col.gold; c.lineWidth = 2;
            c.strokeRect(10.5, y + 0.5, cell * 1.6 - 1, cell - 1);
          }
          c.fillStyle = done && !passed ? col.dim : col.fg;
          c.font = '13px "IBM Plex Mono", ui-monospace, Menlo, monospace';
          c.textAlign = 'center';
          c.fillText(String(x), 10 + cell * 0.8, y + cell * 0.68);
          if (done && !passed) {
            c.strokeStyle = col.dim; c.lineWidth = 1;
            c.beginPath();
            c.moveTo(12, y + cell - 4); c.lineTo(8 + cell * 1.6 - 2, y + 4);
            c.stroke();
          }
        }

        // 结果列表
        var ox = 10 + cell * 1.6 + 40;
        c.fillStyle = col.muted;
        c.textAlign = 'left';
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, monospace';
        c.fillText('out (' + out.length + ')', ox, top - 8);
        for (var j = 0; j < out.length; j++) {
          var oy = top + j * (cell + 2);
          c.fillStyle = K.mix(col.canvas, col.accent, 0.3);
          c.fillRect(ox, oy, cell * 1.6, cell);
          c.fillStyle = col.fg;
          c.textAlign = 'center';
          c.fillText(String(out[j]), ox + cell * 0.8, oy + cell * 0.68);
        }
        c.textAlign = 'left';
      }

      function metrics() {
        var passed = 0;
        for (var i = 0; i < Math.min(cursor, source.length); i++) {
          if (CONDS[cond].test(source[i])) passed++;
        }
        ctx.setMetrics([
          { k: LHT.t('demos.pylistScanned'), v: Math.min(cursor, source.length) + ' / ' + source.length },
          { k: LHT.t('demos.pylistPassed'), v: String(passed) },
          { k: LHT.t('demos.pylistOut'), v: String(out.length) },
          { k: LHT.t('demos.gdState'), v: playing ? LHT.t('demos.playing') : LHT.t('demos.idle') }
        ]);
      }

      function updateButton() {
        runBtn.set(playing ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      ctx.range(LHT.t('demos.size'), { min: 6, max: 16, value: size, step: 1 }, function (v) { size = v; build(); });
      ctx.select(LHT.t('demos.pylistCond'), Object.keys(CONDS).map(function (k) {
        return { value: k, label: LHT.pick(CONDS[k]) };
      }), cond, function (v) { cond = v; build(); });
      ctx.select(LHT.t('demos.pylistExpr'), Object.keys(EXPRS).map(function (k) {
        return { value: k, label: EXPRS[k].en };
      }), expr, function (v) { expr = v; build(); });
      ctx.range(LHT.t('demos.speed'), { min: 1, max: 4, value: speed, step: 1 }, function (v) { speed = v; });

      ctx.spacer();
      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        if (cursor >= source.length) build();
        playing = !playing;
        if (playing) loop.resume(); else loop.pause();
        updateButton();
      }, 'primary');
      ctx.button(LHT.t('demos.step'), function () {
        playing = false;
        loop.pause();
        step();
        updateButton();
        metrics();
        paint();
      });

      var loop = ctx.raf(function () {
        if (playing) for (var i = 0; i < speed; i++) step();
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(paint);
      build();
    }
  });
})();
