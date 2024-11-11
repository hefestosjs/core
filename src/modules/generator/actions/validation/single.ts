import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";
import { pascalCase } from "src/utils/pascalCase";

import type { GeneratorActionWithFolder } from "src/interfaces";

export const single = ({ engine, folder, name }: GeneratorActionWithFolder) => {
	const folderName = `${pascalCase(folder)}`;
	const fileName = `${pascalCase(name)}.ts`;
	const templates = {
		example: engine.render("validations/example.nj", { name }),
	};

	const outputs = {
		example: join(getPath.app.validations, folderName, fileName),
	};

	// Create directory
	fs.mkdirSync(join(getPath.app.validations, folderName), {
		recursive: true,
	});

	// Create files
	fs.writeFileSync(outputs.example, templates.example);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn(`app/validations/${folderName}/${fileName}`)}.`;

	return console.log(message);
};
