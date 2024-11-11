import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";

import type { GeneratorActionWithFolder } from "src/interfaces";

export const view = ({ folder, name }: GeneratorActionWithFolder) => {
	const folderExists = folder ? `${folder}/` : "";
	const fileName = `${name}.nj`;
	const filePath = folderExists + fileName;
	const templatePath = join(__dirname, "../templates", "view.nj");

	if (!fs.existsSync(templatePath)) {
		console.error(chalk.red(`Template file not found: ${templatePath}`));
		return;
	}

	const templateContent = fs.readFileSync(templatePath, "utf-8");

	const outputs = {
		example: join(getPath.resources.pages, filePath),
	};

	if (folder) {
		fs.mkdirSync(join(getPath.resources.pages, folder), { recursive: true });
	}

	fs.writeFileSync(outputs.example, templateContent);

	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn(`app/resources/pages/${filePath}`)}.`;

	return console.log(message);
};
