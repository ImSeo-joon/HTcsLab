/* ============================================================
   sw.js — Service Worker

   策略（对本站这种小体量静态站，可用性优先）：
   · 同源请求：网络优先，成功就顺手更新缓存；断网时回落缓存
   · 导航请求失败时回落首页，保证离线也能打开
   · 跨域请求（CDN、Pyodide、Wandbox 等）：一律直连，不缓存

   这样改了 CSS / JS 之后刷新即可见，不会被缓存挡住；
   离线时仍能打开已预缓存过的页面。

   只在 http(s) 下注册；file:// 直接打开时浏览器不支持 Service Worker。
   ============================================================ */

'use strict';

/* 改了资源后把这个版本号加一，客户端会整体换新缓存 */
var CACHE_VERSION = 'v13';
var CACHE = 'haute-table-lab-' + CACHE_VERSION;

var SHELL = [
  './',
  './index.html',
  './practice.html',
  './resources.html',
  './demos.html',
  './contests.html',
  './collabs.html',
  './battle.html',
  './notes.html',
  './404.html',
  './manifest.json',
  './assets/css/base.css',
  './assets/css/modules.css',
  './assets/js/i18n.js',
  './assets/js/site.js',
  './assets/js/sandbox.js',
  './assets/js/practice.js',
  './assets/js/resources.js',
  './assets/js/contests.js',
  './assets/js/collabs.js',
  './assets/js/battle.js',
  './assets/js/demos.js',
  './assets/js/demo-sort.js',
  './assets/js/demo-path.js',
  './assets/js/demo-nn.js',
  './assets/js/demo-dp.js',
  './assets/js/demo-bst.js',
  './assets/js/demo-attn.js',
  './data/problems.js',
  './data/c-track.js',
  './data/hard-track.js',
  './data/math-track.js',
  './data/py-track.js',
  './data/resources.js',
  './data/contests.js',
  './data/collabs.js',
  './data/collabs-ja.js',
  './data/battle-scenarios.js',
  './assets/img/hero-jp.jpg',
  './assets/img/favicon.ico',
  './assets/img/favicon-32.png',
  './assets/img/mark-96.png',
  './assets/img/mark-192.png',
  './assets/img/mark-512.png',
  './assets/img/mark-wide.png',
  './assets/img/apple-touch-icon.png',
  './assets/img/logo.jpg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // 单个文件失败不影响整体安装
      return Promise.all(SHELL.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        return key === CACHE ? null : caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;   // 跨域交给浏览器直连

  event.respondWith(
    // 关键：no-cache 会强制向服务器校验，不会直接吃浏览器 HTTP 缓存。
    // 否则本地开发时改了 JS，刷新后仍可能拿到旧文件。
    fetch(new Request(request, { cache: 'no-cache' })).then(function (response) {
      if (response && response.status === 200 && response.type === 'basic') {
        var copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
      }
      return response;
    }).catch(function () {
      return caches.match(request).then(function (cached) {
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
