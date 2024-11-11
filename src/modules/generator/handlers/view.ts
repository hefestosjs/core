import { input } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const view = async (engine: nunjucks.Environment) => {
	const folderState = useState.folder.getInstance();

	const folder = await input({
		message: "View folder name",
		default: folderState.getFolder() || "",
	});

	folderState.setFolder(folder);

	const name = await input({ message: "View name" });

	return actions.view({ engine, folder, name });
};

export { view };
