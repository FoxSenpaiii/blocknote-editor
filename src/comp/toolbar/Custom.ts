import { Constants } from '$const';
import { getEventName } from '$util/compatibility';
import { MenuItem } from './MenuItem';
import { IMenuItem } from '$type/toolbar';
import { IEditor } from '$type/index';

export class Custom extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);
		this.element.children[0].innerHTML = menuItem.icon!;
		//@ts-ignore
		this.element.children[0].addEventListener(getEventName(), (event: Event & { currentTarget: HTMLElement }) => {
			event.preventDefault();
			if (event.currentTarget.classList.contains(Constants.CLASS_MENU_DISABLED)) {
				return;
			}
			menuItem.click!(event, vditor);
		});
	}
}
