import AppError from "./errors/AppError";
import { Router } from "./router";
import { APP } from "./server";
import { startServer } from "./server/start";

import {
	Factory,
	File,
	Forge,
	Supertest,
	createSchedule,
	redisClient,
} from "./modules";
import type { ScheduledTask } from "./modules";
import { useCache, useExclude, usePaginate, useRequest } from "./utils";

import type { CorsOptions } from "cors";
import type { ContentSecurityPolicy, PerformanceInterface } from "./interfaces";
import type {
	NextInterface,
	RequestInterface,
	ResponseInterface,
} from "./interfaces/router";

// Server Functions
export { startServer, Router, APP };

// Core Modules
export {
	redisClient,
	AppError,
	Factory,
	File,
	Supertest,
	createSchedule,
	Forge,
};

// Utils
export { useRequest, useCache, usePaginate, useExclude };

// Interfaces
export type {
	CorsOptions,
	PerformanceInterface,
	ContentSecurityPolicy,
	ScheduledTask,
};

// Server Interfaces
export type {
	RequestInterface as Request,
	ResponseInterface as Response,
	NextInterface as Next,
};
