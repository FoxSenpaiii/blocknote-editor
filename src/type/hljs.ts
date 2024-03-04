export interface IHljs {
	defaultLang?: string;
	lineNumber?: boolean;
	style?: string;
	enable?: boolean;
	langs?: string[];
	renderMenu?(element: HTMLElement, menuElement: HTMLElement): void;
}
