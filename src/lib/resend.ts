import { siteConfig } from "@/lib/site";

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 8000;

type NotificationInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

type NotificationResult = {
  configured: boolean;
  sent: boolean;
  id?: string;
  error?: string;
};

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function parseRecipients(value: string) {
  return value
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textToHtml(text: string) {
  return `<pre style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; line-height: 1.55; white-space: pre-wrap;">${escapeHtml(text)}</pre>`;
}

export async function sendOwnerNotification({
  subject,
  text,
  replyTo,
}: NotificationInput): Promise<NotificationResult> {
  const apiKey = cleanEnv(process.env.RESEND_API_KEY);
  const from = cleanEnv(process.env.RESEND_FROM_EMAIL);
  const recipients = parseRecipients(
    cleanEnv(process.env.RESEND_NOTIFICATION_TO) || siteConfig.contactEmail,
  );

  if (!apiKey || !from || recipients.length === 0) {
    return { configured: false, sent: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_EMAILS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject,
        text,
        html: textToHtml(text),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("Resend notification failed", { status: response.status });
      return { configured: true, sent: false, error: `resend_${response.status}` };
    }

    const payload = (await response.json()) as { id?: string };
    return { configured: true, sent: true, id: payload.id };
  } catch (error) {
    console.error(
      "Resend notification failed",
      error instanceof Error ? error.message : error,
    );
    return { configured: true, sent: false, error: "resend_request_failed" };
  } finally {
    clearTimeout(timeout);
  }
}
