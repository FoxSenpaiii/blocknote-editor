import { IObject } from '$type';

export interface IHintData {
	html: string;
	value: string;
}

export interface IHintExtend {
	key: string;

	hint?(value: string): IHintData[] | Promise<IHintData[]>;
}

export interface IHint {
	parse?: boolean;
	emojiTail?: string;
	delay?: number;
	emoji?: IObject;
	emojiPath?: string;
	extend?: IHintExtend[];
}
