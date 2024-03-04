import { Constants } from '$const';
import { getEventName } from '$util/compatibility';
import { MenuItem } from './MenuItem';
import { disableToolbar } from './setToolbar';
import { IMenuItem } from '$type/toolbar';
import { IEditor } from '$type/index';

export class Undo extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);
		disableToolbar({ undo: this.element }, ['undo']);
		this.element.children[0].addEventListener(getEventName(), (event) => {
			event.preventDefault();
			if (this.element.firstElementChild?.classList.contains(Constants.CLASS_MENU_DISABLED)) {
				return;
			}
			vditor.undo?.undo(vditor);
		});
	}
}
