import { code160to32 } from '$util/code160to32';
import { IEditor } from '$type/editor';

export const getMarkdown = (vditor: IEditor) => {
	if (vditor.currentMode === 'sv') {
		return code160to32(`${vditor.sv?.element.textContent}\n`.replace(/\n\n$/, '\n'));
	} else if (vditor.currentMode === 'wysiwyg') {
		return vditor.lute.VditorDOM2Md(vditor.wysiwyg!.element.innerHTML);
	} else if (vditor.currentMode === 'ir') {
		return vditor.lute.VditorIRDOM2Md(vditor.ir!.element.innerHTML);
	}
	return '';
};
