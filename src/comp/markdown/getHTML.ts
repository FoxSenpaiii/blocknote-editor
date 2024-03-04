import { getMarkdown } from './getMarkdown';
import { IEditor } from '$type/editor';

export const getHTML = (vditor: IEditor) => {
	if (vditor.currentMode === 'sv') {
		return vditor.lute.Md2HTML(getMarkdown(vditor));
	} else if (vditor.currentMode === 'wysiwyg') {
		return vditor.lute.VditorDOM2HTML(vditor.wysiwyg!.element.innerHTML);
	} else if (vditor.currentMode === 'ir') {
		return vditor.lute.VditorIRDOM2HTML(vditor.ir!.element.innerHTML);
	}
};
