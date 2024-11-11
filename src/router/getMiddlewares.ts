import type { RequestHandler } from "express";
import type { GetMiddlewares } from "../interfaces/router";
import type { MiddlewareForMethod } from "../interfaces/router";

export const getMiddlewares = ({ method, middlewares }: GetMiddlewares) => {
	const commonMiddlewares = middlewares.filter(
		(mw): mw is RequestHandler => typeof mw === "function",
	);

	const specificMiddlewares = middlewares
		.filter(
			(mw): mw is MiddlewareForMethod =>
				typeof mw === "object" && "method" in mw && mw.method === method,
		)
		.flatMap((mw) => mw.middleware);

	return [...commonMiddlewares, ...specificMiddlewares];
};
