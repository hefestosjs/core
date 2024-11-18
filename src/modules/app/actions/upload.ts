import fs from "node:fs";
import { join } from "node:path";
import chalk from "chalk";
import { getPath } from "src/paths";

import type nunjucks from "nunjucks";

export const upload = async (engine: nunjucks.Environment) => {
	const templates = {
		config: engine.render("upload/config/upload.nj"),
		middleware: engine.render("upload/middleware/upload.nj"),
		module: {
			index: engine.render("upload/module/index.nj"),
			local: {
				index: engine.render("upload/module/local/index.nj"),
				storage: engine.render("upload/module/local/storage.nj"),
			},
			s3: {
				index: engine.render("upload/module/s3/index.nj"),
				putObject: engine.render("upload/module/s3/putObject.nj"),
				deleteObject: engine.render("upload/module/s3/deleteObject.nj"),
				upload: engine.render("upload/module/s3/upload.nj"),
			},
			utils: {
				cleanTmp: engine.render("upload/module/utils/cleanTmp.nj"),
			},
		},
	};

	const outputs = {
		config: join(getPath.app.config, "upload.ts"),
		middleware: join(getPath.app.middlewares, "upload.ts"),
		module: {
			index: join(process.cwd(), "modules/upload/index.ts"),
			local: {
				index: join(process.cwd(), "modules/upload/local/index.ts"),
				storage: join(process.cwd(), "modules/upload/local/storage.ts"),
			},
			s3: {
				index: join(process.cwd(), "modules/upload/s3/index.ts"),
				putObject: join(process.cwd(), "modules/upload/s3/putObject.ts"),
				deleteObject: join(process.cwd(), "modules/upload/s3/deleteObject.ts"),
				upload: join(process.cwd(), "modules/upload/s3/upload.ts"),
			},
			utils: {
				cleanTmp: join(process.cwd(), "modules/upload/utils/cleanTmp.ts"),
			},
		},
	};

	// Create directory if does not exists
	fs.mkdirSync(join(process.cwd(), "modules/upload"), { recursive: true });
	fs.mkdirSync(join(process.cwd(), "modules/upload/local"), {
		recursive: true,
	});
	fs.mkdirSync(join(process.cwd(), "modules/upload/s3"), { recursive: true });
	fs.mkdirSync(join(process.cwd(), "modules/upload/utils"), {
		recursive: true,
	});

	// Create files
	fs.writeFileSync(outputs.config, templates.config);
	fs.writeFileSync(outputs.middleware, templates.middleware);
	fs.writeFileSync(outputs.module.index, templates.module.index);
	fs.writeFileSync(outputs.module.local.index, templates.module.local.index);
	fs.writeFileSync(
		outputs.module.local.storage,
		templates.module.local.storage,
	);
	fs.writeFileSync(outputs.module.s3.index, templates.module.s3.index);
	fs.writeFileSync(outputs.module.s3.putObject, templates.module.s3.putObject);
	fs.writeFileSync(
		outputs.module.s3.deleteObject,
		templates.module.s3.deleteObject,
	);
	fs.writeFileSync(outputs.module.s3.upload, templates.module.s3.upload);
	fs.writeFileSync(
		outputs.module.utils.cleanTmp,
		templates.module.utils.cleanTmp,
	);

	// Install dependencies
	await Promise.all([
		Bun.$`bun add uuid multer @aws-sdk/client-s3`,
		Bun.$`bun add -D @types/uuid @types/multer`,
	]);

	// Generated message
	const warn = chalk.hex("#FFA500").bold;
	const message = `The file has been generated at ${warn("app/config/upload.ts")}, ${warn("app/middlewares/upload.ts")} and ${warn("modules/upload")}.`;

	return console.log(message);
};
