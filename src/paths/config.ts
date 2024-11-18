import { existsSync } from "node:fs";
import { join } from "node:path";

const authPath = join(process.cwd(), "app/config/auth.ts");
const logsPath = join(process.cwd(), "app/config/logs.ts");
const mailerPath = join(process.cwd(), "app/config/mailer.ts");
const uploadPath = join(process.cwd(), "app/config/upload.ts");

export const config = {
	performance: require(join(process.cwd(), "app/config/performance")).default,
	cors: require(join(process.cwd(), "app/config/cors")).default,
	security: require(join(process.cwd(), "app/config/security")).default,
	logs: existsSync(logsPath) ? require(logsPath).default : "",
	auth: existsSync(authPath) ? require(authPath).default : "",
	mailer: existsSync(mailerPath) ? require(mailerPath).default : "",
	upload: existsSync(uploadPath) ? require(uploadPath).default : "",
};
