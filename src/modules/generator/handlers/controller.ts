import { Separator, input, select } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const controller = async (engine: nunjucks.Environment) => {
	const nameState = useState.name.getInstance();
	const name = await input({
		message: "Controller name",
		default: nameState.getName() || "",
	});

	nameState.setName(name);

	const selected = await select({
		message: "Select the contorller type",
		choices: [
			{
				name: "API Only",
				value: "api",
				description: "Creates a file with basic methods for api.",
			},
			{
				name: "Full Stack",
				value: "fullstack",
				description:
					"Creates a file with methods for pages and crud functions.",
			},
			new Separator(),
		],
	});

	const choices = {
		api: () => {
			actions.controller.api({ engine, name });
		},

		fullstack: () => {
			actions.controller.fullstack({ engine, name });
		},
	};

	return choices[selected as keyof typeof choices]();
};

export { controller };
