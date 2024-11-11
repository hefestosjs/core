import cluster from "node:cluster";
import os from "node:os";
import { APP } from ".";
import { gracefulShutdown } from "./gracefulShutdown";

export const runPrimaryProcess = () => {
	const processesCount = os.cpus().length;
	console.log(`Primary process ${process.pid} is running`);
	console.log(`Forking Server with ${processesCount} processes \n`);

	for (let i = 0; i < processesCount; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			const processClosed = worker.process.pid;

			console.log(`Worker ${processClosed} died... scheduling another one!`);
			cluster.fork();
		}
	});
};

export const runWorkerProcess = (port: number) => {
	const processId = process.pid;

	const server = APP.listen(port, () => {
		const address = `http://localhost:${port}`;
		console.log(`Server running in ${address} and process ${processId}`);
	});

	gracefulShutdown(server);
};
