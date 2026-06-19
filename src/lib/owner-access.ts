import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export type OwnerAccessSession = {
  username: string;
  role: "owner";
  securityLevel: number;
  issuedAt: number;
  expiresAt: number;
};

export const ownerAccessConfig = {
  username: "davinah84",
  codeHash:
    process.env.VALENTIA_OWNER_ACCESS_CODE_HASH ||
    "e65e237f997272beb978cf2a43013708c275ec265c4452a8b326f5b86022a1ea",
  cookieName: "valentia_owner_access",
  role: "owner" as const,
  securityLevel: 100,
  sessionTtlSeconds: 60 * 60 * 12,
};

export function normaliseOwnerUsername(username: string) {
  return username.trim().toLowerCase();
}

export function hashOwnerAccessCode(username: string, accessCode: string) {
  return createHash("sha256")
    .update(`${normaliseOwnerUsername(username)}:${accessCode.trim()}`)
    .digest("hex");
}

export function verifyOwnerAccessCredentials(
  username: string,
  accessCode: string,
  expectedHash = ownerAccessConfig.codeHash,
) {
  const normalisedUsername = normaliseOwnerUsername(username);

  if (normalisedUsername !== ownerAccessConfig.username) {
    return false;
  }

  return safeEqual(hashOwnerAccessCode(username, accessCode), expectedHash);
}

export function createOwnerSession(username: string): OwnerAccessSession {
  const issuedAt = Date.now();

  return {
    username: normaliseOwnerUsername(username),
    role: ownerAccessConfig.role,
    securityLevel: ownerAccessConfig.securityLevel,
    issuedAt,
    expiresAt: issuedAt + ownerAccessConfig.sessionTtlSeconds * 1000,
  };
}

export function signOwnerSession(session: OwnerAccessSession) {
  const body = Buffer.from(JSON.stringify(session), "utf8").toString(
    "base64url",
  );
  const signature = createHmac("sha256", ownerSigningSecret())
    .update(body)
    .digest("base64url");

  return `${body}.${signature}`;
}

export function verifyOwnerSessionCookie(value?: string) {
  if (!value) {
    return null;
  }

  const [body, signature] = value.split(".");

  if (!body || !signature) {
    return null;
  }

  const expectedSignature = createHmac("sha256", ownerSigningSecret())
    .update(body)
    .digest("base64url");

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as OwnerAccessSession;

    if (
      session.username !== ownerAccessConfig.username ||
      session.role !== ownerAccessConfig.role ||
      session.securityLevel < ownerAccessConfig.securityLevel ||
      session.expiresAt < Date.now()
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function ownerSigningSecret() {
  return (
    process.env.VALENTIA_OWNER_ACCESS_SIGNING_SECRET ||
    ownerAccessConfig.codeHash
  );
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
