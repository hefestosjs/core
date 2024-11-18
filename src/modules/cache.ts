import { getPath } from "src/paths";
import { redisClient } from "./redis";

const performance = getPath.config.performance;

export default function Cache() {
	if (performance.cache.active) {
		redisClient.on("error", (error) => console.log(`Redis Error: ${error}`));
	}
}
