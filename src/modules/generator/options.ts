import { checkbox } from "@inquirer/prompts";

export const options = await checkbox({
	message: "What do you want to forge?",
	choices: [
		{ name: "Validation", value: "validation" },
		{ name: "Service", value: "service" },
		{ name: "Controller", value: "controller" },
		{ name: "Factory", value: "factory" },
		{ name: "Test", value: "test" },
		{ name: "Task", value: "task" },
		{ name: "View", value: "view" },
		{ name: "Layout", value: "layout" },
	],
});
