import { join } from "node:path";
import type { Express } from "express";
import nunjucks from "nunjucks";

export default function Views(APP: Express) {
	const resources = join(process.cwd(), "app/resources");
	const pages = join(process.cwd(), "app/resources/pages");
	const mails = join(process.cwd(), "app/resources/mails");

	APP.engine("nj", nunjucks.render);
	APP.set("view engine", "nj");

	nunjucks.configure([resources, pages, mails], {
		autoescape: true,
		watch: true,
		express: APP,
	});
}

export const renderHtml = (name: string, context?: object | undefined) => {
	const ROOT_PATH = process.cwd();
	const path = join(ROOT_PATH, `app/resources/${name}`);

	return nunjucks.render(path, context);
};
