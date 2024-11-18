import type { SessionOptions } from "../express-session";

interface SessionStrategy extends SessionOptions {
	useRedis: boolean;
	prefix: string;
	secret: string;
}

interface TokenStrategy {
	useRedis: boolean;
	secret: string;
	expiresIn: string;
}

export interface AuthConfig {
	option: "session" | "token";
	table: string;
	uniqueColumn: string;
	strategy: {
		token: TokenStrategy;
		session: SessionStrategy;
	};
}
