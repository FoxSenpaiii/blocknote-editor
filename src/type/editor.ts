import {
	ITips,
	IMenuItem,
	IResize,
	II18n,
	IPreview,
	IToolbarConfig,
	IHint,
	IClasses,
	IComment,
	IUpload,
	IOutline,
	IHintData,
	ICommentsData
} from '$type';

export interface IEditor {
	element: HTMLElement;
	options: IEditorOptions;
	originalInnerHTML: string;
	lute: Lute;
	currentMode: 'sv' | 'wysiwyg' | 'ir';
	devtools?: {
		element: HTMLDivElement;
		renderEchart(editor: IEditor): void;
	};
	outline: {
		element: HTMLElement;
		render(editor: IEditor): string;
		toggle(editor: IEditor, show?: boolean, focus?: boolean): void;
	};
	toolbar?: {
		elements?: { [key: string]: HTMLElement };
		element?: HTMLElement;
	};
	preview?: {
		element: HTMLElement;
		previewElement: HTMLElement;
		render(editor: IEditor, value?: string): void;
	};
	counter?: {
		element: HTMLElement;
		render(editor: IEditor, mdText?: string): void;
	};
	resize?: {
		/** 编辑器中选中文字后触发 */

		element: HTMLElement;
	};
	hint: {
		timeId: number;
		element: HTMLDivElement;
		recentLanguage: string;
		fillEmoji(element: HTMLElement, editor: IEditor): void;
		render(editor: IEditor): void;
		genHTML(data: IHintData[], key: string, editor: IEditor): void;
		select(event: KeyboardEvent, editor: IEditor): boolean;
	};
	tip: {
		element: HTMLElement;
		show(text: string, time?: number): void;
		hide(): void;
	};
	upload?: {
		/** 编辑器中选中文字后触发 */

		element: HTMLElement;
		isUploading: boolean;
		range: Range;
	};
	undo?: {
		clearStack(editor: IEditor): void;
		redo(editor: IEditor): void;
		undo(editor: IEditor): void;
		addToUndoStack(editor: IEditor): void;
		recordFirstPosition(editor: IEditor, event: KeyboardEvent): void;
		resetIcon(editor: IEditor): void;
	};
	wysiwyg?: {
		range: Range;
		element: HTMLPreElement;
		selectPopover: HTMLDivElement;
		popover: HTMLDivElement;
		afterRenderTimeoutId: number;
		hlToolbarTimeoutId: number;
		preventInput: boolean;
		composingLock: boolean;
		commentIds: string[];
		getComments(editor: IEditor, getData?: boolean): ICommentsData[];
		triggerRemoveComment(editor: IEditor): void;
		showComment(): void;
		hideComment(): void;
		unbindListener(): void;
	};
	ir?: {
		range: Range;
		element: HTMLPreElement;
		composingLock: boolean;
		preventInput: boolean;
		processTimeoutId: number;
		hlToolbarTimeoutId: number;
	};
	sv?: {
		range: Range;
		element: HTMLPreElement;
		processTimeoutId: number;
		hlToolbarTimeoutId: number;
		composingLock: boolean;
		preventInput: boolean;
	};
}

export interface IEditorOptions {
	rtl?: boolean;
	undoDelay?: number;
	_lutePath?: string;
	value?: string;
	debugger?: boolean;
	typewriterMode?: boolean;
	height?: number | string;
	minHeight?: number;
	width?: number | string;
	placeholder?: string;
	lang?: keyof II18n;
	i18n?: ITips;
	fullscreen?: {
		index: number;
	};
	toolbar?: Array<string | IMenuItem>;
	resize?: IResize;
	counter?: {
		enable: boolean;
		max?: number;
		type?: 'markdown' | 'text';
		after?(
			length: number,
			counter: {
				enable: boolean;
				max?: number;
				type?: 'markdown' | 'text';
			}
		): void;
	};
	cache?: {
		id?: string;
		enable?: boolean;
		after?(markdown: string): void;
	};
	mode: 'wysiwyg' | 'sv' | 'ir';
	preview?: IPreview;
	link?: {
		isOpen?: boolean;
		click?: (bom: Element) => void;
	};
	image?: {
		isPreview?: boolean;
		preview?: (bom: Element) => void;
	};
	hint?: IHint;
	toolbarConfig?: IToolbarConfig;
	comment?: IComment;
	theme: 'classic' | 'dark';
	icon?: 'ant' | 'material';
	upload?: IUpload;
	classes?: IClasses;
	cdn?: string;
	tab?: string;
	outline?: IOutline;
	customRenders?: {
		language: string;
		render: (element: HTMLElement, vditor: IEditor) => void;
	}[];

	after?(): void;
	input?(value: string): void;
	focus?(value: string): void;
	blur?(value: string): void;
	keydown?(event: KeyboardEvent): void;
	esc?(value: string): void;
	ctrlEnter?(value: string): void;
	select?(value: string): void;
}
