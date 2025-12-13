import { treaty } from "@elysiajs/eden";
import type { App } from "@singkatin/api/src/index";

export const api = treaty<App>("localhost:3000");
