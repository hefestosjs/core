import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";

import type nunjucks from "nunjucks";

export const mailer = async (engine: nunjucks.Environment) => {
	const templates = {
		config: engine.render("mailer/config/mailer.nj"),
		module: {
			index: engine.render("mailer/module/index.nj"),
			interfaces: engine.render("mailer/module/interfaces.nj"),
		},
	};

	const outputs = {
		config: join(getPath.app.config, "mailer.ts"),
		module: {
			index: join(process.cwd(), "modules/mailer/index.ts"),
			interfaces: join(process.cwd(), "modules/mailer/interfaces.ts"),
		},
	};

	// Create directory if does not exists
	fs.mkdirSync(join(process.cwd(), "modules/mailer/"), { recursive: true });

	// Create files
	fs.writeFileSync(outputs.config, templates.config);
	fs.writeFileSync(outputs.module.index, templates.module.index);
	fs.writeFileSync(outputs.module.interfaces, templates.module.interfaces);

	// Install dependencies
	await Promise.all([
		Bun.$`bun add nodemailer`,
		Bun.$`bun add -D @types/nodemailer`,
	]);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn("app/config/mailer.ts")} and ${warn("modules/mailer")}.`;

	return console.log(message);
};
