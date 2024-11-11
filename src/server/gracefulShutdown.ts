import type { Server } from "node:http";
import { startServer } from "./start";

export const gracefulShutdown = (server: Server) => {
	const shutdown = (event: string, code: number) => {
		server.close(() => {
			console.log("\nServer is gracefully shutting down...");
			console.log(`${event} received with code: ${code}`);

			if (code !== 0 && code !== 2) {
				console.log("Restarting server...");
				startServer();
			} else {
				process.exit(code);
			}
		});
	};

	process.on("uncaughtException", (error, origin) => {
		console.log(`\n${origin} signal received. \n${error}`);
	});

	process.on("unhandledRejection", (error) => {
		console.log(`\nunhandledRejection signal received. \n${error}`);
	});

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
	process.on("exit", (code) => {
		console.log(`exit signal received with code: ${code}`);
	});
};
