import { input } from "@inquirer/prompts";
import type nunjucks from "nunjucks";
import { actions } from "../actions";
import { useState } from "../states";

const layout = async (engine: nunjucks.Environment) => {
	const folderState = useState.folder.getInstance();

	const folder = await input({
		message: "Layout folder name",
		default: folderState.getFolder() || "",
	});

	folderState.setFolder(folder);

	const name = await input({ message: "Layout name" });

	return actions.layout({ engine, folder, name });
};

export { layout };
