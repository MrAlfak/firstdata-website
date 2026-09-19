/** @type {import('next').NextConfig} */

/**
 * @param {string} frameAncestors
 * @param {{ spline?: boolean }} [opts]
 * Spline 1.12.98 fetches modelling/boolean WASM from unpkg and Draco from gstatic.
 * Those hosts are allowed only on `/embed/*` (hero iframe), not the rest of the site.
 * `'wasm-unsafe-eval'` is required site-wide for on-device Vosk STT (assistant mic).
 */
function contentSecurityPolicy(frameAncestors, opts = {}) {
  const spline = Boolean(opts.spline);
  const scriptSrc = [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
    "https://plausible.io https://www.googletagmanager.com https://www.google-analytics.com",
  ]
    .filter(Boolean)
    .join(" ");
  const connectSrc = [
    "connect-src 'self' https://plausible.io https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://prod.spline.design https://api.zarinpal.com https://sandbox.zarinpal.com https://www.zarinpal.com",
    spline
      ? "https://unpkg.com https://www.gstatic.com https://apis.spline.design https://hooks.spline.design"
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    connectSrc,
    "frame-src 'self' https://prod.spline.design",
    "media-src 'self' data: blob: https://d8j0ntlcm91z4.cloudfront.net",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${frameAncestors}`,
    "upgrade-insecure-requests",
  ].join("; ");
}

const nextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  // Allow both localhost and 127.0.0.1 during `next dev` (HMR / fonts)
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];

    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Same-origin iframe for the Spline hero embed (parent scroll isolation).
      {
        source: "/embed/:path*",
        headers: [
          ...securityHeaders,
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy("'self'", { spline: true }),
          },
        ],
      },
      // Deny framing everywhere else (exclude /embed/* so DENY does not override above).
      {
        source: "/((?!embed(?:/|$)).*)",
        headers: [
          ...securityHeaders,
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy("'none'") },
        ],
      },
    ];
  },
};

export default nextConfig;
