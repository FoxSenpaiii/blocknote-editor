import { IEditor } from '$type';
export const setTheme = (vditor: IEditor) => {
	if (vditor.options.theme === 'dark') {
		vditor.element.classList.add('vditor--dark');
	} else {
		vditor.element.classList.remove('vditor--dark');
	}
};
