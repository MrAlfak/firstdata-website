/**
 * First Data PWA service worker — offline fallback, app shell cache, push notifications.
 */
const CACHE_VERSION = "fd-pwa-v3";
const RUNTIME_CACHE = "fd-runtime-v3";
const SHELL_CACHE = "fd-shell-v3";
const PRECACHE_URLS = [
  "/",
  "/offline",
  "/offline-fallback.html",
  "/manifest.webmanifest",
  "/icon.svg",
  "/fonts/jetbrains/JetBrainsMono-latin.woff2",
  "/fonts/pixelify/PixelifySans-latin.woff2",
];

function isNavigationRequest(request) {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      request.headers.get("accept")?.includes("text/html"))
  );
}

function isSameOrigin(url) {
  try {
    return new URL(url).origin === self.location.origin;
  } catch {
    return false;
  }
}

function isNextStaticAsset(url) {
  return url.pathname.startsWith("/_next/static/");
}

async function offlineDocumentResponse() {
  const shell = await caches.open(SHELL_CACHE);
  const offlinePage = await shell.match("/offline");
  if (offlinePage) return offlinePage;

  const fallback = await shell.match("/offline-fallback.html");
  if (fallback) return fallback;

  const home = await shell.match("/");
  if (home) return home;

  return new Response("Offline", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function hasExpectedStaticMime(url, response) {
  const type = response.headers.get("content-type") || "";
  if (url.pathname.endsWith(".js")) {
    return type.includes("javascript") || type.includes("ecmascript");
  }
  if (url.pathname.endsWith(".css")) {
    return type.includes("css");
  }
  return response.ok;
}

async function cachePutSafe(cacheName, request, response) {
  if (!response || !response.ok) return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            await shell.add(new Request(url, { cache: "reload" }));
          } catch {
            /* best-effort precache */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const keep = new Set([CACHE_VERSION, RUNTIME_CACHE, SHELL_CACHE]);
      await Promise.all(
        keys.filter((key) => !keep.has(key)).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !isSameOrigin(request.url)) return;

  const url = new URL(request.url);

  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response.status >= 500) {
            const offline = await offlineDocumentResponse();
            if (offline.status !== 503) return offline;
          }
          if (response.ok) {
            await cachePutSafe(SHELL_CACHE, request, response);
          }
          return response;
        } catch {
          const cached =
            (await caches.match(request)) || (await offlineDocumentResponse());
          return cached;
        }
      })(),
    );
    return;
  }

  if (isNextStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        const networkPromise = fetch(request)
          .then(async (response) => {
            if (response.ok && hasExpectedStaticMime(url, response)) {
              await cachePutSafe(RUNTIME_CACHE, request, response);
            }
            return response;
          })
          .catch(() => null);

        if (cached && hasExpectedStaticMime(url, cached)) {
          event.waitUntil(networkPromise);
          return cached;
        }

        const network = await networkPromise;
        if (network) return network;

        if (cached) {
          const runtime = await caches.open(RUNTIME_CACHE);
          await runtime.delete(request);
        }

        throw new Error("Asset unavailable offline");
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cachePutSafe(RUNTIME_CACHE, request, response);
        }
        return response;
      } catch {
        const cached = (await caches.match(request)) ?? null;
        if (cached) return cached;
        throw new Error("Network unavailable");
      }
    })(),
  );
});

self.addEventListener("push", (event) => {
  let payload = {
    title: "First Data",
    body: "You have a new update.",
    url: "/",
    tag: "fd-notification",
  };

  try {
    if (event.data) {
      payload = { ...payload, ...event.data.json() };
    }
  } catch {
    if (event.data) {
      payload.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icon.svg",
      badge: "/icon.svg",
      tag: payload.tag,
      data: { url: payload.url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        if ("focus" in client) {
          await client.focus();
          return;
        }
      }

      await self.clients.openWindow(targetUrl);
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
