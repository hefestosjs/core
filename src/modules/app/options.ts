import { checkbox } from "@inquirer/prompts";

export const options = await checkbox({
	message: "Which module do you want to add?",
	choices: [
		{ name: "Authentication", value: "auth" },
		{ name: "Mailer", value: "mailer" },
		{ name: "Upload", value: "upload" },
		{ name: "Views", value: "pages" },
	],
});
