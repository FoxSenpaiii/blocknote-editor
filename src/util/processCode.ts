import { abcRender } from '$comp/markdown/abcRender';
import { chartRender } from '$comp/markdown/chartRender';
import { codeRender } from '$comp/markdown/codeRender';
import { flowchartRender } from '$comp/markdown/flowchartRender';
import { graphvizRender } from '$comp/markdown/graphvizRender';
import { highlightRender } from '$comp/markdown/highlightRender';
import { mathRender } from '$comp/markdown/mathRender';
import { mermaidRender } from '$comp/markdown/mermaidRender';
import { markmapRender } from '$comp/markdown/markmapRender';
import { mindmapRender } from '$comp/markdown/mindmapRender';
import { plantumlRender } from '$comp/markdown/plantumlRender';
import { IEditor } from '$type/editor';

export const processPasteCode = (html: string, text: string, type = 'sv') => {
	const tempElement = document.createElement('div');
	tempElement.innerHTML = html;
	let isCode = false;
	if (
		tempElement.childElementCount === 1 &&
		(tempElement.lastElementChild as HTMLElement).style.fontFamily.indexOf('monospace') > -1
	) {
		// VS Code
		isCode = true;
	}
	const pres = tempElement.querySelectorAll('pre');
	if (
		tempElement.childElementCount === 1 &&
		pres.length === 1 &&
		pres[0].className !== 'vditor-wysiwyg' &&
		pres[0].className !== 'vditor-sv'
	) {
		// IDE
		isCode = true;
	}
	if (html.startsWith('\n<p class="p1">')) {
		// Xcode
		isCode = true;
	}
	if (
		tempElement.childElementCount === 1 &&
		tempElement.firstElementChild?.tagName === 'TABLE' &&
		tempElement.querySelector('.line-number') &&
		tempElement.querySelector('.line-content')
	) {
		// 网页源码
		isCode = true;
	}

	if (isCode) {
		const code = text || html;
		if (/\n/.test(code) || pres.length === 1) {
			if (type === 'wysiwyg') {
				return `<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>${code
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')}<wbr></code></pre></div>`;
			}
			return '\n```\n' + code.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '\n```';
		} else {
			if (type === 'wysiwyg') {
				return `<code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code><wbr>`;
			}
			return `\`${code}\``;
		}
	}
	return false;
};

export const processCodeRender = (previewPanel: HTMLElement, vditor: IEditor) => {
	if (!previewPanel) {
		return;
	}
	if (previewPanel.parentElement?.getAttribute('data-type') === 'html-block') {
		previewPanel.setAttribute('data-render', '1');
		return;
	}
	const language = previewPanel.firstElementChild?.className.replace('language-', '');
	if (language === 'abc') {
		abcRender(previewPanel, vditor.options.cdn);
	} else if (language === 'mermaid') {
		mermaidRender(previewPanel, vditor.options.cdn, vditor.options.theme);
	} else if (language === 'markmap') {
		markmapRender(previewPanel, vditor.options.cdn, vditor.options.theme);
	} else if (language === 'flowchart') {
		flowchartRender(previewPanel, vditor.options.cdn);
	} else if (language === 'echarts') {
		chartRender(previewPanel, vditor.options.cdn, vditor.options.theme);
	} else if (language === 'mindmap') {
		mindmapRender(previewPanel, vditor.options.cdn, vditor.options.theme);
	} else if (language === 'plantuml') {
		plantumlRender(previewPanel, vditor.options.cdn);
	} else if (language === 'graphviz') {
		graphvizRender(previewPanel, vditor.options.cdn);
	} else if (language === 'math') {
		mathRender(previewPanel, { cdn: vditor.options.cdn, math: vditor.options.preview?.math });
	} else {
		const cRender = vditor.options.customRenders?.find((item: any) => {
			if (item.language === language) {
				item.render(previewPanel, vditor);
				return true;
			}
		});
		if (!cRender) {
			highlightRender({ ...vditor.options.preview?.hljs }, previewPanel, vditor.options.cdn);
			codeRender(previewPanel, vditor.options.preview?.hljs);
		}
	}

	previewPanel.setAttribute('data-render', '1');
};
