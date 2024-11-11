import type { HelmetOptions } from "helmet";

type HelmetSecurityPolicy = Exclude<
	HelmetOptions["contentSecurityPolicy"],
	boolean | undefined
>;

export interface ContentSecurityPolicy extends HelmetSecurityPolicy {
	ssl: boolean;
}
