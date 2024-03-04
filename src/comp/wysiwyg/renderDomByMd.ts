import { processCodeRender } from '$util/processCode';
import { afterRenderEvent } from './afterRenderEvent';
import { IEditor } from '$type/editor';

export const renderDomByMd = (
	vditor: IEditor,
	md: string,
	options = {
		enableAddUndoStack: true,
		enableHint: false,
		enableInput: true
	}
) => {
	const editorElement = vditor.wysiwyg!.element;
	editorElement.innerHTML = vditor.lute.Md2VditorDOM(md);
	//@ts-ignore
	editorElement.querySelectorAll(".vditor-wysiwyg__preview[data-render='2']").forEach((item: HTMLElement) => {
		processCodeRender(item, vditor);
		item.previousElementSibling?.setAttribute('style', 'display:none');
	});

	afterRenderEvent(vditor, options);
};
