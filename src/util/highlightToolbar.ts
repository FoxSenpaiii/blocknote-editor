import { highlightToolbarIR } from '$comp/ir/highlightToolbarIR';
import { highlightToolbarWYSIWYG } from '$comp/wysiwyg/highlightToolbarWYSIWYG';
import { IEditor } from '$type/editor';

export const highlightToolbar = (vditor: IEditor) => {
	if (vditor.currentMode === 'wysiwyg') {
		highlightToolbarWYSIWYG(vditor);
	} else if (vditor.currentMode === 'ir') {
		highlightToolbarIR(vditor);
	}
};
