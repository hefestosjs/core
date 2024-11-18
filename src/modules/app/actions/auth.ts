import fs from "node:fs";
import { join } from "node:path";
import Bun from "bun";
import chalk from "chalk";
import { getPath } from "src/paths";

import type { GenerateModuleAction } from "src/interfaces/generate-module";

export const auth = async ({ engine, choice }: GenerateModuleAction) => {
	const templates = {
		config: engine.render("auth/config/auth.nj"),
		middleware: engine.render("auth/middleware/auth.nj"),
		types: engine.render("auth/@types/session.d.nj"),
		module: {
			session: {
				api: {
					index: engine.render("auth/module/session/api/index.nj"),
					login: engine.render("auth/module/session/api/login.nj"),
					logout: engine.render("auth/module/session/api/logout.nj"),
				},
				web: {
					index: engine.render("auth/module/session/web/index.nj"),
					login: engine.render("auth/module/session/web/login.nj"),
					logout: engine.render("auth/module/session/web/logout.nj"),
				},
			},
			token: {
				index: engine.render("auth/module/token/index.nj"),
				login: engine.render("auth/module/token/login.nj"),
				logout: engine.render("auth/module/token/logout.nj"),
			},
		},
	};

	const outputs = {
		config: join(getPath.app.config, "auth.ts"),
		middleware: join(getPath.app.middlewares, "auth.ts"),
		types: join(process.cwd(), "session.d.ts"),
		module: {
			session: {
				api: {
					index: join(process.cwd(), "modules/auth/session/api/index.ts"),
					login: join(process.cwd(), "modules/auth/session/api/login.ts"),
					logout: join(process.cwd(), "modules/auth/session/api/logout.ts"),
				},
				web: {
					index: join(process.cwd(), "modules/auth/session/web/index.ts"),
					login: join(process.cwd(), "modules/auth/session/web/login.ts"),
					logout: join(process.cwd(), "modules/auth/session/web/logout.ts"),
				},
			},
			token: {
				index: join(process.cwd(), "modules/auth/token/index.ts"),
				login: join(process.cwd(), "modules/auth/token/login.ts"),
				logout: join(process.cwd(), "modules/auth/token/logout.ts"),
			},
		},
	};

	// Create directory if does not exists
	fs.mkdirSync(join(process.cwd(), "@types"), { recursive: true });

	if (choice === "api" || choice === "web") {
		fs.mkdirSync(join(process.cwd(), `modules/auth/session/${choice}`), {
			recursive: true,
		});
	}

	if (choice === "token") {
		fs.mkdirSync(join(process.cwd(), "modules/auth/token"), {
			recursive: true,
		});
	}

	// Create files
	fs.writeFileSync(outputs.config, templates.config);
	fs.writeFileSync(outputs.middleware, templates.middleware);

	if (choice === "api") {
		fs.writeFileSync(outputs.types, templates.types);

		fs.writeFileSync(
			outputs.module.session.api.index,
			templates.module.session.api.index,
		);
		fs.writeFileSync(
			outputs.module.session.api.login,
			templates.module.session.api.login,
		);
		fs.writeFileSync(
			outputs.module.session.api.logout,
			templates.module.session.api.logout,
		);
	}

	if (choice === "web") {
		fs.writeFileSync(outputs.types, templates.types);

		fs.writeFileSync(
			outputs.module.session.web.index,
			templates.module.session.web.index,
		);
		fs.writeFileSync(
			outputs.module.session.web.login,
			templates.module.session.web.login,
		);
		fs.writeFileSync(
			outputs.module.session.web.logout,
			templates.module.session.web.logout,
		);
	}

	if (choice === "token") {
		fs.writeFileSync(outputs.module.token.index, templates.module.token.index);
		fs.writeFileSync(outputs.module.token.login, templates.module.token.login);
		fs.writeFileSync(
			outputs.module.token.logout,
			templates.module.token.logout,
		);

		await Promise.all([
			Bun.$`bun add jsonwebtoken`,
			Bun.$`bun add -D @types/jsonwebtoken`,
		]);
	}

	// Install dependencies
	await Promise.all([Bun.$`bun add uuid`]);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn("app/config/auth.ts")}, ${warn("app/middlewares/auth.ts")} and ${warn("modules/auth")}.`;

	return console.log(message);
};
