import type nunjucks from "nunjucks";
import { actions } from "../actions";

const mailer = async (engine: nunjucks.Environment) => {
	return actions.mailer(engine);
};

export { mailer };
