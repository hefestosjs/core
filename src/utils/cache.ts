import type { SetOptions } from "redis";
import type { PerformanceInterface } from "../interfaces";
import { redisClient } from "../modules/redis";
import { getPath } from "../paths";

const performance: PerformanceInterface = getPath.config.performance;

export const useCache = {
	get: async (key: string) => {
		if (!redisClient.isOpen) {
			throw new Error("Redis is closed");
		}

		const cachedItems = await redisClient.get(key);
		if (!cachedItems) return false;

		return cachedItems;
	},

	set: async (key: string, payload: string) => {
		if (!redisClient.isOpen) {
			throw new Error("Redis is closed");
		}

		const options: SetOptions = { EX: performance.cache.lifeTime };
		await redisClient.set(key, payload, options);
	},

	// list all: async ()
};
