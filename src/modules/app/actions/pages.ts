import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";

export const pages = async () => {
	const templatesPath = {
		home: join(__dirname, "../templates/pages", "home.nj"),
		layout: join(__dirname, "../templates/pages", "layout.nj"),
		notFound: join(__dirname, "../templates/pages", "404.nj"),
		tailwindConfig: join(__dirname, "../templates/pages", "tailwind.config.nj"),
		tailwindCss: join(__dirname, "../templates/pages", "tailwind.css.nj"),
	};

	const templatesContent = {
		home: fs.readFileSync(templatesPath.home, "utf-8"),
		layout: fs.readFileSync(templatesPath.layout, "utf-8"),
		notFound: fs.readFileSync(templatesPath.notFound, "utf-8"),
		tailwindConfig: fs.readFileSync(templatesPath.tailwindConfig, "utf-8"),
		tailwindCss: fs.readFileSync(templatesPath.tailwindCss, "utf-8"),
	};

	const outputs = {
		home: join(getPath.resources.pages, "home.nj"),
		layout: join(getPath.resources.default, "default.nj"),
		notFound: join(getPath.resources.pages, "404.nj"),
		tailwindConfig: join(process.cwd(), "tailwind.config.js"),
		tailwindCss: join(process.cwd(), "public/css/tailwind.css"),
	};

	// Create directory if does not exists
	fs.mkdirSync(join(process.cwd(), "app/resources/pages"), { recursive: true });
	fs.mkdirSync(join(process.cwd(), "public/css"), { recursive: true });

	// Install dependencies
	await Promise.all([
		Bun.$`bun add autoprefixer`,
		Bun.$`bun add -D tailwindcss`,
	]);

	// Create files
	fs.writeFileSync(outputs.home, templatesContent.home);
	fs.writeFileSync(outputs.layout, templatesContent.layout);
	fs.writeFileSync(outputs.notFound, templatesContent.notFound);
	fs.writeFileSync(outputs.tailwindConfig, templatesContent.tailwindConfig);
	fs.writeFileSync(outputs.tailwindCss, templatesContent.tailwindCss);

	// Add a new script in package.json
	const packageJsonPath = join(process.cwd(), "package.json");
	const packageJsonFile = fs.readFileSync(packageJsonPath, "utf8");
	const packageJson = JSON.parse(packageJsonFile);

	if (!packageJson.scripts) packageJson.scripts = {};
	packageJson.scripts.mw = "bun start/run.ts mw";

	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn("app/resources/pages")}.`;

	return console.log(message);
};
