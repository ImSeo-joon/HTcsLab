/* ============================================================
   demo-sort.js — 排序算法可视化
   先把某个算法在一组数据上的全部操作展开成步骤序列，再逐帧回放。
   步骤类型：cmp 比较 / swap 交换 / set 写入 / sorted 归位 / done 结束
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var ALGOS = {
    bubble:    { label: { zh: '冒泡排序', en: 'Bubble sort' },    best: 'O(n²)', avg: 'O(n²)', space: 'O(1)' },
    insertion: { label: { zh: '插入排序', en: 'Insertion sort' }, best: 'O(n)', avg: 'O(n²)', space: 'O(1)' },
    selection: { label: { zh: '选择排序', en: 'Selection sort' }, best: 'O(n²)', avg: 'O(n²)', space: 'O(1)' },
    merge:     { label: { zh: '归并排序', en: 'Merge sort' },     best: 'O(n log n)', avg: 'O(n log n)', space: 'O(n)' },
    quick:     { label: { zh: '快速排序', en: 'Quicksort' },       best: 'O(n log n)', avg: 'O(n log n)', space: 'O(log n)' },
    heap:      { label: { zh: '堆排序', en: 'Heapsort' },          best: 'O(n log n)', avg: 'O(n log n)', space: 'O(1)' }
  };

  function buildSteps(algo, values) {
    var a = values.slice();
    var steps = [];
    var sorted = {};
    var n = a.length;

    function cmp(i, j) { steps.push({ t: 'cmp', i: i, j: j }); }
    function swap(i, j) {
      steps.push({ t: 'swap', i: i, j: j });
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    function set(i, v) { steps.push({ t: 'set', i: i, v: v }); a[i] = v; }
    function mark(i) { sorted[i] = true; steps.push({ t: 'sorted', i: i }); }

    if (algo === 'bubble') {
      for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
          cmp(j, j + 1);
          if (a[j] > a[j + 1]) swap(j, j + 1);
        }
        mark(n - 1 - i);
      }
      mark(0);
    } else if (algo === 'insertion') {
      mark(0);
      for (var m = 1; m < n; m++) {
        var k = m;
        while (k > 0) {
          cmp(k - 1, k);
          if (a[k - 1] > a[k]) { swap(k - 1, k); k--; } else break;
        }
      }
      for (var s = 0; s < n; s++) if (!sorted[s]) mark(s);
    } else if (algo === 'selection') {
      for (var p = 0; p < n - 1; p++) {
        var min = p;
        for (var q = p + 1; q < n; q++) {
          cmp(min, q);
          if (a[q] < a[min]) min = q;
        }
        if (min !== p) swap(p, min);
        mark(p);
      }
      mark(n - 1);
    } else if (algo === 'merge') {
      (function mergeSort(lo, hi) {
        if (hi - lo < 2) return;
        var mid = (lo + hi) >> 1;
        mergeSort(lo, mid);
        mergeSort(mid, hi);
        var buffer = [];
        var l = lo, r = mid;
        while (l < mid || r < hi) {
          if (l >= mid) { buffer.push(a[r++]); }
          else if (r >= hi) { buffer.push(a[l++]); }
          else {
            cmp(l, r);
            if (a[l] <= a[r]) buffer.push(a[l++]); else buffer.push(a[r++]);
          }
        }
        for (var t = 0; t < buffer.length; t++) {
          if (a[lo + t] !== buffer[t]) set(lo + t, buffer[t]);
        }
      })(0, n);
      for (var x = 0; x < n; x++) if (!sorted[x]) mark(x);
    } else if (algo === 'quick') {
      (function quickSort(lo, hi) {
        if (lo >= hi) { if (lo === hi) mark(lo); return; }
        var pivot = a[hi];
        var boundary = lo;
        for (var idx = lo; idx < hi; idx++) {
          cmp(idx, hi);
          if (a[idx] < pivot) { if (idx !== boundary) swap(idx, boundary); boundary++; }
        }
        if (boundary !== hi) swap(boundary, hi);
        mark(boundary);
        quickSort(lo, boundary - 1);
        quickSort(boundary + 1, hi);
      })(0, n - 1);
      for (var y = 0; y < n; y++) if (!sorted[y]) mark(y);
    } else if (algo === 'heap') {
      function sift(start, end) {
        var root = start;
        while (root * 2 + 1 <= end) {
          var child = root * 2 + 1;
          if (child + 1 <= end) { cmp(child, child + 1); if (a[child + 1] > a[child]) child++; }
          cmp(root, child);
          if (a[root] < a[child]) { swap(root, child); root = child; } else return;
        }
      }
      var start0 = Math.floor((n - 2) / 2);
      for (var h = start0; h >= 0; h--) sift(h, n - 1);
      for (var end = n - 1; end > 0; end--) {
        swap(0, end);
        mark(end);
        sift(0, end - 1);
      }
      mark(0);
    }

    steps.push({ t: 'done' });
    return steps;
  }

  LHT.Demos.register({
    id: 'sorting',
    name: { zh: '排序算法可视化', en: 'Sorting visualiser' },
    fr: 'Tri en mouvement',
    aspect: 2.5,
    noteKey: 'demos.sortNote',

    mount: function (ctx) {
      var algo = 'quick';
      var size = 32;
      var speed = 6;
      var values = [];
      var steps = [];
      var cursor = 0;
      var working = [];
      var sortedMap = {};
      var stat = { cmp: 0, swap: 0 };
      var finished = false;
      var playing = false;
      var lastCmp = [-1, -1];

      function shuffle() {
        values = [];
        for (var i = 0; i < size; i++) values.push(3 + Math.floor(Math.random() * 97));
        reset();
      }

      function reset() {
        working = values.slice();
        steps = buildSteps(algo, values);
        cursor = 0;
        sortedMap = {};
        stat = { cmp: 0, swap: 0 };
        finished = false;
        playing = false;
        loop.pause();
        updateButtons();
        paint();
      }

      function advance(count) {
        for (var i = 0; i < count && cursor < steps.length; i++) {
          var step = steps[cursor++];
          if (step.t === 'cmp') {
            stat.cmp++;
            lastCmp = [step.i, step.j];
          } else if (step.t === 'swap') {
            stat.swap++;
            var tmp = working[step.i];
            working[step.i] = working[step.j];
            working[step.j] = tmp;
            lastCmp = [step.i, step.j];
          } else if (step.t === 'set') {
            working[step.i] = step.v;
            lastCmp = [step.i, -1];
          } else if (step.t === 'sorted') {
            sortedMap[step.i] = true;
          } else if (step.t === 'done') {
            finished = true;
            playing = false;
            loop.pause();
            updateButtons();
          }
        }
        if (cursor >= steps.length) {
          finished = true;
          playing = false;
          loop.pause();
          updateButtons();
        }
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var pad = { l: 12, r: 12, t: 30, b: 22 };
        var w = view.w - pad.l - pad.r;
        var h = view.h - pad.t - pad.b;
        var n = working.length || 1;
        var max = 1;
        for (var i = 0; i < working.length; i++) max = Math.max(max, working[i]);
        var bw = w / n;
        var gap = Math.min(3, Math.max(1, bw * 0.18));

        c.clearRect(0, 0, view.w, view.h);

        for (var j = 0; j < working.length; j++) {
          var value = working[j];
          var bh = Math.max(3, (value / max) * h);
          var x = pad.l + j * bw;
          var y = pad.t + h - bh;
          var fill = K.mix(col.canvas, col.border, 0.55);
          if (sortedMap[j]) fill = col.teal;
          if (lastCmp[0] === j || lastCmp[1] === j) fill = col.accent;
          c.fillStyle = fill;
          c.fillRect(x + gap / 2, y, Math.max(1, bw - gap), bh);
        }

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'left';
        c.fillText(activeLabel() + ' · ' + LHT.t('demos.comparisons') + ' ' + stat.cmp +
          ' · ' + LHT.t('demos.swaps') + ' ' + stat.swap, pad.l, 18);
        c.textAlign = 'right';
        c.fillText('n = ' + working.length, view.w - pad.r, 18);
        c.textAlign = 'left';
      }

      function activeLabel() { return LHT.pick(ALGO_LABELS[algo]); }

      var ALGO_LABELS = {};
      Object.keys(ALGOS).forEach(function (key) { ALGO_LABELS[key] = ALGOS[key].label; });

      function updateButtons() {
        runBtn.set(playing ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      function metrics() {
        var info = ALGOS[algo];
        ctx.setMetrics([
          { k: LHT.t('demos.algorithm'), v: LHT.pick(ALGO_LABELS[algo]) },
          { k: LHT.t('demos.comparisons'), v: String(stat.cmp) },
          { k: LHT.t('demos.swaps'), v: String(stat.swap) },
          { k: LHT.t('demos.complexity'), v: info.best + ' / ' + info.space }
        ]);
      }

      /* ---- 控件 ---- */

      var algoSel = ctx.select(LHT.t('demos.algorithm'), Object.keys(ALGOS).map(function (key) {
        return { value: key, label: LHT.pick(ALGOS[key].label) };
      }), algo, function (value) { algo = value; shuffle(); });

      var sizeRange = ctx.range(LHT.t('demos.size'), { min: 8, max: 90, value: size, step: 1 }, function (value) {
        size = value;
        shuffle();
      });

      var speedRange = ctx.range(LHT.t('demos.speed'), { min: 1, max: 60, value: speed, step: 1 }, function (value) {
        speed = value;
      });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        if (finished) { reset(); playing = true; loop.resume(); }
        else { playing = !playing; if (playing) loop.resume(); else loop.pause(); }
        updateButtons();
      }, 'primary');

      ctx.button(LHT.t('demos.step'), function () {
        playing = false;
        loop.pause();
        advance(1);
        metrics();
        paint();
        updateButtons();
      });

      ctx.button(LHT.t('demos.shuffle'), function () {
        algo = algoSel.value();
        shuffle();
        metrics();
      });

      var loop = ctx.raf(function () {
        if (playing) advance(speed);
        metrics();
        paint();
      });
      loop.pause();

      sizeRange.set(size);
      speedRange.set(speed);
      ctx.onResize(paint);
      shuffle();
      metrics();
    }
  });
})();
