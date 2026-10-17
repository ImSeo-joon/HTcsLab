/* ============================================================
   demo-bst.js — 二叉搜索树
   插入按大小分流，删除用中序后继替换；节点位置由中序序号决定 x、深度决定 y。
   切换遍历方式可以看重访问顺序的变化，插入有序数据则能看到树退化成链。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var TRAVERSALS = {
    inorder:   { zh: '中序（升序）', en: 'In-order' },
    preorder:  { zh: '前序', en: 'Pre-order' },
    postorder: { zh: '后序', en: 'Post-order' },
    level:     { zh: '层序（BFS）', en: 'Level order' }
  };

  function node(value) {
    return { value: value, left: null, right: null };
  }

  function insert(root, value) {
    if (!root) return node(value);
    var cur = root;
    for (;;) {
      if (value === cur.value) return root;
      if (value < cur.value) {
        if (cur.left) cur = cur.left; else { cur.left = node(value); return root; }
      } else {
        if (cur.right) cur = cur.right; else { cur.right = node(value); return root; }
      }
    }
  }

  function removeNode(root, value) {
    if (!root) return root;
    if (value < root.value) { root.left = removeNode(root.left, value); return root; }
    if (value > root.value) { root.right = removeNode(root.right, value); return root; }
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    var successor = root.right;
    while (successor.left) successor = successor.left;
    root.value = successor.value;
    root.right = removeNode(root.right, successor.value);
    return root;
  }

  function walk(root, mode) {
    var out = [];
    if (!root) return out;
    if (mode === 'level') {
      var queue = [root];
      while (queue.length) {
        var cur = queue.shift();
        out.push(cur);
        if (cur.left) queue.push(cur.left);
        if (cur.right) queue.push(cur.right);
      }
      return out;
    }
    if (mode === 'preorder') {
      return [root].concat(walk(root.left, mode), walk(root.right, mode));
    }
    if (mode === 'postorder') {
      return walk(root.left, mode).concat(walk(root.right, mode), [root]);
    }
    return walk(root.left, mode).concat([root], walk(root.right, mode));
  }

  function find(root, value) {
    var cur = root;
    while (cur) {
      if (value === cur.value) return cur;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return null;
  }

  LHT.Demos.register({
    id: 'bst',
    name: { zh: '二叉搜索树', en: 'Binary search tree' },
    fr: 'Arbre binaire de recherche',
    aspect: 2.0,
    noteKey: 'demos.bstNote',

    mount: function (ctx) {
      var root = null;
      var traversal = 'inorder';
      var speed = 1;
      var order = [];
      var cursor = 0;
      var playing = false;
      var ops = 0;
      var order_counter = 0;
      var touched = null;
      var layoutById = {};

      function countNodes(n) {
        if (!n) return 0;
        return 1 + countNodes(n.left) + countNodes(n.right);
      }

      function depthOf(n) {
        if (!n) return 0;
        return 1 + Math.max(depthOf(n.left), depthOf(n.right));
      }

      function relayout() {
        var inorder = walk(root, 'inorder');
        layoutById = {};
        inorder.forEach(function (n, index) {
          layoutById[n.__id] = { x: index, depth: depthOfFromRoot(n) - 1 };
        });
      }

      function depthOfFromRoot(target) {
        // 用一次层序遍历得到每个节点深度，避免递归查找
        var queue = root ? [[root, 1]] : [];
        while (queue.length) {
          var pair = queue.shift();
          if (pair[0] === target) return pair[1];
          if (pair[0].left) queue.push([pair[0].left, pair[1] + 1]);
          if (pair[0].right) queue.push([pair[0].right, pair[1] + 1]);
        }
        return 1;
      }

      function assignIds() {
        if (!root) return;
        var stack = [root];
        while (stack.length) {
          var n = stack.pop();
          if (!n.__id) n.__id = 'n' + (++order_counter);
          if (n.left) stack.push(n.left);
          if (n.right) stack.push(n.right);
        }
      }

      function rebuild() {
        assignIds();
        relayout();
        order = walk(root, traversal);
        cursor = 0;
        playing = false;
        loop.pause();
        updateButton();
        metrics();
        paint();
      }

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var total = countNodes(root);

        c.clearRect(0, 0, view.w, view.h);

        if (!root) {
          c.fillStyle = col.muted;
          c.font = '13px "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
          c.textAlign = 'center';
          c.fillText(LHT.t('demos.treeEmpty'), view.w / 2, view.h / 2);
          return;
        }

        var maxDepth = depthOf(root);
        var pad = 26;
        var usableW = view.w - pad * 2;
        var usableH = view.h - pad * 2;
        var cols = Math.max(1, total);
        var gapX = cols > 1 ? usableW / (cols - 1) : 0;
        var gapY = maxDepth > 1 ? usableH / (maxDepth - 1) : 0;
        var radius = Math.max(8, Math.min(20, Math.min(gapX * 0.42 || 20, gapY * 0.34 || 20)));

        function pos(n) {
          var info = layoutById[n.__id] || { x: 0, depth: 0 };
          return {
            x: cols > 1 ? pad + info.x * gapX : view.w / 2,
            y: pad + info.depth * gapY
          };
        }

        // 先画边
        c.strokeStyle = K.mix(col.canvas, col.border, 0.85);
        c.lineWidth = 1.4;
        (function edges(n) {
          if (!n) return;
          var p = pos(n);
          [n.left, n.right].forEach(function (child) {
            if (!child) return;
            var cp = pos(child);
            c.beginPath();
            c.moveTo(p.x, p.y);
            c.lineTo(cp.x, cp.y);
            c.stroke();
            edges(child);
          });
        })(root);

        var visited = {};
        for (var i = 0; i < cursor && i < order.length; i++) visited[order[i].__id] = true;
        var current = cursor > 0 && cursor <= order.length ? order[cursor - 1] : null;

        // 再画节点
        (function draw(n) {
          if (!n) return;
          var p = pos(n);
          var fill = K.mix(col.canvas, col.border, 0.6);
          if (touched && n.__id === touched) fill = col.violet;
          if (visited[n.__id]) fill = col.teal;
          if (current && current.__id === n.__id) fill = col.accent;
          c.beginPath();
          c.arc(p.x, p.y, radius, 0, Math.PI * 2);
          c.fillStyle = fill;
          c.fill();
          c.strokeStyle = col.canvas;
          c.lineWidth = 1.5;
          c.stroke();
          /* 节点被高亮时是实心色块，文字色按该色块的亮度自动选黑白 */
          var highlighted = !!visited[n.__id] || !!(current && current.__id === n.__id) || touched === n.__id;
          c.fillStyle = highlighted ? K.onColor(fill) : col.fg;
          c.font = Math.max(9, Math.round(radius * 0.85)) + 'px ui-monospace, Menlo, Consolas, monospace';
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText(String(n.value), p.x, p.y + 0.5);
          draw(n.left);
          draw(n.right);
        })(root);
        c.textBaseline = 'alphabetic';

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'left';
        c.fillText(LHT.pick(TRAVERSALS[traversal]) + ' · ' + cursor + '/' + order.length, 6, 15);
      }

      function metrics() {
        ctx.setMetrics([
          { k: LHT.t('demos.treeNodes'), v: String(countNodes(root)) },
          { k: LHT.t('demos.treeHeight'), v: String(depthOf(root)) },
          { k: LHT.t('demos.ops'), v: String(ops) },
          { k: LHT.t('demos.traversal'), v: LHT.pick(TRAVERSALS[traversal]) }
        ]);
      }

      function updateButton() {
        runBtn.set(playing ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      function advance(count) {
        if (!order.length) return;
        cursor = Math.min(cursor + count, order.length);
        if (cursor >= order.length) {
          playing = false;
          loop.pause();
          updateButton();
        }
      }

      /* ---- 控件 ---- */

      var valueInput = ctx.text(LHT.t('demos.value'), '50', function () {});

      ctx.button(LHT.t('demos.insert'), function () {
        var value = parseInt(valueInput.value(), 10);
        if (isNaN(value)) return;
        var before = countNodes(root);
        root = insert(root, value);
        if (countNodes(root) > before) {
          ops++;
          var created = find(root, value);
          assignIds();
          touched = created ? created.__id : null;
        }
        rebuild();
      }, 'primary');

      ctx.button(LHT.t('demos.remove'), function () {
        var value = parseInt(valueInput.value(), 10);
        if (isNaN(value)) return;
        var before = countNodes(root);
        root = removeNode(root, value);
        if (countNodes(root) < before) ops++;
        touched = null;
        rebuild();
      });

      ctx.button(LHT.t('demos.treeRandom'), function () {
        for (var i = 0; i < 7; i++) {
          root = insert(root, 1 + Math.floor(Math.random() * 99));
          ops++;
        }
        touched = null;
        rebuild();
      });

      ctx.button(LHT.t('demos.treeClear'), function () {
        root = null;
        ops = 0;
        touched = null;
        rebuild();
      });

      var traverseSel = ctx.select(LHT.t('demos.traversal'), Object.keys(TRAVERSALS).map(function (key) {
        return { value: key, label: LHT.pick(TRAVERSALS[key]) };
      }), traversal, function (value) {
        traversal = value;
        rebuild();
      });

      ctx.range(LHT.t('demos.speed'), { min: 1, max: 8, value: speed, step: 1 }, function (value) { speed = value; });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        if (cursor >= order.length) { cursor = 0; }
        playing = !playing;
        if (playing) loop.resume(); else loop.pause();
        updateButton();
      });

      ctx.button(LHT.t('demos.step'), function () {
        playing = false;
        loop.pause();
        advance(1);
        updateButton();
        metrics();
        paint();
      });

      var loop = ctx.raf(function () {
        if (playing) advance(speed);
        metrics();
        paint();
      });
      loop.pause();

      ctx.onResize(function () { paint(); });

      // 初始树
      [50, 30, 70, 20, 40, 60, 80, 35].forEach(function (v) { root = insert(root, v); });
      ops = 8;
      rebuild();
      traverseSel.set(traversal);
    }
  });
})();
