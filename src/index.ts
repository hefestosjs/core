import AppError from "./errors/AppError";
import {
	Factory,
	File,
	Supertest,
	createSchedule,
	middlewares,
	redisClient,
	renderHtml,
} from "./modules";
import type { MiddlewareType, ScheduledTask } from "./modules";

import { getPath } from "./paths";
import { Router } from "./router";
import { APP } from "./server";
import { startServer } from "./server/start";
import { useCache, useExclude, usePaginate } from "./utils";

import type { CorsOptions } from "cors";
import type {
	AuthConfig,
	ContentSecurityPolicy,
	LoggerInterface,
	PerformanceInterface,
	SessionTypes,
} from "./interfaces";
import type {
	NextInterface,
	RequestInterface,
	ResponseInterface,
} from "./interfaces/router";

import {
	type OperationsType,
	bootOperations,
	executeOperations,
} from "./server/boot";

// Server Functions
export { startServer, Router, APP, middlewares };

// Core Modules
export {
	redisClient,
	AppError,
	Factory,
	File,
	Supertest,
	createSchedule,
	bootOperations,
	executeOperations,
};

// Utils
export { useCache, usePaginate, useExclude, getPath, renderHtml };

// Interfaces
export type {
	CorsOptions,
	PerformanceInterface,
	ContentSecurityPolicy,
	ScheduledTask,
	AuthConfig,
	LoggerInterface,
	SessionTypes,
	MiddlewareType,
};

// Server Interfaces
export type {
	RequestInterface as Request,
	ResponseInterface as Response,
	NextInterface as Next,
	OperationsType,
};
