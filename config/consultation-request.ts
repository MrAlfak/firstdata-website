export const CONTACT_METHOD_KEYS = ["call", "whatsapp", "telegram", "email"] as const;
export type ContactMethodKey = (typeof CONTACT_METHOD_KEYS)[number];

export const CONTACT_TIME_KEYS = ["morning", "noon", "afternoon"] as const;
export type ContactTimeKey = (typeof CONTACT_TIME_KEYS)[number];
