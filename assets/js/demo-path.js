/* ============================================================
   demo-path.js — 网格寻路可视化
   BFS / DFS / Dijkstra / A* / 贪心最佳优先，同一份搜索骨架，
   区别只在「下一个扩展谁」的优先级定义。
   格子权重 1–9：BFS 只看步数，Dijkstra 与 A* 会绕开高代价地形。
   ============================================================ */

(function () {
  'use strict';

  var LHT = window.LHT;
  var K = LHT.demoKit;

  var ALGOS = {
    bfs:      { label: { zh: '广度优先 BFS', en: 'Breadth-first' }, weighted: false },
    dfs:      { label: { zh: '深度优先 DFS', en: 'Depth-first' }, weighted: false },
    dijkstra: { label: { zh: 'Dijkstra', en: 'Dijkstra' }, weighted: true },
    astar:    { label: { zh: 'A* 搜索', en: 'A* search' }, weighted: true },
    greedy:   { label: { zh: '贪心最佳优先', en: 'Greedy best-first' }, weighted: true }
  };

  LHT.Demos.register({
    id: 'pathfinding',
    name: { zh: '网格寻路', en: 'Grid pathfinding' },
    fr: 'Chercher le chemin',
    aspect: 1.9,
    noteKey: 'demos.pathNote',

    mount: function (ctx) {
      var algo = 'astar';
      var cols = 34;
      var speed = 3;
      var rows = Math.max(10, Math.round(cols * 0.6));
      var weight = null;
      var walls = null;
      var start = { x: 2, y: 0 };
      var target = { x: 0, y: 0 };
      var search = null;
      var revealed = 0;
      var playing = false;
      var layout = { cell: 10, ox: 0, oy: 0 };

      function idx(x, y) { return y * cols + x; }

      function generate() {
        rows = Math.max(10, Math.round(cols * 0.6));
        weight = new Float64Array(cols * rows);
        walls = new Uint8Array(cols * rows);
        for (var i = 0; i < weight.length; i++) weight[i] = 1 + Math.floor(Math.random() * 9);
        start = { x: 1, y: rows - 2 };
        target = { x: cols - 2, y: 1 };
        search = null;
        revealed = 0;
        playing = false;
        loop.pause();
        updateButton();
        paint();
      }

      /* ---- 搜索 ---- */

      function neighbors(u) {
        var x = u % cols, y = (u - x) / cols;
        var list = [];
        if (x > 0) list.push(u - 1);
        if (x < cols - 1) list.push(u + 1);
        if (y > 0) list.push(u - cols);
        if (y < rows - 1) list.push(u + cols);
        return list;
      }

      function heuristic(u, goal) {
        var ux = u % cols, uy = (u - ux) / cols;
        var gx = goal % cols, gy = (goal - gx) / cols;
        return Math.abs(ux - gx) + Math.abs(uy - gy);
      }

      function computeSearch() {
        var n = cols * rows;
        var dist = new Float64Array(n);
        var parent = new Int32Array(n);
        var done = new Uint8Array(n);
        var order = [];
        var i;
        for (i = 0; i < n; i++) { dist[i] = Infinity; parent[i] = -1; }

        var startI = idx(start.x, start.y);
        var targetI = idx(target.x, target.y);
        dist[startI] = 0;
        var reached = false;

        if (algo === 'bfs' || algo === 'dfs') {
          var frontier = [startI];
          while (frontier.length) {
            var u = algo === 'bfs' ? frontier.shift() : frontier.pop();
            if (done[u] || walls[u]) continue;
            done[u] = 1;
            order.push(u);
            if (u === targetI) { reached = true; break; }
            var nb = neighbors(u);
            for (i = 0; i < nb.length; i++) {
              var v = nb[i];
              if (walls[v] || done[v]) continue;
              if (dist[v] === Infinity) { dist[v] = dist[u] + 1; parent[v] = u; }
              frontier.push(v);
            }
          }
        } else {
          var heap = [[0, startI]];
          function push(item) {
            heap.push(item);
            var at = heap.length - 1;
            while (at > 0) {
              var up = (at - 1) >> 1;
              if (heap[up][0] <= heap[at][0]) break;
              var tmp = heap[up]; heap[up] = heap[at]; heap[at] = tmp;
              at = up;
            }
          }
          function pop() {
            var top = heap[0];
            var last = heap.pop();
            if (heap.length) {
              heap[0] = last;
              var at = 0;
              for (;;) {
                var l = at * 2 + 1, r = l + 1, small = at;
                if (l < heap.length && heap[l][0] < heap[small][0]) small = l;
                if (r < heap.length && heap[r][0] < heap[small][0]) small = r;
                if (small === at) break;
                var swap = heap[small]; heap[small] = heap[at]; heap[at] = swap;
                at = small;
              }
            }
            return top;
          }

          while (heap.length) {
            var cur = pop();
            var node = cur[1];
            if (done[node] || walls[node]) continue;
            done[node] = 1;
            order.push(node);
            if (node === targetI) { reached = true; break; }
            var around = neighbors(node);
            for (i = 0; i < around.length; i++) {
              var next = around[i];
              if (walls[next] || done[next]) continue;
              var cost = algo === 'greedy' ? 0 : weight[next];
              var g = dist[node] + cost;
              if (g < dist[next]) {
                dist[next] = g;
                parent[next] = node;
                var priority = algo === 'dijkstra' ? g
                  : algo === 'astar' ? g + heuristic(next, targetI)
                  : heuristic(next, targetI);
                push([priority, next]);
              }
            }
          }
        }

        var path = [];
        if (reached || targetI === startI) {
          var walk = targetI;
          var guard = 0;
          while (walk !== -1 && guard++ < n) {
            path.push(walk);
            if (walk === startI) break;
            walk = parent[walk];
          }
          path.reverse();
        }

        var costSum = 0;
        for (i = 1; i < path.length; i++) {
          costSum += (algo === 'bfs' || algo === 'dfs') ? 1 : weight[path[i]];
        }

        search = {
          order: order,
          dist: dist,
          path: path,
          reached: reached,
          cost: costSum
        };
        revealed = 0;
      }

      /* ---- 绘制 ---- */

      function paint() {
        var view = ctx.view();
        var c = view.c;
        var col = ctx.colors();
        var cell = Math.min(view.w / cols, view.h / rows);
        var ox = (view.w - cell * cols) / 2;
        var oy = (view.h - cell * rows) / 2;
        layout = { cell: cell, ox: ox, oy: oy };

        c.clearRect(0, 0, view.w, view.h);

        var maxOrder = search ? Math.max(1, search.order.length) : 1;
        var maxDist = 1;
        if (search && (algo === 'dijkstra' || algo === 'astar')) {
          for (var d = 0; d < search.dist.length; d++) {
            if (search.dist[d] !== Infinity) maxDist = Math.max(maxDist, search.dist[d]);
          }
        }

        var pal = {};
        if (search) {
          for (var rank = 0; rank < Math.min(revealed, search.order.length); rank++) {
            var node = search.order[rank];
            var t = (algo === 'dijkstra' || algo === 'astar')
              ? (search.dist[node] === Infinity ? 0 : search.dist[node] / maxDist)
              : rank / maxOrder;
            pal[node] = 0.12 + 0.62 * t;
          }
        }

        var base = K.mix(col.canvas, col.border, 0.45);
        var wallColor = K.mix(col.canvas, col.fg, 0.26);
        for (var y = 0; y < rows; y++) {
          for (var x = 0; x < cols; x++) {
            var id = idx(x, y);
            var px = ox + x * cell, py = oy + y * cell;
            if (walls[id]) {
              c.fillStyle = wallColor;
            } else if (pal[id] != null) {
              c.fillStyle = K.mix(col.canvas, col.teal, pal[id]);
            } else {
              c.fillStyle = base;
            }
            c.fillRect(px, py, cell + 0.5, cell + 0.5);
          }
        }

        if (search && search.path.length > 1 && revealed >= search.order.length) {
          c.strokeStyle = '#ffffff';
          c.lineWidth = Math.max(1.5, cell * 0.16);
          c.setLineDash([Math.max(2, cell * 0.3), Math.max(2, cell * 0.22)]);
          c.beginPath();
          search.path.forEach(function (node, i) {
            var nx = node % cols, ny = (node - nx) / cols;
            var cx = ox + nx * cell + cell / 2;
            var cy = oy + ny * cell + cell / 2;
            if (i === 0) c.moveTo(cx, cy); else c.lineTo(cx, cy);
          });
          c.stroke();
          c.setLineDash([]);
        }

        function marker(pos, color) {
          var px = ox + pos.x * cell, py = oy + pos.y * cell;
          c.fillStyle = color;
          c.fillRect(px + cell * 0.08, py + cell * 0.08, cell * 0.84, cell * 0.84);
        }
        marker(start, col.ok);
        marker(target, col.danger);

        c.fillStyle = col.muted;
        c.font = '12px "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
        c.textAlign = 'left';
        var label = LHT.pick(ALGOS[algo].label) + ' · ' + cols + '×' + rows;
        if (search && search.reached) label += ' · ' + LHT.t('demos.done');
        else if (search) label += ' · ' + LHT.t('demos.noPath');
        c.fillText(label, 4, 14);
      }

      function metrics() {
        var visited = search ? Math.min(revealed, search.order.length) : 0;
        ctx.setMetrics([
          { k: LHT.t('demos.algorithm'), v: LHT.pick(ALGOS[algo].label) },
          { k: LHT.t('demos.visited'), v: String(visited) },
          { k: LHT.t('demos.pathLen'), v: search && search.path.length ? String(search.path.length - 1) : '—' },
          { k: LHT.t('demos.pathCost'), v: search && search.path.length ? String(search.cost) : '—' }
        ]);
      }

      function updateButton() {
        runBtn.set(playing ? LHT.t('demos.pause') : LHT.t('demos.start'));
      }

      function replay() {
        computeSearch();
        if (!search) return;
        revealed = 0;
        playing = true;
        loop.resume();
        updateButton();
        metrics();
        paint();
      }

      /* ---- 交互 ---- */

      var drag = null;

      function cellAt(event) {
        var rect = ctx.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var cx = Math.floor((x - layout.ox) / layout.cell);
        var cy = Math.floor((y - layout.oy) / layout.cell);
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return null;
        return { x: cx, y: cy, id: idx(cx, cy) };
      }

      function onDown(event) {
        var cell = cellAt(event);
        if (!cell) return;
        ctx.canvas.setPointerCapture(event.pointerId);
        if (cell.x === start.x && cell.y === start.y) { drag = 'start'; return; }
        if (cell.x === target.x && cell.y === target.y) { drag = 'target'; return; }
        var erase = event.shiftKey || event.button === 2 || !!walls[cell.id];
        drag = erase ? 'erase' : 'wall';
        walls[cell.id] = erase ? 0 : 1;
        if (cell.id === idx(start.x, start.y) || cell.id === idx(target.x, target.y)) walls[cell.id] = 0;
      }

      function onMove(event) {
        if (!drag) return;
        var cell = cellAt(event);
        if (!cell) return;
        if (drag === 'start') {
          if (walls[cell.id] || (cell.x === target.x && cell.y === target.y)) return;
          start = { x: cell.x, y: cell.y };
        } else if (drag === 'target') {
          if (walls[cell.id] || (cell.x === start.x && cell.y === start.y)) return;
          target = { x: cell.x, y: cell.y };
        } else {
          if ((cell.x === start.x && cell.y === start.y) || (cell.x === target.x && cell.y === target.y)) return;
          walls[cell.id] = drag === 'wall' ? 1 : 0;
        }
        paint();
      }

      function onUp() {
        if (!drag) return;
        drag = null;
        replay();
        metrics();
      }

      ctx.canvas.addEventListener('pointerdown', onDown);
      ctx.canvas.addEventListener('pointermove', onMove);
      ctx.canvas.addEventListener('pointerup', onUp);
      ctx.canvas.addEventListener('pointercancel', onUp);
      ctx.canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      ctx.onCleanup(function () {
        ctx.canvas.removeEventListener('pointerdown', onDown);
        ctx.canvas.removeEventListener('pointermove', onMove);
        ctx.canvas.removeEventListener('pointerup', onUp);
        ctx.canvas.removeEventListener('pointercancel', onUp);
      });

      /* ---- 控件 ---- */

      ctx.select(LHT.t('demos.algorithm'), Object.keys(ALGOS).map(function (key) {
        return { value: key, label: LHT.pick(ALGOS[key].label) };
      }), algo, function (value) { algo = value; replay(); metrics(); });

      var sizeRange = ctx.range(LHT.t('demos.size'), { min: 16, max: 60, value: cols, step: 2 }, function (value) {
        cols = value;
        generate();
        replay();
        metrics();
      });

      ctx.range(LHT.t('demos.speed'), { min: 1, max: 40, value: speed, step: 1 }, function (value) { speed = value; });

      ctx.spacer();

      var runBtn = ctx.button(LHT.t('demos.start'), function () {
        if (!search || revealed >= search.order.length) { replay(); return; }
        playing = !playing;
        if (playing) loop.resume(); else loop.pause();
        updateButton();
      }, 'primary');

      ctx.button(LHT.t('demos.step'), function () {
        playing = false;
        loop.pause();
        revealed = Math.min(revealed + 1, search ? search.order.length : 0);
        updateButton();
        metrics();
        paint();
      });

      ctx.button(LHT.t('demos.shuffle'), function () {
        generate();
        replay();
        metrics();
      });

      var loop = ctx.raf(function () {
        if (search && playing) {
          revealed += speed;
          if (revealed >= search.order.length) {
            revealed = search.order.length;
            playing = false;
            loop.pause();
            updateButton();
          }
        }
        metrics();
        paint();
      });
      loop.pause();

      sizeRange.set(cols);
      ctx.onResize(function () { paint(); });
      generate();
      replay();
      metrics();
    }
  });
})();
