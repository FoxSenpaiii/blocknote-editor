declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare const VDITOR_VERSION: string;

declare interface Window {
	visualViewport: HTMLElement;
}

declare class Lute {
	public static WalkStop: number;
	public static WalkSkipChildren: number;
	public static WalkContinue: number;
	public static Version: string;
	public static Caret: string;

	public static New(): Lute;

	public static EscapeHTMLStr(html: string): string;

	public static GetHeadingID(node: ILuteNode): string;

	public static NewNodeID(): string;

	public static Sanitize(html: string): string;

	private constructor();

	public SetJSRenderers(options?: {
		renderers: {
			HTML2VditorDOM?: ILuteRender;
			HTML2VditorIRDOM?: ILuteRender;
			HTML2Md?: ILuteRender;
			Md2HTML?: ILuteRender;
			Md2VditorDOM?: ILuteRender;
			Md2VditorIRDOM?: ILuteRender;
			Md2VditorSVDOM?: ILuteRender;
		};
	}): void;

	public SetChineseParagraphBeginningSpace(enable: boolean): void;
	public SetHeadingID(enable: boolean): void;
	public SetRenderListStyle(enable: boolean): void;
	public SetLinkBase(url: string): void;
	public SetVditorIR(enable: boolean): void;
	public SetVditorSV(enable: boolean): void;
	public SetVditorWYSIWYG(enable: boolean): void;

	public SetLinkPrefix(url: string): void;

	public SetMark(enable: boolean): void;

	public SetGFMAutoLink(enable: boolean): void;

	public SetSanitize(enable: boolean): void;

	public SetHeadingAnchor(enable: boolean): void;

	public SetImageLazyLoading(imagePath: string): void;

	public SetInlineMathAllowDigitAfterOpenMarker(enable: boolean): void;

	public SetToC(enable: boolean): void;

	public SetFootnotes(enable: boolean): void;

	public SetAutoSpace(enable: boolean): void;

	public SetFixTermTypo(enable: boolean): void;

	public SetEmojiSite(emojiSite: string): void;

	public SetVditorCodeBlockPreview(enable: boolean): void;

	public SetVditorMathBlockPreview(enable: boolean): void;

	public PutEmojis(emojis: IObject): void;

	public GetEmojis(): IObject;

	public IsValidLinkDest(link: string): boolean;

	// debugger md
	public RenderEChartsJSON(text: string): string;

	// md 转换为 html
	public Md2HTML(markdown: string): string;

	// 粘贴时将 html 转换为 md
	public HTML2Md(html: string): string;

	// wysiwyg 转换为 html
	public VditorDOM2HTML(vhtml: string): string;

	// wysiwyg 输入渲染
	public SpinVditorDOM(html: string): string;

	// 粘贴时将 html 转换为 wysiwyg
	public HTML2VditorDOM(html: string): string;

	// 将 wysiwyg 转换为 md
	public VditorDOM2Md(html: string): string;

	// 将 md 转换为 wysiwyg
	public Md2VditorDOM(markdown: string): string;

	// ir 输入渲染
	public SpinVditorIRDOM(markdown: string): string;

	// ir 获取 md
	public VditorIRDOM2Md(html: string): string;

	// md 转换为 ir
	public Md2VditorIRDOM(text: string): string;

	// 获取 HTML
	public VditorIRDOM2HTML(html: string): string;

	// 粘贴时将 html 转换为 sv
	public HTML2VditorIRDOM(html: string): string;

	// sv 输入渲染
	public SpinVditorSVDOM(text: string): string;

	// 粘贴是 md 转换为 sv
	public Md2VditorSVDOM(text: string): string;

	// 将markdown转化为JSON结构输出 https://github.com/88250/lute/issues/120
	public RenderJSON(markdown: string): string;
}
