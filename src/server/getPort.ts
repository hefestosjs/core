import detectPort from "detect-port";
import { MAX_PORT } from ".";

export const getPort = async (port: number) => {
	const checkPort = await detectPort(port);

	if (!getPort) {
		console.log("Error detect port.");
	}

	if (checkPort > MAX_PORT) {
		console.error(`All ports from ${port} to ${MAX_PORT} are in use.`);
		return;
	}

	return checkPort;
};
