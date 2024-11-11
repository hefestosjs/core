import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import pluralize from "pluralize";
import { getPath } from "src/paths";
import { pascalCase } from "src/utils/pascalCase";

import type { GeneratorActionWithoutFolder } from "src/interfaces";

export const set = ({ engine, name }: GeneratorActionWithoutFolder) => {
	const folderName = `${pascalCase(pluralize.singular(name))}`;
	const templates = {
		index: engine.render("validations/index.nj", { setName: folderName }),
		create: engine.render("validations/create.nj", { setName: folderName }),
		update: engine.render("validations/update.nj", { setName: folderName }),
	};

	const outputs = {
		index: join(getPath.app.validations, folderName, "index.ts"),
		create: join(getPath.app.validations, folderName, "Create.ts"),
		update: join(getPath.app.validations, folderName, "Update.ts"),
	};

	// Create directory
	fs.mkdirSync(join(getPath.app.validations, folderName), { recursive: true });

	// Create files
	fs.writeFileSync(outputs.index, templates.index);
	fs.writeFileSync(outputs.create, templates.create);
	fs.writeFileSync(outputs.update, templates.update);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The files has been generated at ${warn(`app/validations/${folderName}`)}.`;

	return console.log(message);
};
