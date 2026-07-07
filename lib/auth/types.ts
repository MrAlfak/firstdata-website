export type UserRecord = {

  id: number;

  email: string | null;

  phone: string | null;

  name: string;

  password_hash: string | null;

  role?: string;

  email_verified_at?: string | null;

  phone_verified_at?: string | null;

  status?: string;

  totp_secret?: string | null;

  totp_enabled?: number;

  created_at: string;

  updated_at: string;

};



export type PublicUser = {

  id: number;

  email: string | null;

  phone: string | null;

  name: string;

  hasPassword: boolean;

  emailVerified: boolean;

  phoneVerified: boolean;

  totpEnabled: boolean;

  status: "active" | "deactivated";

  createdAt: string;

  role: string;

};



export type OtpPurpose =

  | "login"

  | "register"

  | "reset_password"

  | "verify_email"

  | "change_email"

  | "change_phone"

  | "delete_account";



export type OtpChannel = "email" | "sms";



export function toPublicUser(user: UserRecord): PublicUser {

  return {

    id: user.id,

    email: user.email,

    phone: user.phone,

    name: user.name,

    hasPassword: Boolean(user.password_hash),

    emailVerified: Boolean(user.email_verified_at),

    phoneVerified: Boolean(user.phone_verified_at),

    status: user.status === "deactivated" ? "deactivated" : "active",

    totpEnabled: Boolean(user.totp_enabled),

    createdAt: user.created_at,

    role: user.role ?? "client",

  };

}



export function userContactLabel(user: PublicUser | UserRecord): string {

  return user.email ?? user.phone ?? user.name;

}



export function isUserActive(user: UserRecord): boolean {

  return user.status !== "deactivated";

}

