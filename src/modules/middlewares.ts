import { APP } from "src/server";
import type { Next, Request, Response } from "../";

export type MiddlewareType = {
	function: (request: Request, response: Response, next: Next) => any;
	path?: string;
};

export const middlewares: MiddlewareType[] = [];

export function registerMiddlewares() {
	for (const execute of middlewares) {
		if (execute.path) {
			APP.use(execute.path, execute.function);
		} else {
			APP.use(execute.function);
		}
	}
}
