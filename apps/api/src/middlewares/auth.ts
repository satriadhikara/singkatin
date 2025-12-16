import { Elysia } from "elysia";
import { auth } from "@/utils/auth";

// Better Auth middleware that provides user and session via macro
// Mounts the auth handler and provides `auth: true` macro for protected routes
export const authMiddleware = new Elysia({ name: "better-auth" }).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return status(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});
