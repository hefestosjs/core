import cron, { type ScheduledTask } from "node-cron";
import { getPath } from "../paths";

export const createSchedule = cron.schedule;
export type { ScheduledTask };

export default function TaskManager() {
	const task = getPath.tasks();
	const runner = task.run();

	return runner;
}
