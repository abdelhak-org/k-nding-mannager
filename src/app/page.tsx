import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  FileCheck2,
  FolderKanban,
  ShieldAlert,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants";
import { getAuthSession } from "@/lib/auth/session";

export default async function Home() {
  const session = await getAuthSession();
  const isAuthenticated = Boolean(session?.user);

  const highlights = [
    {
      title: "Contract overview",
      description:
        "Keep cancellation deadlines, tariffs, and provider details visible in one organized place.",
    },
    {
      title: "Risk spotting",
      description:
        "Flag renewal terms, hidden fees, and notice periods before they become expensive mistakes.",
    },
    {
      title: "Team-ready workflow",
      description:
        "Prepare shared reviews and decision notes for contracts that need a second opinion.",
    },
  ] as const;

  const steps = [
    "Create an account and centralize your telecom contracts.",
    "Review key terms and compare them against your internal checklist.",
    "Track decisions and next actions before important deadlines pass.",
  ] as const;

  const overviewStats = [
    {
      label: "Active contracts",
      value: "18",
      detail: "mobile, broadband, and service agreements",
      icon: FolderKanban,
    },
    {
      label: "Reviews completed",
      value: "42",
      detail: "clause checks and approval notes this quarter",
      icon: FileCheck2,
    },
    {
      label: "Upcoming deadlines",
      value: "5",
      detail: "renewals and notice periods that need attention",
      icon: BellRing,
    },
  ] as const;

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-136 bg-linear-to-b from-secondary via-background to-background" />
      <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
              Contract management for telecom and service agreements
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Review contracts faster and keep every important clause under
                control.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {appConfig.name} gives you one clear workspace to organize
                contracts, track obligations, and avoid missing renewal or
                cancellation deadlines.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href={appConfig.routes.dashboard}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
                  >
                    Go to dashboard
                    <ArrowRight className="size-4" />
                  </Link>
                  <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-background/80 px-5 text-sm text-muted-foreground">
                    Signed in as {session?.user?.name ?? session?.user?.email}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href={appConfig.routes.register}
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
                  >
                    Create account
                  </Link>
                  <Link
                    href={appConfig.routes.login}
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-background/80 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-border/70 bg-card/90 px-5 py-4 shadow-sm shadow-black/5">
                <p className="text-2xl font-semibold">24/7</p>
                <p className="text-sm text-muted-foreground">
                  access to your contract workspace
                </p>
              </div>
              <div className="rounded-3xl border border-border/70 bg-card/90 px-5 py-4 shadow-sm shadow-black/5">
                <p className="text-2xl font-semibold">1 place</p>
                <p className="text-sm text-muted-foreground">
                  for active, pending, and expired agreements
                </p>
              </div>
              <div className="rounded-3xl border border-border/70 bg-card/90 px-5 py-4 shadow-sm shadow-black/5">
                <p className="text-2xl font-semibold">Clear</p>
                <p className="text-sm text-muted-foreground">
                  next steps before deadlines become problems
                </p>
              </div>
            </div>
          </div>

          <Card className="rounded-[2rem] border border-border/70 bg-card/95 py-0 shadow-xl shadow-black/5">
            <CardHeader className="gap-3 px-6 py-6 sm:px-8 sm:py-8">
              <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Operations snapshot
              </div>
              <CardTitle className="text-2xl">
                A simple view of contract work that needs action.
              </CardTitle>
              <CardDescription className="text-sm leading-6 sm:text-base">
                Keep status, review progress, and deadline pressure visible
                without hunting through email threads or spreadsheets.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="grid gap-3">
                {overviewStats.map(({ label, value, detail, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-secondary/60 p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-background text-foreground">
                      <Icon className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-foreground/90">
                          {label}
                        </p>
                        <p className="text-2xl font-semibold">{value}</p>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border border-border/70 bg-linear-to-br from-card via-card to-secondary/50 py-0 shadow-lg shadow-black/5">
            <CardHeader className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="inline-flex w-fit items-center rounded-full bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Review board
              </div>
              <CardTitle className="text-2xl">
                One place for review status, approval notes, and risk tracking.
              </CardTitle>
              <CardDescription className="text-sm leading-6 sm:text-base">
                A lightweight contract board helps teams see what is pending,
                what is approved, and what needs escalation.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-border/60 bg-background/85 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Pending review
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-secondary px-3 py-3 text-sm">
                      Vodafone renewal terms
                    </div>
                    <div className="rounded-2xl bg-secondary px-3 py-3 text-sm">
                      Internet service addendum
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border/60 bg-background/85 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    In approval
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-secondary px-3 py-3 text-sm">
                      Business mobile upgrade
                    </div>
                    <div className="rounded-2xl bg-secondary px-3 py-3 text-sm">
                      Termination request draft
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border/60 bg-background/85 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Needs attention
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-destructive/10 px-3 py-3 text-sm text-foreground">
                      <ShieldAlert className="size-4 text-destructive" />
                      Notice period in 6 days
                    </div>
                    <div className="rounded-2xl bg-secondary px-3 py-3 text-sm">
                      Fee increase clause review
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border border-border/70 bg-card/95 py-0 shadow-lg shadow-black/5">
            <CardHeader className="gap-3 px-6 py-6 sm:px-8 sm:py-8">
              <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Workflow
              </div>
              <CardTitle className="text-2xl">
                A simple process for safer contract decisions.
              </CardTitle>
              <CardDescription className="text-sm leading-6 sm:text-base">
                Move from scattered PDFs and inbox threads to one structured
                review flow your team can trust.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-2xl border border-border/60 bg-secondary/60 p-4"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-6 text-foreground/90">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <Card
              key={item.title}
              className="rounded-3xl border border-border/70 bg-card/95 py-0 shadow-md shadow-black/5"
            >
              <CardHeader className="px-6 py-6">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-6">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="rounded-[2rem] border border-border/70 bg-linear-to-r from-card via-card to-secondary/60 p-6 shadow-lg shadow-black/5 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Start building a cleaner contract review process.
              </h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Organize agreements, track obligations, and prepare decisions
                with a clearer view of what each contract actually contains.
              </p>
            </div>
            <Link
              href={
                isAuthenticated
                  ? appConfig.routes.dashboard
                  : appConfig.routes.register
              }
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              {isAuthenticated ? "Open dashboard" : "Get started"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
