import { handlers } from "./handlers";
import { options } from "./options";
import { engine } from "./setup";

export const Forge = async () => {
	for (const option of options) {
		const generators = {
			validation: handlers.validation,
			service: handlers.service,
			controller: handlers.controller,
			factory: handlers.factory,
			test: handlers.test,
			task: handlers.task,
			view: handlers.view,
			layout: handlers.layout,
		};

		if (!Object.keys(generators).includes(option)) {
			return console.error("Generator not found.");
		}

		if (!option) {
			return console.warn("You need select an option to generate.");
		}

		await generators[option as keyof typeof generators](engine);
	}
};
