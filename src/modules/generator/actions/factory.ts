import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";
import { pascalCase } from "src/utils/pascalCase";

import type { GeneratorActionWithoutFolder } from "src/interfaces";

export const factory = ({ engine, name }: GeneratorActionWithoutFolder) => {
	const fileName = `${pascalCase(name)}.ts`;
	const templates = {
		example: engine.render("factory.nj", { name }),
	};

	const outputs = {
		example: join(getPath.app.database, "factories", fileName),
	};

	// Create files
	fs.writeFileSync(outputs.example, templates.example);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn(`app/database/factories/${fileName}`)}.`;

	return console.log(message);
};
