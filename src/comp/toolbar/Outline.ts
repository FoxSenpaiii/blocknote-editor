import { Constants } from '$const';
import { getEventName } from '$util/compatibility';
import { MenuItem } from './MenuItem';
import { IMenuItem } from '$type/toolbar';
import { IEditor } from '$type/index';

export class Outline extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);
		if (vditor.options.outline) {
			this.element.firstElementChild?.classList.add('vditor-menu--current');
		}
		this.element.children[0].addEventListener(getEventName(), (event) => {
			event.preventDefault();
			const btnElement = vditor.toolbar?.elements?.outline.firstElementChild;
			if (btnElement?.classList.contains(Constants.CLASS_MENU_DISABLED)) {
				return;
			}
			vditor.options.outline!.enable =
				!this.element.firstElementChild?.classList.contains('vditor-menu--current');
			vditor.outline.toggle(vditor, vditor.options.outline?.enable);
		});
	}
}
