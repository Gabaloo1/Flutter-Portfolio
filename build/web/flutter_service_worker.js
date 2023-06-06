'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "aacdbca5a9b8dfbb91dd2cc74916311a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/lib/icons/github_2x.png": "6401c06a4431eb5619083e6a1783ed63",
"assets/lib/icons/linkedin_2x.png": "05c47a776fed9b4cd955e073f6528255",
"assets/lib/icons/mob_dev.png": "0b269d07676728567ecc4515b45ee02a",
"assets/lib/icons/pen.png": "858e481ed2f6569c100ad50159f99f86",
"assets/lib/icons/twitter_2x.png": "d5011590d94aab0f6e051754d553459d",
"assets/lib/icons/web.png": "344fd3cde2e70569da2f0df1ef555759",
"assets/lib/images/ai.png": "4694012f54955f5dd1e2d6b2789b0416",
"assets/lib/images/blog.png": "d2248342582e3e5a0ce0e26b4a4aed3a",
"assets/lib/images/calender.png": "7f1f8986016a9382d8922af6283722d3",
"assets/lib/images/chat.png": "5f0bb2ecc91102627491ead9afa2efdf",
"assets/lib/images/core.png": "cc38271f248bb7a8b76b61a0c95cb5ca",
"assets/lib/images/crypto.png": "18095b8133dbe48b6910ce992df44565",
"assets/lib/images/gabriel01.jpg": "bca793ea53c9a516f58b583d054a25ae",
"assets/lib/images/gabriel02.jpg": "99b7da6f66ec179d8907ed50a42d00d0",
"assets/lib/images/microsoft.png": "a3ad60dce5e514f870bc57cee7197017",
"assets/lib/images/microsoft1.png": "3d6a2ad56bc3403c5cfcc3efe09b741b",
"assets/lib/images/myImage.jpg": "ebc7064777da876f095541e018b6e39d",
"assets/lib/images/myImage.png": "8c8cdca0a8568f6cecbe63fd8b0c0d51",
"assets/lib/images/myImage1.jpg": "ebc7064777da876f095541e018b6e39d",
"assets/lib/images/news.png": "ba5d13e470404021307b1ed3fb81c4c7",
"assets/lib/images/spartahack.png": "7f97df33cc5c4ff27f8821aef853c514",
"assets/lib/images/ta.png": "c8943dfb10a5a190893f4ae5ad2caa0d",
"assets/lib/images/ta1.png": "2ca03ee16d4a3d9d0c7d32ddcb55b2b5",
"assets/NOTICES": "a5076b3587c00d190a3486d0e1349bcf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/android-chrome-192x192.png": "20c22bfe0fdffd7ec6c67ab7df624c54",
"icons/android-chrome-512x512.png": "fbdc356736c1a223e60bf0ed4cd408e9",
"icons/apple-touch-icon.png": "3192158deb7afe66349fab2aa7c7058b",
"icons/favicon-16x16.png": "be6e1b168578dc7ae67be6ca949bb42b",
"icons/favicon-32x32.png": "e7c00ed108e837ae7a869c83a2d9e7cf",
"icons/favicon.ico": "1473e7b2b829fa75e49bae78449a1375",
"index.html": "093a0b0db7f5fe992c33f0d79e027a9e",
"/": "093a0b0db7f5fe992c33f0d79e027a9e",
"logo.png": "20c22bfe0fdffd7ec6c67ab7df624c54",
"main.dart.js": "e4d1c5858b927f8c89832a8138c57466",
"manifest.json": "502dc69ed8ae3297e290c42f9c2c27ee",
"version.json": "fb8d4678888024cd5f83d8522bb3a722"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
