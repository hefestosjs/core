export default class NameState {
	private name = "";
	private static instance: NameState | null = null;

	private constructor() {}

	public static getInstance(): NameState {
		if (NameState.instance === null) {
			NameState.instance = new NameState();
		}
		return NameState.instance;
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
	}
}
