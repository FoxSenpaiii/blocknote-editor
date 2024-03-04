import { Constants } from '$const';
import { setPreviewMode } from '../ui/setPreviewMode';
import { getEventName } from '$util/compatibility';
import { MenuItem } from './MenuItem';
import { IEditor } from '$type/index';
import { IMenuItem } from '$type/index';

export class Both extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);
		if (vditor.options.preview?.mode === 'both') {
			this.element.children[0].classList.add('vditor-menu--current');
		}
		this.element.children[0].addEventListener(getEventName(), (event) => {
			const btnElement = this.element.firstElementChild;
			if (btnElement?.classList.contains(Constants.CLASS_MENU_DISABLED)) {
				return;
			}
			event.preventDefault();
			if (vditor.currentMode !== 'sv') {
				return;
			}
			if (vditor.options.preview?.mode === 'both') {
				setPreviewMode('editor', vditor);
			} else {
				setPreviewMode('both', vditor);
			}
		});
	}
}
