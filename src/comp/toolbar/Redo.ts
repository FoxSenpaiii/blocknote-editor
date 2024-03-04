import { Constants } from '$const';
import { getEventName } from '$util/compatibility';
import { MenuItem } from './MenuItem';
import { disableToolbar } from './setToolbar';
import { IMenuItem } from '$type/toolbar';
import { IEditor } from '$type/index';

export class Redo extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);
		disableToolbar({ redo: this.element }, ['redo']);
		this.element.children[0].addEventListener(getEventName(), (event) => {
			event.preventDefault();
			if (this.element.firstElementChild?.classList.contains(Constants.CLASS_MENU_DISABLED)) {
				return;
			}
			vditor.undo?.redo(vditor);
		});
	}
}
