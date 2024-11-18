import { Separator, select } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";

const auth = async (engine: nunjucks.Environment) => {
	const choice = await select({
		message: "Which authentication preset do you want to use?",
		choices: [
			{
				name: "API Session",
				value: "api",
				description: "Authentication for api project.",
			},
			{
				name: "Full Stack Session",
				value: "web",
				description: "Authentication for full stack project.",
			},
			{
				name: "Token",
				value: "token",
				description: "Uses JWT Token.",
			},
			new Separator(),
		],
	});

	return actions.auth({ engine, choice });
};

export { auth };
