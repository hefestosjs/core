import { join } from "node:path";

export const resources = {
	default: join(process.cwd(), "app/resources"),
	pages: join(process.cwd(), "app/resources/pages"),
};
