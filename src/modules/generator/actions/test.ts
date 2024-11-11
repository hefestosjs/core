import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";

import type { GeneratorActionWithFolder } from "src/interfaces";

export const test = ({ engine, folder, name }: GeneratorActionWithFolder) => {
	const folderExists = folder ? `${folder}/` : "";
	const fileName = `${name}.test.ts`;
	const filePath = folderExists + fileName;
	const templates = {
		example: engine.render("test.nj", { name }),
	};

	const outputs = {
		example: join(getPath.tests, filePath),
	};

	// Create directory
	if (folder) {
		fs.mkdirSync(join(getPath.tests, folder), { recursive: true });
	}

	// Create files
	fs.writeFileSync(outputs.example, templates.example);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn(`tests/${filePath}`)}.`;

	return console.log(message);
};
