import { IEditor } from '$type';
import { getEditorRange, setSelectionFocus } from '$util/selection';
import { getElement } from './getElement';
import { setHeaders } from './setHeaders';

class Upload {
	public element: HTMLElement;
	public isUploading: boolean;
	public range?: Range;

	constructor() {
		this.isUploading = false;
		this.element = document.createElement('div');
		this.element.className = 'vditor-upload';
	}
}

const validateFile = (vditor: IEditor, files: File[]) => {
	vditor.tip.hide();
	const uploadFileList = [];
	let errorTip = '';
	let uploadingStr = '';

	for (let iMax = files.length, i = 0; i < iMax; i++) {
		const file = files[i];
		let validate = true;

		if (!file.name) {
			//@ts-ignore
			errorTip += `<li>${window.VditorI18n.nameEmpty}</li>`;
			validate = false;
		}

		if (file.size > vditor.options.upload?.max!) {
			//@ts-ignore
			errorTip += `<li>${file.name} ${window.VditorI18n.over} ${vditor.options.upload?.max! / 1024 / 1024}M</li>`;
			validate = false;
		}

		const lastIndex = file.name.lastIndexOf('.');
		const fileExt = file.name.substr(lastIndex);
		const filename = vditor.options.upload?.filename!(file.name.substr(0, lastIndex)) + fileExt;

		if (vditor.options.upload?.accept) {
			const isAccept = vditor.options.upload.accept.split(',').some((item) => {
				const type = item.trim();
				if (type.startsWith('.')) {
					if (fileExt.toLowerCase() === type.toLowerCase()) {
						return true;
					}
				} else if (file.type.split('/')[0] === type.split('/')[0]) {
					return true;
				}
				return false;
			});

			if (!isAccept) {
				//@ts-ignore
				errorTip += `<li>${file.name} ${window.VditorI18n.fileTypeError}</li>`;
				validate = false;
			}
		}

		if (validate) {
			uploadFileList.push(file);
			//@ts-ignore
			uploadingStr += `<li>${filename} ${window.VditorI18n.uploading}</li>`;
		}
	}

	vditor.tip.show(`<ul>${errorTip}${uploadingStr}</ul>`);

	return uploadFileList;
};

