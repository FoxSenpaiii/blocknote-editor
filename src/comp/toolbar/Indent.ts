import { Constants } from '$const';
import { getEventName } from '$util/compatibility';
import { listIndent } from '$util/fixBrowserBehavior';
import { hasClosestByMatchTag } from '$util/hasClosest';
import { getEditorRange } from '$util/selection';
import { MenuItem } from './MenuItem';
import { IEditor } from '$type/index';
import { IMenuItem } from '$type/index';

export class Indent extends MenuItem {
	constructor(vditor: IEditor, menuItem: IMenuItem) {
		super(vditor, menuItem);

		this.element.children[0].addEventListener(getEventName(), (event) => {
			event.preventDefault();
			if (
				this.element.firstElementChild?.classList.contains(Constants.CLASS_MENU_DISABLED) ||
				vditor.currentMode === 'sv'
			) {
				return;
			}
			const range = getEditorRange(vditor);
			const liElement = hasClosestByMatchTag(range.startContainer, 'LI');
			if (liElement) {
				listIndent(vditor, liElement, range);
			}
		});
	}
}
