import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import pluralize from "pluralize";
import { getPath } from "src/paths";
import { pascalCase } from "src/utils/pascalCase";

import type { GeneratorActionWithoutFolder } from "src/interfaces";

export const multiple = ({ engine, name }: GeneratorActionWithoutFolder) => {
	const folderName = `${pascalCase(pluralize.singular(name))}`;
	const templates = {
		index: engine.render("services/index.nj", { name }),
		list: engine.render("services/List.nj", { name }),
		show: engine.render("services/Show.nj", { name }),
		create: engine.render("services/Create.nj", { name }),
		update: engine.render("services/Update.nj", { name }),
		delete: engine.render("services/Delete.nj", { name }),
	};

	const outputs = {
		index: join(getPath.app.services, folderName, "index.ts"),
		list: join(getPath.app.services, folderName, "List.ts"),
		show: join(getPath.app.services, folderName, "Show.ts"),
		create: join(getPath.app.services, folderName, "Create.ts"),
		update: join(getPath.app.services, folderName, "Update.ts"),
		delete: join(getPath.app.services, folderName, "Delete.ts"),
	};

	// Create directory
	fs.mkdirSync(join(getPath.app.services, folderName), { recursive: true });

	// Create files
	fs.writeFileSync(outputs.index, templates.index);
	fs.writeFileSync(outputs.list, templates.list);
	fs.writeFileSync(outputs.show, templates.show);
	fs.writeFileSync(outputs.create, templates.create);
	fs.writeFileSync(outputs.update, templates.update);
	fs.writeFileSync(outputs.delete, templates.delete);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The files has been generated at ${warn(`app/services/${folderName}`)}.`;

	return console.log(message);
};
