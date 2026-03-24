import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { appConfig } from "@/constants";

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(100,116,139,0.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(30,41,59,0.6),transparent_30%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-xl space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Sign in
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Return to your telecom contract workspace.
            </h2>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Review saved analyses, continue checking new offers, and keep your
              decisions grounded in clear contract terms.{" "}
              {appConfig.legalDisclaimer}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="rounded-2xl border border-border/70 bg-card/80 py-0">
                <CardContent className="space-y-2 p-4">
                  <CardTitle className="text-sm">Continue</CardTitle>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Pick up where you left off with saved contract reviews.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border border-border/70 bg-card/80 py-0">
                <CardContent className="space-y-2 p-4">
                  <CardTitle className="text-sm">Compare</CardTitle>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Revisit pricing changes, device costs, and contract
                    duration.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border border-border/70 bg-card/80 py-0">
                <CardContent className="space-y-2 p-4">
                  <CardTitle className="text-sm">Decide</CardTitle>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Return to a clear recommendation before you sign.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
