import { app } from "./app";
import { config } from "./config";
import { controllers } from "./controllers";
import { resources } from "./resources";
import { routes } from "./routes";
import { tasks } from "./tasks";
import { tests } from "./tests";

export const getPath = {
	controllers,
	routes,
	tasks,
	config,
	resources,
	app,
	tests,
};
