import { corePageResponse } from "@/lib/core-pages";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  return corePageResponse("quiz.html");
}
