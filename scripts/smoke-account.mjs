/**
 * Smoke test for account/auth API flows (dev only).
 * Usage: node scripts/smoke-account.mjs
 */
import { TOTP, Secret } from "otpauth";

const BASE = process.env.SMOKE_BASE ?? "http://localhost:4000";
const email = `smoke.${Date.now()}@test.local`;
const password = "SmokeTest123!";
const newPassword = "SmokeReset456!";
const name = "Smoke Tester";

const cookies = new Map();
let passed = 0;
let failed = 0;

function storeCookies(res) {
  const list = typeof res.headers.getSetCookie === "function"
    ? res.headers.getSetCookie()
    : [];
  if (list.length === 0) {
    const single = res.headers.get("set-cookie");
    if (single) list.push(single);
  }
  for (const raw of list) {
    const part = raw.split(";")[0];
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq);
    const val = part.slice(eq + 1);
    if (val === "" || /Max-Age=0/i.test(raw)) cookies.delete(key);
    else cookies.set(key, val);
  }
}

function cookieHeader() {
  return [...cookies.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function api(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const ck = cookieHeader();
  if (ck) headers.Cookie = ck;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  storeCookies(res);
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { status: res.status, data, ok: res.ok };
}

function assert(label, cond, detail = "") {
  if (cond) {
    passed += 1;
    console.log(`  ✓ ${label}`);
  } else {
    failed += 1;
    console.error(`  ✗ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function totpCode(secret, label) {
  const totp = new TOTP({
    issuer: "First Data",
    label,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
  return totp.generate();
}

async function main() {
  console.log(`\nSmoke test → ${BASE}`);
  console.log(`Test user: ${email}\n`);

  // 1. Register
  console.log("1. Register");
  let r = await api("/api/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
  if (!r.ok && r.data === null) {
    console.error("  ! register returned non-JSON", r.status);
  }
  assert("register 200", r.ok && r.data?.success);
  assert("logged in after register", Boolean(r.data?.user?.id));

  // 2. Me
  console.log("2. Session / me");
  r = await api("/api/auth/me");
  assert("me returns user", r.data?.user?.email === email);
  assert("email unverified", r.data?.user?.emailVerified === false);

  // 3. Verify email
  console.log("3. Verify email");
  r = await api("/api/panel/account/verify-email", { method: "POST" });
  const verifyCode = r.data?.devCode;
  assert("verify OTP sent", r.ok && (verifyCode || r.data?.message));
  if (verifyCode) {
    r = await api("/api/panel/account/verify-email", {
      method: "PATCH",
      body: { code: String(verifyCode) },
    });
    assert("email verified", r.ok && r.data?.user?.emailVerified === true);
  }

  // 4. Account GET
  console.log("4. Account profile");
  r = await api("/api/panel/account");
  assert("account GET", r.ok && r.data?.user?.name === name);

  // 5. Sessions
  console.log("5. Sessions");
  r = await api("/api/panel/account/sessions");
  assert("sessions list", r.ok && Array.isArray(r.data?.sessions));
  assert("has current session", (r.data?.sessions ?? []).some((s) => s.current));

  // 6. Org
  console.log("6. Organization");
  r = await api("/api/panel/org");
  assert("org endpoint", r.ok && Array.isArray(r.data?.organizations));

  // 7. Enable 2FA
  console.log("7. Two-factor (TOTP)");
  r = await api("/api/panel/account/2fa");
  const secret = r.data?.secret;
  assert("2FA setup secret", r.ok && secret);
  if (secret) {
    const label = email;
    const code = totpCode(secret, label);
    r = await api("/api/panel/account/2fa", {
      method: "POST",
      body: { code, currentPassword: password },
    });
    assert("2FA enabled", r.ok && r.data?.enabled === true);
  }

  // 8. Logout + login with 2FA
  console.log("8. Login with 2FA");
  await api("/api/auth/logout", { method: "POST" });
  r = await api("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  assert("login requires TOTP", r.data?.requiresTotp === true && r.data?.preAuthToken);
  const preAuth = r.data?.preAuthToken;
  if (preAuth && secret) {
    const code = totpCode(secret, email);
    r = await api("/api/auth/2fa/verify", {
      method: "POST",
      body: { preAuthToken: preAuth, code },
    });
    assert("2FA login complete", r.ok && r.data?.user?.id);
  }

  // 9. Password reset
  console.log("9. Password reset");
  await api("/api/auth/logout", { method: "POST" });
  r = await api("/api/auth/password/forgot", {
    method: "POST",
    body: { channel: "email", email },
  });
  const resetCode = r.data?.devCode;
  assert("reset code sent", r.ok && resetCode);
  if (resetCode) {
    r = await api("/api/auth/password/reset", {
      method: "POST",
      body: {
        channel: "email",
        email,
        code: String(resetCode),
        password: newPassword,
        confirmPassword: newPassword,
      },
    });
    assert("password reset OK", r.ok);
  }

  // 10. Login with new password (2FA still on)
  console.log("10. Login after reset");
  r = await api("/api/auth/login", {
    method: "POST",
    body: { email, password: newPassword },
  });
  assert("login requires TOTP after reset", r.data?.requiresTotp === true);
  if (r.data?.preAuthToken && secret) {
    r = await api("/api/auth/2fa/verify", {
      method: "POST",
      body: { preAuthToken: r.data.preAuthToken, code: totpCode(secret, email) },
    });
    assert("logged in with new password", r.ok);
  }

  // 11. Disable 2FA
  console.log("11. Disable 2FA");
  if (secret) {
    r = await api("/api/panel/account/2fa", {
      method: "DELETE",
      body: { code: totpCode(secret, email), currentPassword: newPassword },
    });
    assert("2FA disabled", r.ok && r.data?.enabled === false);
  } else {
    assert("2FA disabled", false, "skipped — no secret");
  }

  // 12. Change password via account PATCH
  console.log("12. Update profile/password");
  r = await api("/api/panel/account", {
    method: "PATCH",
    body: {
      name: "Smoke Updated",
      currentPassword: newPassword,
      password,
      confirmPassword: password,
    },
  });
  assert("profile updated", r.ok && r.data?.user?.name === "Smoke Updated");

  // 13. Delete account
  console.log("13. Delete account");
  r = await api("/api/panel/account", {
    method: "DELETE",
    body: { confirm: "DELETE", currentPassword: password },
  });
  assert("account deactivated", r.ok);
  r = await api("/api/auth/me");
  assert("session cleared after delete", !r.data?.user);

  console.log(`\nResult: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
