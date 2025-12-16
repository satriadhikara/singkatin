import { TraversalError, type } from "arktype";

type Env = {
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  CLIENT_URLS: string[];
  NODE_ENV: "development" | "production" | "test";
};

const envSchema = type({
  DATABASE_URL: "string",
  GOOGLE_CLIENT_ID: "string",
  GOOGLE_CLIENT_SECRET: "string",
  CLIENT_URLS: "string",
  NODE_ENV: "'development' | 'production' | 'test'",
});

const rawEnv = {
  DATABASE_URL: Bun.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: Bun.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: Bun.env.GOOGLE_CLIENT_SECRET,
  CLIENT_URLS: Bun.env.CLIENT_URLS,
  NODE_ENV: Bun.env.NODE_ENV,
};

export const env: Readonly<Env> = (() => {
  try {
    const parsed = envSchema.assert(rawEnv);

    const clientUrls = parsed.CLIENT_URLS.split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    if (clientUrls.length === 0) {
      throw new Error("CLIENT_URLS must contain at least one URL");
    }

    return Object.freeze({
      ...parsed,
      CLIENT_URLS: clientUrls,
    } satisfies Env);
  } catch (error) {
    console.error("❌ Invalid environment configuration:");

    if (error instanceof TraversalError) {
      const problemsByPath = error.arkErrors.flatProblemsByPath;

      for (const [path, problems] of Object.entries(problemsByPath)) {
        for (const problem of problems) {
          console.error(`  • ${path || "(root)"}: ${problem}`);
        }
      }
    } else if (error && typeof error === "object" && "problems" in error) {
      for (const problem of (
        error as { problems: Array<{ path?: string[]; message: string }> }
      ).problems) {
        const path = problem.path?.length ? problem.path.join(".") : "(root)";
        console.error(`  • ${path}: ${problem.message}`);
      }
    } else {
      console.error(error);
    }

    process.exit(1);
  }
})();
