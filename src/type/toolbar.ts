import { IEditor } from '$type';
export interface IMenuItem {
	name: string;
	icon?: string;
	className?: string;
	tip?: string;
	hotkey?: string;
	suffix?: string;
	prefix?: string;
	tipPosition?: string;
	toolbar?: Array<string | IMenuItem>;
	level?: number;

	click?(event: Event, vditor: IEditor): void;
}

export interface IToolbarConfig {
	hide?: boolean;
	pin?: boolean;
}
