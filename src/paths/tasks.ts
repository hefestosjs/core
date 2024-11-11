import { join } from "node:path";

export const tasks = () => {
	const path = join(process.cwd(), "app/tasks");

	return require(path).default;
};