const genUploadedLabel = (responseText: string, vditor: IEditor) => {
	const editorElement = getElement(vditor);
	editorElement?.focus();
	const response = JSON.parse(responseText);
	let errorTip = '';

	if (response.code === 1) {
		errorTip = `${response.msg}`;
	}

	if (response.data.errFiles && response.data.errFiles.length > 0) {
		errorTip = `<ul><li>${errorTip}</li>`;
		response.data.errFiles.forEach((data: string) => {
			const lastIndex = data.lastIndexOf('.');
			const filename = vditor.options.upload?.filename!(data.substr(0, lastIndex)) + data.substr(lastIndex);
			//@ts-ignore
			errorTip += `<li>${filename} ${window.VditorI18n.uploadError}</li>`;
		});
		errorTip += '</ul>';
	}

	if (errorTip) {
		vditor.tip.show(errorTip);
	} else {
		vditor.tip.hide();
	}

	let succFileText = '';
	Object.keys(response.data.succMap).forEach((key) => {
		const path = response.data.succMap[key];
		const lastIndex = key.lastIndexOf('.');
		let type = key.substr(lastIndex);
		const filename = vditor.options.upload?.filename!(key.substr(0, lastIndex)) + type;
		type = type.toLowerCase();
		if (type.startsWith('.wav') || type.startsWith('.mp3') || type.startsWith('.ogg')) {
			if (vditor.currentMode === 'wysiwyg') {
				succFileText += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="${path}"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="${path}"></audio></pre></div>\n`;
			} else if (vditor.currentMode === 'ir') {
				succFileText += `<audio controls="controls" src="${path}"></audio>\n`;
			} else {
				succFileText += `[${filename}](${path})\n`;
			}
		} else if (
			type.startsWith('.apng') ||
			type.startsWith('.bmp') ||
			type.startsWith('.gif') ||
			type.startsWith('.ico') ||
			type.startsWith('.cur') ||
			type.startsWith('.jpg') ||
			type.startsWith('.jpeg') ||
			type.startsWith('.jfif') ||
			type.startsWith('.pjp') ||
			type.startsWith('.pjpeg') ||
			type.startsWith('.png') ||
			type.startsWith('.svg') ||
			type.startsWith('.webp')
		) {
			if (vditor.currentMode === 'wysiwyg') {
				succFileText += `<img alt="${filename}" src="${path}">\n`;
			} else {
				succFileText += `![${filename}](${path})\n`;
			}
		} else if (vditor.currentMode === 'wysiwyg') {
			succFileText += `<a href="${path}">${filename}</a>\n`;
		} else {
			succFileText += `[${filename}](${path})\n`;
		}
	});
	setSelectionFocus(vditor.upload!.range);
	document.execCommand('insertHTML', false, succFileText);
	vditor.upload!.range = getSelection()?.getRangeAt(0).cloneRange()!;
};

const uploadFiles = async (
	vditor: IEditor,
	files: FileList | DataTransferItemList | File[],
	element?: HTMLInputElement
) => {
	// FileList | DataTransferItemList | File[] => File[]
	let fileList = [];
	const filesMax = vditor.options.upload?.multiple === true ? files.length : 1;
	for (let i = 0; i < filesMax; i++) {
		let fileItem = files[i];
		if (fileItem instanceof DataTransferItem) {
			fileItem = fileItem.getAsFile()!;
		}
		fileList.push(fileItem);
	}

	if (vditor.options.upload?.handler) {
		const isValidate = await vditor.options.upload?.handler(fileList);
		if (element) {
			element.value = '';
		}
		if (typeof isValidate === 'string') {
			vditor.tip.show(isValidate);
			return;
		}
		return;
	}

	if (!vditor.options.upload?.url || !vditor.upload) {
		if (element) {
			element.value = '';
		}
		vditor.tip.show('please config: options.upload.url');
		return;
	}

	if (vditor.options.upload?.file) {
		fileList = await vditor.options.upload?.file(fileList);
	}

	if (vditor.options.upload?.validate) {
		const isValidate = vditor.options.upload?.validate(fileList);
		if (typeof isValidate === 'string') {
			vditor.tip.show(isValidate);
			return;
		}
	}
	const editorElement = getElement(vditor);

	vditor.upload.range = getEditorRange(vditor);

	const validateResult = validateFile(vditor, fileList);
	if (validateResult.length === 0) {
		if (element) {
			element.value = '';
		}
		return;
	}

	const formData = new FormData();

	const extraData = vditor.options.upload?.extraData;
	for (const key of Object.keys(extraData!)) {
		formData.append(key, extraData![key]);
	}

	for (let i = 0, iMax = validateResult.length; i < iMax; i++) {
		formData.append(vditor.options.upload?.fieldName!, validateResult[i]);
	}

	const xhr = new XMLHttpRequest();
	xhr.open('POST', vditor.options.upload.url);
	if (vditor.options.upload?.token) {
		xhr.setRequestHeader('X-Upload-Token', vditor.options.upload.token);
	}
	if (vditor.options.upload?.withCredentials) {
		xhr.withCredentials = true;
	}
	setHeaders(vditor, xhr);
	vditor.upload.isUploading = true;
	editorElement?.setAttribute('contenteditable', 'false');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			vditor.upload!.isUploading = false;
			editorElement?.setAttribute('contenteditable', 'true');
			if (xhr.status >= 200 && xhr.status < 300) {
				if (vditor.options.upload?.success) {
					vditor.options.upload.success(editorElement!, xhr.responseText);
				} else {
					let responseText = xhr.responseText;
					if (vditor.options.upload?.format) {
						responseText = vditor.options.upload.format(files as File[], xhr.responseText);
					}
					genUploadedLabel(responseText, vditor);
				}
			} else if (vditor.options.upload?.error) {
				vditor.options.upload.error(xhr.responseText);
			} else {
				vditor.tip.show(xhr.responseText);
			}
			if (element) {
				element.value = '';
			}
			vditor.upload!.element.style.display = 'none';
		}
	};
	xhr.upload.onprogress = (event: ProgressEvent) => {
		if (!event.lengthComputable) {
			return;
		}
		const progress = (event.loaded / event.total) * 100;
		vditor.upload!.element.style.display = 'block';
		const progressBar = vditor.upload?.element;
		progressBar!.style.width = progress + '%';
	};
	xhr.send(formData);
};

export { Upload, uploadFiles };
