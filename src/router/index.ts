import { Router as ExpressRouter, type RequestHandler } from "express";
import type {
	Controller,
	ResourceRoutes,
	RouterInterface,
} from "../interfaces/router";
import { getPath } from "../paths";
import { formatRoutePath } from "../utils/formatRoutePath";
import { getMiddlewares } from "./getMiddlewares";

export function Router(): RouterInterface {
	const router = ExpressRouter() as RouterInterface;

	router.resources = (path, controllerName, middlewares = []) => {
		const routePath = formatRoutePath(path);
		const controller = getPath.controllers(controllerName);

		const routes: ResourceRoutes[] = [
			{ method: "get", path: routePath, action: "index" },
			{ method: "get", path: `${routePath}/in/:id`, action: "show" },
			{ method: "get", path: `${routePath}/create`, action: "create" },
			{ method: "post", path: routePath, action: "store" },
			{ method: "get", path: `${routePath}/edit/:id`, action: "edit" },
			{ method: "put", path: `${routePath}/:id`, action: "update" },
			{ method: "delete", path: `${routePath}/:id`, action: "destroy" },
		];

		for (const { method, path, action } of routes) {
			if (controller[action as keyof Controller]) {
				router[method](
					path,
					...getMiddlewares({ method: action, middlewares }),
					controller[action] as RequestHandler,
				);
			}
		}

		return router;
	};

	return router;
}
