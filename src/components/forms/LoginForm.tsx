"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { appConfig } from "@/constants";

export default function LoginForm() {
  const [showMessage, setShowMessage] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowMessage(true);
  }

  return (
    <div className="w-full rounded-3xl border border-border bg-card/95 p-6 shadow-lg shadow-black/5 backdrop-blur sm:p-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold text-card-foreground">
          Sign in to continue your contract reviews.
        </h1>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Access saved analyses, review flagged terms, and continue comparing
          German telecom offers from your dashboard.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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

        <label className="block space-y-2 text-sm font-medium text-card-foreground">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
            required
          />
        </label>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-3 text-muted-foreground">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-border accent-[var(--primary)]"
            />
            <span>Keep me signed in</span>
          </label>

          <button
            type="button"
            className="font-medium text-primary underline underline-offset-4"
          >
            Forgot password?
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/70 p-4 text-sm text-secondary-foreground">
          <p className="font-medium">Next backend step</p>
          <p className="mt-1 leading-6 text-muted-foreground">
            This screen is ready to connect to the NextAuth credentials sign-in
            flow.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          Sign in
        </button>

        {showMessage ? (
          <div className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-foreground">
            Login UI is in place. Connect this form to the NextAuth credentials
            sign-in action next.
          </div>
        ) : null}

        <p className="text-center text-sm text-muted-foreground">
          Need an account?{" "}
          <Link
            href={appConfig.routes.register}
            className="font-medium text-primary underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
