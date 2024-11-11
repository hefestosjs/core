import cors from "cors";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";
import Assets from "src/modules/assets";
import MethodOverride from "src/modules/methodOverride";
import Views from "src/modules/views";
import { getPath } from "src/paths";

export const APP = express();
export const PORT = Number(process.env.PORT) || 3000;
export const MAX_PORT = 3099;
export const middleware = { register: APP.use };

/**
 * Modules
 */
Views(APP);
Assets(APP);

/**
 * Server
 */
APP.use(helmet());
APP.use(helmet.contentSecurityPolicy(getPath.config.security));
APP.use(cors(getPath.config.cors));
APP.use(express.json());

if (getPath.config.auth) {
	// APP.use(cookieParser(process.env.COOKIE_SECRET));
}

APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride(MethodOverride));
APP.use("/", getPath.routes());
APP.use((req, res, next) => res.status(404).render("404"));
