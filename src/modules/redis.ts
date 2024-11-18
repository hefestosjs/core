import { createClient } from "redis";
import type { PerformanceInterface } from "../interfaces";
import { getPath } from "../paths";

export const redisClient = createClient();

const performance: PerformanceInterface = getPath.config.performance;

if (performance.redis && !redisClient.isOpen) {
	redisClient.connect().then(
		() => {
			console.log("Connected to Redis");
		},
		(error) => {
			console.log(error);
			redisClient.flushAll().then(() => console.log("Redis cache clean"));
		},
	);

	process.on("exit", async () => {
		if (redisClient.isOpen) {
			await redisClient.disconnect();
		}
	});
}
