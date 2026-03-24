"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants";

export default function AuthSignOutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => signOut({ callbackUrl: appConfig.routes.login })}
    >
      Sign out
      <LogOut className="size-4" />
    </Button>
  );
}
