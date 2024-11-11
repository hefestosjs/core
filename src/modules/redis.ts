import { createClient } from "redis";
import type { PerformanceInterface } from "../interfaces";
import { getPath } from "../paths";

export const redisClient = createClient();

const performance: PerformanceInterface = getPath.config.performance;

if (performance.redis && !redisClient.isOpen) {
	redisClient.connect().then(
		() => {
			console.log("Connected to Redis");
			redisClient.flushAll().then(() => console.log("Redis cache clean"));
		},
		(error) => console.log(error),
	);

	process.on("exit", async () => {
		if (redisClient.isOpen) {
			await redisClient.disconnect();
		}
	});
}
