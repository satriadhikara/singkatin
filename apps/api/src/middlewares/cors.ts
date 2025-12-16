import { cors } from "@elysiajs/cors";

import { env } from "@/utils/env";

export const corsMiddleware = cors({
  origin: env.CLIENT_URLS,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});
