import { NextResponse } from "next/server";
import {
  createOwnerSession,
  normaliseOwnerUsername,
  ownerAccessConfig,
  signOwnerSession,
  verifyOwnerAccessCredentials,
} from "@/lib/owner-access";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type AccessCodeRecord = {
  username: string;
  code_hash: string;
  role: string;
  security_level: number;
  scopes: string[];
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: unknown;
    accessCode?: unknown;
  } | null;

  const username =
    typeof body?.username === "string"
      ? normaliseOwnerUsername(body.username)
      : "";
  const accessCode =
    typeof body?.accessCode === "string" ? body.accessCode.trim() : "";

  if (!username || !accessCode) {
    return NextResponse.json(
      { message: "Enter the username and access code." },
      { status: 400 },
    );
  }

  const databaseRecord = await getDatabaseAccessCode(username);
  const isDatabaseValid = Boolean(
    databaseRecord &&
      databaseRecord.role === "super_admin" &&
      databaseRecord.security_level >= ownerAccessConfig.securityLevel &&
      databaseRecord.scopes.includes("wholesale") &&
      verifyOwnerAccessCredentials(
        username,
        accessCode,
        databaseRecord.code_hash,
      ),
  );
  const isBundledCodeValid = verifyOwnerAccessCredentials(username, accessCode);
  const isValid = isDatabaseValid || isBundledCodeValid;

  if (!isValid) {
    return NextResponse.json(
      { message: "The owner access code was not recognised." },
      { status: 401 },
    );
  }

  await markAccessCodeUsed(username);

  const session = createOwnerSession(username);
  const response = NextResponse.json({
    ok: true,
    username: session.username,
    role: session.role,
    securityLevel: session.securityLevel,
  });

  response.cookies.set(ownerAccessConfig.cookieName, signOwnerSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ownerAccessConfig.sessionTtlSeconds,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ownerAccessConfig.cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

async function getDatabaseAccessCode(username: string) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("access_codes")
    .select("username, code_hash, role, security_level, scopes")
    .eq("username", username)
    .eq("is_active", true)
    .maybeSingle<AccessCodeRecord>();

  if (error || !data) {
    return null;
  }

  return data;
}

async function markAccessCodeUsed(username: string) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  await supabase
    .from("access_codes")
    .update({ last_used_at: new Date().toISOString() })
    .eq("username", username);
}
