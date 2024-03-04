import { Constants } from '$const';
import { setPadding } from '../ui/initUI';
import { getEventName } from '$util/compatibility';
import { MenuItem } from './MenuItem';
import { IEditor } from '$type/index';
import { IMenuItem } from '$type/index';

export class Devtools extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);
		//@ts-ignore
		this.element.firstElementChild.addEventListener(getEventName(), (event) => {
			const btnElement = this.element.firstElementChild;
			if (btnElement?.classList.contains(Constants.CLASS_MENU_DISABLED)) {
				return;
			}

			event.preventDefault();
			if (btnElement?.classList.contains('vditor-menu--current')) {
				btnElement?.classList.remove('vditor-menu--current');
				vditor.devtools!.element.style.display = 'none';
				setPadding(vditor);
			} else {
				btnElement?.classList.add('vditor-menu--current');
				vditor.devtools!.element.style.display = 'block';
				setPadding(vditor);
				vditor.devtools?.renderEchart(vditor);
			}
		});
	}
}
