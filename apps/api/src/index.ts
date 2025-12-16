import { Elysia } from "elysia";
import { loggerMiddleware } from "@/middlewares/logger";
import { corsMiddleware } from "@/middlewares/cors";
import { authMiddleware } from "@/middlewares/auth";
import { authModule } from "@/modules/auth";

const app = new Elysia({
  prefix: "/api",
})
  // Middlewares
  .use(loggerMiddleware)
  .use(corsMiddleware)
  .use(authMiddleware)

  // Modules
  .use(authModule)

  .get("/health", () => ({ status: "ok", timestamp: Date.now() }))
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
