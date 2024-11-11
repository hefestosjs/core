import { Separator, input, select } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const validation = async (engine: nunjucks.Environment) => {
	const selected = await select({
		message: "What do you want to create?",
		choices: [
			{
				name: "A validation set",
				value: "set",
				description:
					"Creates a folder with the creation and update validation template inside.",
			},
			{
				name: "A single validation file",
				value: "single",
				description:
					"Creates a single file validation with the example template.",
			},
			new Separator(),
		],
	});

	const nameState = useState.name.getInstance();
	const folderState = useState.folder.getInstance();

	const prompts = {
		set: async () => {
			const name = await input({
				message: "Validation set name",
				default: nameState.getName() || "",
			});

			nameState.setName(name);
			actions.validation.set({ engine, name });
		},

		single: async () => {
			const folder = await input({
				message: "Validation folder name",
				default: folderState.getFolder() || "",
			});

			const name = await input({ message: "Validation name" });

			folderState.setFolder(folder);
			actions.validation.single({ engine, folder, name });
		},
	};

	return await prompts[selected as keyof typeof prompts]();
};

export { validation };
