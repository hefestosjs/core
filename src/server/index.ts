import fs from "node:fs";
import { join } from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";
import { getPath } from "src/paths";

import Assets from "src/modules/assets";
import Authentication from "src/modules/auth";
import Cache from "src/modules/cache";
import Compression from "src/modules/compression";
import Logger from "src/modules/logger";
import MethodOverride from "src/modules/methodOverride";
import Views from "src/modules/views";

export const APP = express();
export const PORT = Number(process.env.PORT) || 3000;
export const MAX_PORT = 3099;

Logger(APP);
Views(APP);
Assets(APP);
Compression(APP);
Cache();
Authentication();

APP.use(helmet());
APP.use(helmet.contentSecurityPolicy(getPath.config.security));
APP.use(cors(getPath.config.cors));
APP.use(express.json());
APP.use(cookieParser(process.env.COOKIE_SECRET || "secret"));
APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride(MethodOverride));
APP.use("/", getPath.routes());

if (fs.existsSync(join(getPath.resources.pages, "404.nj"))) {
	APP.use((req, res) => res.status(404).render("404"));
}
