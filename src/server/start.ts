import { getPath } from "src/paths";
import { APP, PORT } from ".";
import TaskManager from "../modules/tasks";
import { executeOperations } from "./boot";
import { getPort } from "./getPort";
import { gracefulShutdown } from "./gracefulShutdown";

export const startServer = (port: number = PORT) => {
	getPort(port).then((newPort) => {
		executeOperations();

		const server = APP.listen(newPort, () => {
			const address = `http://localhost:${newPort} and process ${process.pid}`;
			console.log(`Server is running in ${address}`);
		});

		if (getPath.config.security.gracefulShutdown) {
			gracefulShutdown(server);
		}
	});

	TaskManager();
};
