import { getServerSession, type Session } from "next-auth";

import { authConfig } from "@/lib/auth/config";

export function getAuthSession(): Promise<Session | null> {
  return getServerSession(authConfig);
}
