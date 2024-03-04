export interface IMath {
	inlineDigit?: boolean;
	macros?: object;
	engine?: 'KaTeX' | 'MathJax';
	mathJaxOptions?: any;
}
