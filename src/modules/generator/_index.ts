import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";
import nunjucks from "nunjucks";
import pluralize from "pluralize";

import {
	Separator,
	checkbox,
	confirm,
	input,
	search,
	select,
} from "@inquirer/prompts";

// Configurar o Nunjucks para procurar templates na pasta "templates"
const templates = path.join(__dirname, "templates");
const outputPath = path.join(__dirname, "output.txt");
const engine = nunjucks.configure(templates, { autoescape: true });

engine.addFilter("pluralize", pluralize);
engine.addFilter("pascalCase", (value: string) => {
	return String(value).charAt(0).toUpperCase() + String(value).slice(1);
});

export async function main() {
	console.log("\x1b[34m%s\x1b[0m", "Bem-vindo ao nosso gerador interativo!\n"); // using ASCI
	console.log("\x1b[36m%s\x1b[0m", "GeeksforGeeks");

	// Coloring using chalk
	const error = chalk.bold.red;
	const warning = chalk.hex("#FFA500"); // Orange color
	console.log(error("Error!"));
	console.log(warning("Warning!"));

	const outputColor = "color:green; font-size:20px;";
	console.log("%c GeeksforGeeks", outputColor);

	// Input
	const name = await input({ message: "Enter your name" });

	// Select
	const packageManager = await select({
		message: "Select a package manager",
		choices: [
			{
				name: "npm 1",
				value: "npm",
				description: "npm is the most popular package manager",
			},
			{
				name: "yarn",
				value: "yarn",
				description: "yarn is an awesome package manager",
			},
			new Separator(),
			{
				name: "jspm",
				value: "jspm",
				disabled: true,
			},
			{
				name: "pnpm",
				value: "pnpm",
				disabled: "(pnpm is not available)",
			},
		],
	});

	// Checkbox
	const newPackageManager = await checkbox({
		message: "Select a package manager",
		choices: [
			{ name: "npm", value: "npm" },
			{ name: "yarn", value: "yarn" },
			new Separator(),
			{ name: "pnpm", value: "pnpm", disabled: true },
			{
				name: "pnpm",
				value: "pnpm",
				disabled: "(pnpm is not available)",
			},
		],
	});

	console.log(newPackageManager);

	// Confirm
	const confirmation = await confirm({ message: "Continue?" });

	// Search
	const searchPackage = await search({
		message: "Select an npm package",
		source: async (input, { signal }) => {
			if (!input) {
				return [];
			}

			const response = await fetch(
				`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(input)}&size=20`,
				{ signal },
			);
			const data = await response.json();

			return data.objects.map(
				(pkg: { package: { name: any; description: any } }) => ({
					name: pkg.package.name,
					value: pkg.package.name,
					description: pkg.package.description,
				}),
			);
		},
	});

	// Renderizar o template com os dados do usuário
	const output = engine.render("example.nj", {
		name,
		packageManager,
		newPackageManager,
		confirmation,
		searchPackage,
	});

	// Criar um arquivo de saída
	fs.writeFileSync(outputPath, output);
	console.log("Arquivo gerado com sucesso: output.txt");
}

// Executar a função principal
main().catch((error) => {
	console.error("Erro ao gerar o arquivo:", error);
});
