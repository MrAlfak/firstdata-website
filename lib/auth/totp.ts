import { TOTP, Secret } from "otpauth";

const ISSUER = "First Data";

export function generateTotpSecret(): string {
  const secret = new Secret({ size: 20 });
  return secret.base32;
}

export function buildTotp(secretBase32: string, label: string): TOTP {
  return new TOTP({
    issuer: ISSUER,
    label,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secretBase32),
  });
}

export function getTotpUri(secretBase32: string, label: string): string {
  return buildTotp(secretBase32, label).toString();
}

export function verifyTotpCode(secretBase32: string, label: string, code: string): boolean {
  const totp = buildTotp(secretBase32, label);
  const delta = totp.validate({ token: code, window: 1 });
  return delta !== null;
}
