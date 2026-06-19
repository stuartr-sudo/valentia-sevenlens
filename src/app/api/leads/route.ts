import { NextResponse } from "next/server";
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
    return NextResponse.json(
      {
        ok: true,
        mode: "local-preview",
        message:
          "You are on the local preview list. Add Supabase env vars to persist this.",
      },
      { status: 202 },
    );
  }

  const { error } = await supabase
    .from("waitlist_signups")
    .upsert(payload, { onConflict: "email" });

  if (error) {
    return NextResponse.json(
      { message: "Unable to save this email right now." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You are on the founding list.",
  });
}
