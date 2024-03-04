import { getMarkdown } from '$comp/markdown/getMarkdown';
import { accessLocalStorage } from '$util/compatibility';
import { IEditor } from '$type/editor';

export const afterRenderEvent = (
	vditor: IEditor,
	options = {
		enableAddUndoStack: true,
		enableHint: false,
		enableInput: true
	}
) => {
	if (options.enableHint) {
		vditor.hint.render(vditor);
	}
	clearTimeout(vditor.wysiwyg!.afterRenderTimeoutId);
	vditor.wysiwyg!.afterRenderTimeoutId = window.setTimeout(() => {
		if (vditor.wysiwyg!.composingLock) {
			return;
		}
		const text = getMarkdown(vditor);
		if (typeof vditor.options.input === 'function' && options.enableInput) {
			vditor.options.input(text);
		}

		if (vditor.options.counter?.enable) {
			vditor.counter?.render(vditor, text);
		}

		if (vditor.options.cache?.enable && accessLocalStorage()) {
			localStorage.setItem(vditor.options.cache.id!, text);
			if (vditor.options.cache?.after) {
				vditor.options.cache.after(text);
			}
		}

		if (vditor.devtools) {
			vditor.devtools.renderEchart(vditor);
		}

		if (options.enableAddUndoStack) {
			vditor.undo?.addToUndoStack(vditor);
		}
	}, vditor.options.undoDelay);
};
