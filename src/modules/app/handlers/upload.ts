import type nunjucks from "nunjucks";
import { actions } from "../actions";

const upload = async (engine: nunjucks.Environment) => {
	return actions.upload(engine);
};

export { upload };
