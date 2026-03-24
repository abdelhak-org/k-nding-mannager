import Link from "next/link";

import AuthSignOutButton from "@/components/AuthSignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import { appConfig } from "@/constants";
import { getAuthSession } from "@/lib/auth/session";

const navButtonClassName =
  "inline-flex h-8 items-center justify-center rounded-lg border border-transparent px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const primaryNavButtonClassName =
  "inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all outline-none hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default async function Navbar() {
  const session = await getAuthSession();
  const isAuthenticated = Boolean(session?.user);

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={appConfig.routes.home}
            className="text-lg font-semibold text-foreground transition-opacity hover:opacity-80"
          >
            {appConfig.name}
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground sm:block">
                  {session?.user?.name ?? session?.user?.email}
                </div>
                <Link
                  href={appConfig.routes.dashboard}
                  className={navButtonClassName}
                >
                  Dashboard
                </Link>
                <AuthSignOutButton />
              </>
            ) : (
              <>
                <Link
                  href={appConfig.routes.login}
                  className={navButtonClassName}
                >
                  Login
                </Link>
                <Link
                  href={appConfig.routes.register}
                  className={primaryNavButtonClassName}
                >
                  Register
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
