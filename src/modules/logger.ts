import fs from "node:fs";
import { join } from "node:path";
import type { Express } from "express";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import { getPath } from "src/paths";

export default function Logger(APP: Express) {
	const LogsConfig = getPath.config.logs;

	if (LogsConfig.active) {
		const datetime = new Date();
		const logName = datetime.toISOString().slice(0, 10);
		const logPath = join(process.cwd(), `logs/${logName}.log`);
		const logsFormat = LogsConfig.customFormat || LogsConfig.format;

		fs.mkdirSync(join(process.cwd(), "logs"), { recursive: true });

		if (LogsConfig.rotate.active) {
			const rotateStream = rfs.createStream(
				`${logName}.log`,
				LogsConfig.rotate.options,
			);

			APP.use(morgan(logsFormat, { stream: rotateStream }));
		} else {
			const logStream = fs.createWriteStream(logPath, { flags: "a" });

			APP.use(
				morgan(logsFormat, {
					stream: logStream,
					skip: LogsConfig.skip,
					immediate: LogsConfig.immediate,
				}),
			);
		}
	}
}
