import { logger } from "@bogeychan/elysia-logger";
import { env } from "@/utils/env";

export const loggerMiddleware = logger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
});
