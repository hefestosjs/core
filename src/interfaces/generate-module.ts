import type nunjucks from "nunjucks";

export interface GenerateModuleAction {
	engine: nunjucks.Environment;
	choice: string;
}
