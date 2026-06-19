"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function FoundingListForm({
  source = "homepage",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          source,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to join right now.");
      }

      setStatus("success");
      setMessage(payload.message || "You are on the founding list.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to join right now.",
      );
    }
  }

  return (
    <form
      id={compact ? undefined : "join"}
      onSubmit={onSubmit}
      className={compact ? "space-y-3" : "rounded-lg border border-line bg-white p-4 shadow-[0_22px_60px_-42px_rgba(40,61,33,0.5)]"}
    >
      {!compact ? (
        <div className="mb-4 grid gap-1">
          <h3 className="font-display text-3xl text-forest">
            Join the founding list
          </h3>
          <p className="text-sm leading-6 text-forest/70">
            First access, formulation notes, and exclusive launch pricing.
          </p>
        </div>
      ) : null}

      <div className={compact ? "flex gap-2" : "grid gap-3 sm:grid-cols-[1fr_1fr_auto]"}>
        {!compact ? (
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Name"
            className="min-h-12 rounded border border-line bg-cream px-4 text-sm text-forest outline-none transition placeholder:text-forest/45 focus:border-sage"
          />
        ) : null}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className={`min-h-12 rounded border px-4 text-sm outline-none transition ${
            compact
              ? "min-w-0 flex-1 border-white/25 bg-white/10 text-white placeholder:text-white/55 focus:border-rose"
              : "border-line bg-cream text-forest placeholder:text-forest/45 focus:border-sage"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded px-5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-70 ${
            compact
              ? "bg-rose text-forest hover:bg-rose-deep hover:text-white"
              : "bg-forest text-white hover:bg-sage"
          }`}
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : compact ? (
            <ArrowRight className="h-4 w-4" />
          ) : (
            "Join"
          )}
          {!compact && status === "submitting" ? "Joining" : null}
        </button>
      </div>

      {message ? (
        <p
          className={`pt-2 text-sm ${
            compact
              ? status === "error"
                ? "text-rose"
                : "text-white/80"
              : status === "error"
                ? "text-rose-deep"
                : "text-sage"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
