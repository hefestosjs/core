import { execSync } from "node:child_process";
import path from "node:path";
import Bun from "bun";

const npmBinPath = path.join(process.cwd(), "node_modules", ".bin");

const execCommand = (command: string) => {
	try {
		execSync(command, {
			stdio: "inherit",
			env: { ...process.env, PATH: `${npmBinPath}:${process.env.PATH}` },
		});
	} catch (error) {
		console.log("\n");
		console.log("Process Interrupted");

		process.exit(0);
	}
};

export const run = (script: string, args: string[]) => {
	const commands: any = {
		// Monitoring
		start: () => execCommand("bun start/server.ts"),
		ms: () => execCommand("clear && nodemon start/server.ts"),
		mw: async () => {
			await Promise.all([
				Bun.$`nodemon start/server.ts`,
				Bun.$`bunx tailwindcss -i public/css/tailwind.css -o public/css/styles.css --watch`,
			]);
		},

		// Others
		generate: () => execCommand("clear && bun start/forge.ts"),
		studio: () => execCommand("prisma studio"),
		seed: () => execCommand("prisma db seed"),
	};

	if (commands[script]) {
		commands[script](args);
	} else {
		console.log(`Script "${script}" not found`);
	}
};
