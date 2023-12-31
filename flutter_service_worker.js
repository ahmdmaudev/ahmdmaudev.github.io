'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "05c7e76500bec0143aa71b8880f41ee8",
"index.html": "cb41239204e61eb212a78d01bb764a07",
"/": "cb41239204e61eb212a78d01bb764a07",
"main.dart.js": "530aa2a23fb85a2f1a7f655879be0dd3",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "f72693e99180d8a934b6a11fe9afd274",
"assets/AssetManifest.json": "30cd05dfc914e30a32d31f49a4abd63f",
"assets/NOTICES": "c948840f7bd749f96e137a648bf077fc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/shaders/ink_sparkle.frag": "be915bf85127fb1bfeeebca214be4c39",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/loading.json": "d3852001575338a5cdf48d5f03999505",
"assets/assets/images/cms_recruiter_logo.svg": "088081ca3894751be3039b043737cbd5",
"assets/assets/images/cms_recruiter_logo.png": "9aa14cfe82c8b52a8af232db3406056c",
"assets/assets/images/cms_profile_logo.png": "09dd42b4ca564d7d0a116ac8df23fa3c",
"assets/assets/images/empty_product_icon.png": "3bc8cb7f4fc428c532d4d7806ea12e60",
"assets/assets/icons/ic-cms-profile-selected.svg": "dcc6d0dc5698abbf31085ab4340f3214",
"assets/assets/icons/ic-show-password.svg": "7e88e841fe1ef0e78c5c770b395b2407",
"assets/assets/icons/ic-home-selected.svg": "49cb0dd4262c750a8530da8f1864b89a",
"assets/assets/icons/ic_cms_copy.svg": "e6e72210dfd2d60c40754a29904f784b",
"assets/assets/icons/ic-share.svg": "fee8846692d7141503ffbc07b3a61b58",
"assets/assets/icons/ic-my-product.svg": "9acafcbafc237a12cad6f33434d9c194",
"assets/assets/icons/ic_cms_dotNonAktif.svg": "bf4c5cf582507c5cb0834d6c578a2e29",
"assets/assets/icons/ic_cms_homeSelected.svg": "36476eab404906f76e8240f1a8a32e3d",
"assets/assets/icons/ic-cms-profile.svg": "59833ea9b7ac9a3ba7cb8ec7293518b2",
"assets/assets/icons/ic_cms_arrowdown.svg": "1d841fd6e18ace988ddea9de78ab09f1",
"assets/assets/icons/ic_cms_listSelected.svg": "5a29b38f956c6b328e00f9d5551830d4",
"assets/assets/icons/ic-my-product-selected.svg": "cb34ef505ce4f05332624bc7943d223a",
"assets/assets/icons/ic_cms_list.svg": "5e3fce7d981cee8f047623dbf2217b48",
"assets/assets/icons/ic-search.png": "e72f7cf09cfef9fff00f7f8a73c3126b",
"assets/assets/icons/ic_eye_off.png": "c6e1c2fa8ac6bf8cc921ae2c82e270d3",
"assets/assets/icons/ic-hide-password.svg": "3cda62fe7dfad7f318c21365d9b6ba2b",
"assets/assets/icons/ic_cms_home.svg": "1b94f9185692cf617c6c33d2af6c3339",
"assets/assets/icons/ic_cms_mart.svg": "d993ecbb581a04e2cc4dde976ef4e12e",
"assets/assets/icons/ic_cms_info.svg": "e74aa75c1d16eb8307f982fe9568c6ea",
"assets/assets/icons/ic_cms_dotAktif.svg": "cfe08923d27aa309bab1fee96f3878cc",
"assets/assets/icons/ic_eye_light.png": "7cac69ea499767d0836fddde3e5fd020",
"assets/assets/icons/ic_cms_shopping.svg": "34cf46f4ae763761502d6f4623c1ba98",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
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
