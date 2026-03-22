"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { appConfig } from "@/constants";

export default function RegisterForm() {
  const [showMessage, setShowMessage] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowMessage(true);
  }

  return (
    <div className="w-full rounded-3xl border border-border bg-card/95 p-6 shadow-lg shadow-black/5 backdrop-blur sm:p-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Create account
        </p>
        <h1 className="text-3xl font-semibold text-card-foreground">
          Start reviewing contracts with clarity.
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Build your account to save analyses, revisit results, and compare
          German telecom offers in one place.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-card-foreground">
            First name
            <input
              type="text"
              name="firstName"
              placeholder="Max"
              autoComplete="given-name"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-card-foreground">
            Last name
            <input
              type="text"
              name="lastName"
              placeholder="Mustermann"
              autoComplete="family-name"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
              required
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-medium text-card-foreground">
          Email address
          <input
            type="email"
            name="email"
            placeholder="name@example.de"
            autoComplete="email"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
            required
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-card-foreground">
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-card-foreground">
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              autoComplete="new-password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
              required
            />
          </label>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/70 p-4 text-sm text-secondary-foreground">
          <p className="font-medium">What happens next</p>
          <p className="mt-1 leading-6 text-muted-foreground">
            This frontend screen is ready for the registration API. The next
            step is wiring the form to the credentials signup endpoint.
          </p>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="terms"
            className="mt-1 h-4 w-4 rounded border-border accent-[var(--primary)]"
            required
          />
          <span>
            I understand that {appConfig.name} is a decision-support tool and
            not legal advice.
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          Create account
        </button>

        {showMessage ? (
          <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-foreground">
            Registration UI is in place. Connect this form to
            <span className="font-medium"> /api/auth/register</span> next.
          </div>
        ) : null}

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={appConfig.routes.login}
            className="font-medium text-primary underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
