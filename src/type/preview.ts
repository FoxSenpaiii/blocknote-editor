import { ITips, II18n, IObject, IHljs, IMath, IMarkdownConfig, ILuteRender } from '$type';

export interface IPreviewTheme {
	current: string;
	list?: IObject;
	path?: string;
}

export interface IPreview {
	delay?: number;
	maxWidth?: number;
	mode?: 'both' | 'editor';
	url?: string;
	hljs?: IHljs;
	math?: IMath;
	markdown?: IMarkdownConfig;
	theme?: IPreviewTheme;
	actions?: Array<IPreviewAction | IPreviewActionCustom>;

	parse?(element: HTMLElement): void;
	transform?(html: string): string;
}

export type IPreviewAction = 'desktop' | 'tablet' | 'mobile' | 'mp-wechat' | 'zhihu';

export interface IPreviewActionCustom {
	key: string;
	text: string;
	className?: string;
	tooltip?: string;
	click: (key: string) => void;
}

export interface IPreviewOptions {
	mode: 'dark' | 'light';
	customEmoji?: IObject;
	lang?: keyof II18n;
	i18n?: ITips;
	lazyLoadImage?: string;
	emojiPath?: string;
	hljs?: IHljs;
	speech?: {
		enable?: boolean;
	};
	anchor?: number; // 0: no render, 1: render left, 2: render right
	math?: IMath;
	cdn?: string;
	markdown?: IMarkdownConfig;
	renderers?: ILuteRender;
	theme?: IPreviewTheme;
	icon?: 'ant' | 'material';

	transform?(html: string): string;
	after?(): void;
}
