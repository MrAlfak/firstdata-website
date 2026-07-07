import webpush from "web-push";

let configured = false;

export function isPushConfigured(): boolean {
  return Boolean(
    process.env.VAPID_PRIVATE_KEY?.trim() &&
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() &&
      process.env.VAPID_SUBJECT?.trim(),
  );
}

export function configureWebPush(): void {
  if (configured || !isPushConfigured()) return;

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
  configured = true;
}

export type PushMessage = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
};

export async function sendPushNotification(
  subscription: webpush.PushSubscription,
  message: PushMessage,
): Promise<void> {
  configureWebPush();
  if (!configured) {
    throw new Error("Push notifications are not configured.");
  }

  await webpush.sendNotification(
    subscription,
    JSON.stringify({
      title: message.title,
      body: message.body,
      url: message.url ?? "/",
      tag: message.tag ?? "fd-notification",
    }),
  );
}

export { webpush };
