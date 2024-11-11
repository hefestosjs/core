import cors from "cors";
import express from "express";
import helmet from "helmet";
import { getPath } from "src/paths";

export const APP = express();
export const PORT = Number(process.env.PORT) || 3000;
export const MAX_PORT = 3099;
export const middleware = { register: APP.use };

APP.use(helmet());
APP.use(helmet.contentSecurityPolicy(getPath.config.security));
APP.use(cors(getPath.config.cors));
APP.use(express.json());

if (getPath.config.auth) {
	// APP.use(cookieParser(process.env.COOKIE_SECRET));
}

APP.use(express.urlencoded({ extended: true }));

if (getPath.resources) {
	// APP.use(methodOverride(MethodOverride));
}

APP.use("/", getPath.routes);

if (getPath.resources.pages) {
	// APP.use((req, res, next) => res.status(404).render("404"));
}
