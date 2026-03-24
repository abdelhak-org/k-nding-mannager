import { redirect } from "next/navigation";
import { ArrowRight, FileSearch, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants";
import { getAuthSession } from "@/lib/auth/session";

const placeholderCards = [
  {
    title: "Contract reviews",
    description:
      "Upload and inspect mobile contract PDFs with highlighted risk areas.",
    value: "0 active",
    icon: FileSearch,
  },
  {
    title: "Risk checks",
    description:
      "Track cancellation windows, hidden fees, and renewal clauses in one place.",
    value: "3 templates",
    icon: ShieldCheck,
  },
  {
    title: "Smart summaries",
    description:
      "Save side-by-side offer comparisons and generate quick decision notes.",
    value: "Ready soon",
    icon: Sparkles,
  },
] as const;

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(appConfig.routes.login);
  }

  const displayName =
    session.user.name?.trim() || session.user.email || "there";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <Card className="rounded-3xl border border-border/70 bg-card/95 py-0 shadow-lg shadow-black/5">
          <CardHeader className="gap-3 px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Dashboard
            </p>
            <CardTitle className="text-3xl sm:text-4xl">
              Welcome back, {displayName}.
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6 sm:text-base">
              Your workspace is ready. Use this area to review telecom
              contracts, monitor key clauses, and keep your next comparison
              organized.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-secondary px-3 py-1">
                Signed in as {session.user.email}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1">
                Role: {session.user.role}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">Start a new review</Button>
              <Button variant="outline" size="lg">
                View saved contracts
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 via-background to-secondary/60 py-0 shadow-lg shadow-black/5">
          <CardHeader className="px-6 py-6 sm:px-8 sm:py-8">
            <CardTitle className="text-xl">Next step</CardTitle>
            <CardDescription className="text-sm leading-6">
              This is a simple starter dashboard. The next iteration can connect
              real contract uploads, review history, and comparison workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-muted-foreground">
              Placeholder modules are included below so the page feels like a
              real dashboard while backend features are still being built.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {placeholderCards.map(({ title, description, value, icon: Icon }) => (
          <Card
            key={title}
            className="rounded-3xl border border-border/70 bg-card/95 py-0 shadow-md shadow-black/5"
          >
            <CardHeader className="gap-3 px-6 py-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="leading-6">
                  {description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-foreground">
                {value}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
