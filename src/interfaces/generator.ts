import type nunjucks from "nunjucks";

export interface GeneratorActionWithFolder {
	engine: nunjucks.Environment;
	folder: string;
	name: string;
}

export interface GeneratorActionWithoutFolder {
	engine: nunjucks.Environment;
	name: string;
}
