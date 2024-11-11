import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import pluralize from "pluralize";
import { getPath } from "src/paths";
import { pascalCase } from "src/utils/pascalCase";

import type { GeneratorActionWithoutFolder } from "src/interfaces";

export const single = ({ engine, name }: GeneratorActionWithoutFolder) => {
	const fileName = `${pascalCase(pluralize.singular(name))}Service.ts`;
	const templates = {
		example: engine.render("services/single.nj", { name }),
	};

	const outputs = {
		example: join(getPath.app.services, fileName),
	};

	// Create files
	fs.writeFileSync(outputs.example, templates.example);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn(`app/services/${fileName}`)}.`;

	return console.log(message);
};
