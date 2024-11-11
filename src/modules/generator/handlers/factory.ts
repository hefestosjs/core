import { input } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const factory = async (engine: nunjucks.Environment) => {
	const nameState = useState.name.getInstance();
	const name = await input({
		message: "Factory name (Use a model name)",
		default: nameState.getName() || "",
	});

	nameState.setName(name);

	return actions.factory({ engine, name });
};

export { factory };
