const MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "mp4": "video/mp4"
};
const _createInputProps = () => ({
    type: 'file',
    id: `web-upload-file-lib_input-props-v0.0.4_${new Date().getTime()}`,
    multiple: false
});
const TAG = 'input';
const STYLE = 'display: none;';
const CHANGE = 'change';
const CLICK = 'click';
export { MIME_TYPE, TAG, STYLE, CHANGE, CLICK, _createInputProps, };
