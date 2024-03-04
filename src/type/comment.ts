export interface ICommentsData {
	id: string;
	top: number;
}

export interface IComment {
	enable: boolean;

	add?(id: string, text: string, commentsData: ICommentsData[]): void;
	remove?(ids: string[]): void;
	scroll?(top: number): void;
	adjustTop?(commentsData: ICommentsData[]): void;
}
