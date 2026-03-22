import RegisterForm from "@/components/forms/RegisterForm";
import { appConfig } from "@/constants";

export default function RegisterPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(100,116,139,0.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(30,41,59,0.6),transparent_30%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Register
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Keep every telecom offer in one clear decision workspace.
            </h2>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              Save uploaded contracts, revisit flagged risks, and compare the
              real cost of offers before signing. {appConfig.legalDisclaimer}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <p className="text-sm font-medium text-card-foreground">
                  Upload
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Paste text, submit a URL, or upload a PDF offer.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <p className="text-sm font-medium text-card-foreground">
                  Review
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Get simplified terms, risk flags, and a clear recommendation.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 p-4">
                <p className="text-sm font-medium text-card-foreground">
                  Track
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep contract analyses available in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
