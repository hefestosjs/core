import { existsSync } from "node:fs";
import { join } from "node:path";

const authPath = join(process.cwd(), "app/config/auth.ts");

export const config = {
	performance: require(join(process.cwd(), "app/config/performance")).default,
	cors: require(join(process.cwd(), "app/config/cors")).default,
	security: require(join(process.cwd(), "app/config/security")).default,
	auth: existsSync(authPath) ? require(authPath).default : "",
};
