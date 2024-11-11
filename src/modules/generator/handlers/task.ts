import { input } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const task = async (engine: nunjucks.Environment) => {
	const nameState = useState.name.getInstance();
	const name = await input({
		message: "Task name",
		default: nameState.getName() || "",
	});

	nameState.setName(name);

	return actions.task({ engine, name });
};

export { task };
