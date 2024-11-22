import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";

export const pages = async () => {
	const templatesPath = {
		home: join(__dirname, "../templates/pages", "home.nj"),
		layout: join(__dirname, "../templates/pages", "layout.nj"),
		notFound: join(__dirname, "../templates/pages", "404.nj"),
	};

	const templatesContent = {
		home: fs.readFileSync(templatesPath.home, "utf-8"),
		layout: fs.readFileSync(templatesPath.layout, "utf-8"),
		notFound: fs.readFileSync(templatesPath.notFound, "utf-8"),
	};

	const outputs = {
		home: join(getPath.resources.pages, "home.nj"),
		layout: join(getPath.resources.default, "default.nj"),
		notFound: join(getPath.resources.pages, "404.nj"),
	};

	// Create directory if does not exists
	fs.mkdirSync(join(process.cwd(), "app/resources/pages"), { recursive: true });

	// Create files
	fs.writeFileSync(outputs.home, templatesContent.home);
	fs.writeFileSync(outputs.layout, templatesContent.layout);
	fs.writeFileSync(outputs.notFound, templatesContent.notFound);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn("app/resources/pages")}.`;

	return console.log(message);
};
