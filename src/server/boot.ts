export type OperationsType = {
	function: (...args: any[]) => void;
	params: any[];
};

export const bootOperations: OperationsType[] = [];

export function executeOperations() {
	for (const execute of bootOperations) {
		execute.function(...execute.params);
	}
}
