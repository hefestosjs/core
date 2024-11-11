import { input } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const test = async (engine: nunjucks.Environment) => {
	const nameState = useState.name.getInstance();

	const folder = await input({ message: "Test folder name" });
	const name = await input({
		message: "Test name",
		default: nameState.getName() || "",
	});

	nameState.setName(name);

	return actions.test({ engine, folder, name });
};

export { test };
