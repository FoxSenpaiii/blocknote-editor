import { IObject } from '$type';

export interface IUpload {
	url?: string;
	max?: number;
	linkToImgUrl?: string;
	token?: string;
	accept?: string;
	withCredentials?: boolean;
	headers?: IObject;
	extraData?: { [key: string]: string | Blob };
	multiple?: boolean;
	fieldName?: string;

	setHeaders?(): IObject;
	success?(editor: HTMLPreElement, msg: string): void;
	error?(msg: string): void;
	filename?(name: string): string;
	validate?(files: File[]): string | boolean;
	handler?(files: File[]): string | null | Promise<string> | Promise<null>;
	format?(files: File[], responseText: string): string;
	linkToImgFormat?(responseText: string): string;
	file?(files: File[]): File[] | Promise<File[]>;
	linkToImgCallback?(responseText: string): void;
}
