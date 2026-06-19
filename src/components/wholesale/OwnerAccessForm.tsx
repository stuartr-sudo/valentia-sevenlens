"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

export function OwnerAccessForm({ username }: { username: string }) {
  const router = useRouter();
  const [message, setMessage] = useState(
    "Use the owner access code issued for this account.",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: String(formData.get("username") || ""),
      accessCode: String(formData.get("accessCode") || ""),
    };

    setIsSubmitting(true);
    setMessage("Checking owner access.");

    try {
      const response = await fetch("/api/wholesale/access", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(body.message || "Unable to unlock owner access.");
      }

      setMessage("Owner access unlocked.");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to unlock owner access.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
      <label className="grid gap-2 text-sm text-forest/70">
        Username
        <input
          className="min-h-12 rounded border border-line bg-cream px-4 outline-none"
          name="username"
          required
          autoComplete="username"
          defaultValue={username}
        />
      </label>
      <label className="grid gap-2 text-sm text-forest/70">
        Owner access code
        <input
          className="min-h-12 rounded border border-line bg-cream px-4 font-mono tracking-[0.08em] outline-none"
          name="accessCode"
          required
          autoComplete="one-time-code"
          placeholder="VAL-OWNER-XXXX-XXXX-XXXX"
        />
      </label>
      <button
        className="min-h-12 w-full rounded bg-forest px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Checking" : "Unlock owner portal"}
      </button>
      <p className="text-sm leading-6 text-forest/65" role="status">
        {message}
      </p>
    </form>
  );
}
