import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";
import { pascalCase } from "src/utils/pascalCase";

import type { GeneratorActionWithoutFolder } from "src/interfaces";

export const task = ({ engine, name }: GeneratorActionWithoutFolder) => {
	const fileName = `${pascalCase(name)}.ts`;
	const templates = {
		example: engine.render("task.nj", { name }),
	};

	const outputs = {
		example: join(getPath.app.tasks, fileName),
	};

	// Create files
	fs.writeFileSync(outputs.example, templates.example);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn(`app/tasks/${fileName}`)}.`;

	return console.log(message);
};
