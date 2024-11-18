import type { Options as RFSOptions } from "rotating-file-stream";
import type { RequestInterface, ResponseInterface } from "../router";

type PredefinedFormats = "combined" | "common" | "dev" | "short" | "tiny";

export interface LoggerInterface {
	active: boolean;
	format: PredefinedFormats;
	customFormat?: string;
	skip?: (request: RequestInterface, response: ResponseInterface) => any;
	immediate?: boolean;
	rotate: {
		active: boolean;
		options: RFSOptions;
	};
}
