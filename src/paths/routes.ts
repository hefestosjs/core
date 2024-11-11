import { join } from "node:path";

export const routes = () => {
	const routesPath = join(process.cwd(), "app/routes");

	return require(routesPath).default;
};
