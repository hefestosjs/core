import { handlers } from "./handlers";
import { options } from "./options";
import { engine } from "./setup";

export const Module = async () => {
	for (const option of options) {
		const generators = {
			auth: handlers.auth,
			mailer: handlers.mailer,
			upload: handlers.upload,
		};

		if (!Object.keys(generators).includes(option)) {
			return console.error("Module not found.");
		}

		if (!option) {
			return console.warn("You need select an option to generate files.");
		}

		await generators[option as keyof typeof generators](engine);
	}
};
