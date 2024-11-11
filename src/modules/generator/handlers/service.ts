import { Separator, input, select } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const service = async (engine: nunjucks.Environment) => {
	const nameState = useState.name.getInstance();
	const name = await input({
		message: "Service name",
		default: nameState.getName() || "",
	});

	nameState.setName(name);

	const selected = await select({
		message: "Select the organization type",
		choices: [
			{
				name: "A single file",
				value: "single",
				description: "Creates a single file with all the methods.",
			},
			{
				name: "Multiple files",
				value: "multiple",
				description: "Creates a file for each method.",
			},
			new Separator(),
		],
	});

	const choices = {
		single: () => {
			actions.service.single({ engine, name });
		},

		multiple: () => {
			actions.service.multiple({ engine, name });
		},
	};

	return choices[selected as keyof typeof choices]();
};

export { service };
