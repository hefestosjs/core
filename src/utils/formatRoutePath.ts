export function formatRoutePath(str: string): string {
	let newString: string = str;

	if (!str.startsWith("/")) {
		newString = `/${str}`;
	}

	return newString;
}
