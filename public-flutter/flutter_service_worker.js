'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "2ae0c3ede420d90b993915f89f85a724",
"/": "2ae0c3ede420d90b993915f89f85a724",
"main.dart.js": "f70c785b6f15b4e9196a9fd6b790a1e3",
"favicon.png": "889d520959e5c23029841d11305db431",
"icons/Icon-192.png": "e2b2a54bc772635e9b41abd42d6591fe",
"icons/Icon-512.png": "d874607c2c8666b98111585482554a97",
"manifest.json": "2501e5c6bc900137a293e76241ded2f2",
"assets/AssetManifest.json": "219b2ef605bdaf9e25f666c0d4fd2ae0",
"assets/NOTICES": "98eae8824f365fd2ff63c03b2a7f7e9f",
"assets/FontManifest.json": "5a1ebe79b91b3da6df70e05fbd41d249",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "d80ca32233940ebadc5ae5372ccd67f9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "a126c025bab9a1b4d8ac5534af76a208",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "831eb40a2d76095849ba4aecd4340f19",
"assets/packages/flutter_signin_button/assets/logos/google_dark.png": "c32e2778b1d6552b7b4055e49407036f",
"assets/packages/flutter_signin_button/assets/logos/google_light.png": "f71e2d0b0a2bc7d1d8ab757194a02cac",
"assets/packages/flutter_signin_button/assets/logos/2.0x/google_dark.png": "937022ea241c167c8ce463d2ef7ed105",
"assets/packages/flutter_signin_button/assets/logos/2.0x/google_light.png": "8f10eb93525f0c0259c5e97271796b3c",
"assets/packages/flutter_signin_button/assets/logos/2.0x/facebook_new.png": "83bf0093719b2db2b16e2839aee1069f",
"assets/packages/flutter_signin_button/assets/logos/3.0x/google_dark.png": "ac553491f0002941159b405c2d37e8c6",
"assets/packages/flutter_signin_button/assets/logos/3.0x/google_light.png": "fe46d37e7d6a16ecd15d5908a795b4ee",
"assets/packages/flutter_signin_button/assets/logos/3.0x/facebook_new.png": "12531aa3541312b7e5ddd41223fc60cb",
"assets/packages/flutter_signin_button/assets/logos/facebook_new.png": "e1dff5c319a9d7898aee817f624336e3",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/assets/images/openingAnimation.gif": "56548ebcdb602d0b05c81f1ac7fbf414",
"assets/assets/images/welcome_people.png": "f34fb5775229d8782d75db848249b890",
"assets/assets/images/logo.flr": "4e700d6dfbf9ef407246c08539bda3dd",
"assets/assets/images/lawn_sheep.png": "598e907a52f08a1b6600aaab3766f003",
"assets/assets/images/thumbs_up.png": "3097511192a8a623ae6353820f8ed022",
"assets/assets/images/search_sheep.png": "0f09e2e2a4148cbe3288fb8b395336e5",
"assets/assets/images/message_bubbles.png": "1652bce2f06a978e9808ad93c9652ede",
"assets/assets/images/temp_web.flr": "bc234012b8e6feff2a08a7406c6624b6",
"assets/assets/fonts/PlayfairDisplay/PlayfairDisplay-Regular.ttf": "b3721ba3bde34e5b38b0e1523cccfd7f",
"assets/assets/fonts/PlayfairDisplay/PlayfairDisplay-Black.ttf": "bdc1fd7c2a35112242865c525d7c7975",
"assets/assets/fonts/Rubik/Rubik-MediumItalic.ttf": "56583c2363a20436f7448d9b963c0463",
"assets/assets/fonts/Rubik/Rubik-Bold.ttf": "9a6fb6f5cd3aa4ab1adaaab1f693f266",
"assets/assets/fonts/Rubik/Rubik-Light.ttf": "7a06846baf7fd2cfb18c7ab4d663c8ca",
"assets/assets/fonts/Rubik/Rubik-Medium.ttf": "c87313aa86b7caa31a9a0accaa584970",
"assets/assets/fonts/Rubik/Rubik-Black.ttf": "fba2019b0b09731cc334297955971642",
"assets/assets/fonts/Rubik/Rubik-Italic.ttf": "9a5eb2e5a64a12fe3cf7b6436690296a",
"assets/assets/fonts/Rubik/Rubik-LightItalic.ttf": "4fd638a635e1b6cbd62a64fc717694fa",
"assets/assets/fonts/Rubik/Rubik-BlackItalic.ttf": "849377dd9955004ffa915488230047f3",
"assets/assets/fonts/Rubik/Rubik-Regular.ttf": "b3d0902b533ff4c4f1698a2f96ddabab",
"assets/assets/fonts/Rubik/Rubik-BoldItalic.ttf": "c002cd789eb43641c98b7817ee26e3e3",
"assets/assets/fonts/ElsieSwashCaps/ElsieSwashCaps-Black.ttf": "85fa430b439994c817bbb8e93abff2e7",
"assets/assets/fonts/ElsieSwashCaps/ElsieSwashCaps-Regular.ttf": "13a39db7702afecce17fa6de7df8fe2c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
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
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
    return self.skipWaiting();
  }
  if (event.message === 'downloadOffline') {
    downloadOffline();
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
  for (var resourceKey in Object.keys(RESOURCES)) {
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
