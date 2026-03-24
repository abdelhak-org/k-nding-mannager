import { withAuth } from "next-auth/middleware";

import { appConfig } from "@/constants";

export default withAuth({
  pages: {
    signIn: appConfig.routes.login,
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
