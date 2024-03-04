import { IObject } from '$type';

export interface ILuteNode {
	TokensStr: () => string;
	__internal_object__: {
		Parent: {
			Type: number;
		};
		HeadingLevel: string;
	};
}

export type ILuteRenderCallback = (node: ILuteNode, entering: boolean) => [string, number];

export interface ILuteRender {
	renderDocument?: ILuteRenderCallback;
	renderParagraph?: ILuteRenderCallback;
	renderText?: ILuteRenderCallback;
	renderCodeBlock?: ILuteRenderCallback;
	renderCodeBlockOpenMarker?: ILuteRenderCallback;
	renderCodeBlockInfoMarker?: ILuteRenderCallback;
	renderCodeBlockCode?: ILuteRenderCallback;
	renderCodeBlockCloseMarker?: ILuteRenderCallback;
	renderMathBlock?: ILuteRenderCallback;
	renderMathBlockOpenMarker?: ILuteRenderCallback;
	renderMathBlockContent?: ILuteRenderCallback;
	renderMathBlockCloseMarker?: ILuteRenderCallback;
	renderBlockquote?: ILuteRenderCallback;
	renderBlockquoteMarker?: ILuteRenderCallback;
	renderHeading?: ILuteRenderCallback;
	renderHeadingC8hMarker?: ILuteRenderCallback;
	renderList?: ILuteRenderCallback;
	renderListItem?: ILuteRenderCallback;
	renderTaskListItemMarker?: ILuteRenderCallback;
	renderThematicBreak?: ILuteRenderCallback;
	renderHTML?: ILuteRenderCallback;
	renderTable?: ILuteRenderCallback;
	renderTableHead?: ILuteRenderCallback;
	renderTableRow?: ILuteRenderCallback;
	renderTableCell?: ILuteRenderCallback;
	renderFootnotesDef?: ILuteRenderCallback;
	renderCodeSpan?: ILuteRenderCallback;
	renderCodeSpanOpenMarker?: ILuteRenderCallback;
	renderCodeSpanContent?: ILuteRenderCallback;
	renderCodeSpanCloseMarker?: ILuteRenderCallback;
	renderInlineMath?: ILuteRenderCallback;
	renderInlineMathOpenMarker?: ILuteRenderCallback;
	renderInlineMathContent?: ILuteRenderCallback;
	renderInlineMathCloseMarker?: ILuteRenderCallback;
	renderEmphasis?: ILuteRenderCallback;
	renderEmAsteriskOpenMarker?: ILuteRenderCallback;
	renderEmAsteriskCloseMarker?: ILuteRenderCallback;
	renderEmUnderscoreOpenMarker?: ILuteRenderCallback;
	renderEmUnderscoreCloseMarker?: ILuteRenderCallback;
	renderStrong?: ILuteRenderCallback;
	renderStrongA6kOpenMarker?: ILuteRenderCallback;
	renderStrongA6kCloseMarker?: ILuteRenderCallback;
	renderStrongU8eOpenMarker?: ILuteRenderCallback;
	renderStrongU8eCloseMarker?: ILuteRenderCallback;
	renderStrikethrough?: ILuteRenderCallback;
	renderStrikethrough1OpenMarker?: ILuteRenderCallback;
	renderStrikethrough1CloseMarker?: ILuteRenderCallback;
	renderStrikethrough2OpenMarker?: ILuteRenderCallback;
	renderStrikethrough2CloseMarker?: ILuteRenderCallback;
	renderHardBreak?: ILuteRenderCallback;
	renderSoftBreak?: ILuteRenderCallback;
	renderInlineHTML?: ILuteRenderCallback;
	renderLink?: ILuteRenderCallback;
	renderOpenBracket?: ILuteRenderCallback;
	renderCloseBracket?: ILuteRenderCallback;
	renderOpenParen?: ILuteRenderCallback;
	renderCloseParen?: ILuteRenderCallback;
	renderLinkText?: ILuteRenderCallback;
	renderLinkSpace?: ILuteRenderCallback;
	renderLinkDest?: ILuteRenderCallback;
	renderLinkTitle?: ILuteRenderCallback;
	renderImage?: ILuteRenderCallback;
	renderBang?: ILuteRenderCallback;
	renderEmoji?: ILuteRenderCallback;
	renderEmojiUnicode?: ILuteRenderCallback;
	renderEmojiImg?: ILuteRenderCallback;
	renderEmojiAlias?: ILuteRenderCallback;
	renderToC?: ILuteRenderCallback;
	renderFootnotesRef?: ILuteRenderCallback;
	renderBackslash?: ILuteRenderCallback;
	renderBackslashContent?: ILuteRenderCallback;
}

export interface ILuteOptions extends IMarkdownConfig {
	emojis: IObject;
	emojiSite: string;
	headingAnchor: boolean;
	inlineMathDigit: boolean;
	lazyLoadImage?: string;
}

export interface IMarkdownConfig {
	autoSpace?: boolean;
	paragraphBeginningSpace?: boolean;
	fixTermTypo?: boolean;
	toc?: boolean;
	footnotes?: boolean;
	codeBlockPreview?: boolean;
	mathBlockPreview?: boolean;
	sanitize?: boolean;
	linkBase?: string;
	linkPrefix?: string;
	listStyle?: boolean;
	mark?: boolean;
	gfmAutoLink?: boolean;
}
