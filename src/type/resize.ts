export interface IResize {
	position?: string;
	enable?: boolean;

	after?(height: number): void;
}
