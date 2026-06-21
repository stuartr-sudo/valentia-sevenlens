import { NextResponse } from "next/server";
import { sendOwnerNotification } from "@/lib/resend";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    name?: unknown;
    source?: unknown;
  } | null;

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const source = typeof body?.source === "string" ? body.source.trim() : "site";

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();
  const payload = {
    email,
    name: name || null,
    source,
    status: "new",
    metadata: {
      captured_via: "valentia-sevenlens-site",
    },
  };

  if (!supabase) {
    const notification = await sendOwnerNotification({
      subject: "New Valentia founding-list signup",
      replyTo: email,
      text: [
        "New Valentia founding-list signup",
        "",
        `Email: ${email}`,
        `Name: ${name || "Not provided"}`,
        `Source: ${source}`,
        "Mode: local preview",
      ].join("\n"),
    });

    return NextResponse.json(
      {
        ok: true,
        mode: "local-preview",
        emailConfigured: notification.configured,
        emailSent: notification.sent,
        message:
          "You are on the local preview list. Add Supabase env vars to persist this.",
      },
      { status: 202 },
    );
  }

  const { error } = await supabase
    .from("valentia_waitlist_signups")
    .upsert(payload, { onConflict: "email" });

  if (error) {
    return NextResponse.json(
      { message: "Unable to save this email right now." },
      { status: 500 },
    );
  }

  const notification = await sendOwnerNotification({
    subject: "New Valentia founding-list signup",
    replyTo: email,
    text: [
      "New Valentia founding-list signup",
      "",
      `Email: ${email}`,
      `Name: ${name || "Not provided"}`,
      `Source: ${source}`,
    ].join("\n"),
  });

  return NextResponse.json({
    ok: true,
    emailConfigured: notification.configured,
    emailSent: notification.sent,
    message: "You are on the founding list.",
  });
}
