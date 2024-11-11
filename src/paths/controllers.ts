import { join } from "node:path";
import type { Controller } from "../interfaces/router";

export const controllers = (controllerName: string) => {
	const controllerPath = join(process.cwd(), "app/controllers");
	const controllerFile = `${controllerPath}/${controllerName}`;
	const controller: Controller = require(controllerFile).default;

	return controller;
};
