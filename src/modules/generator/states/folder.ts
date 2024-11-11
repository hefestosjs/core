export default class FolderState {
	private folder = "";
	private static instance: FolderState | null = null;

	private constructor() {}

	public static getInstance(): FolderState {
		if (FolderState.instance === null) {
			FolderState.instance = new FolderState();
		}
		return FolderState.instance;
	}

	getFolder(): string {
		return this.folder;
	}

	setFolder(folder: string): void {
		this.folder = folder;
	}
}
