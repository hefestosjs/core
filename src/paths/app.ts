import { join } from "node:path";

export const app = {
	config: join(process.cwd(), "app/config"),
	controllers: join(process.cwd(), "app/controllers"),
	database: join(process.cwd(), "app/database"),
	middlewares: join(process.cwd(), "app/middlewares"),
	routes: join(process.cwd(), "app/routes"),
	services: join(process.cwd(), "app/services"),
	tasks: join(process.cwd(), "app/tasks"),
	validations: join(process.cwd(), "app/validations"),
};
