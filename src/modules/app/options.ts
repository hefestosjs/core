import { checkbox } from "@inquirer/prompts";

export const options = await checkbox({
	message: "What do you want to forge?",
	choices: [
		{ name: "Authentication", value: "auth" },
		{ name: "Mailer", value: "mailer" },
		{ name: "Upload", value: "upload" },
	],
});
