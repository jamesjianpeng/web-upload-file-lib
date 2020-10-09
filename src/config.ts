const MIME_TYPE = {
    css: "text/css",
    gif: "image/gif",
    html: "text/html",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    js: "text/javascript",
    json: "application/json",
    pdf: "application/pdf",
    png: "image/png",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    tiff: "image/tiff",
    txt: "text/plain",
    wav: "audio/x-wav",
    wma: "audio/x-ms-wma",
    wmv: "video/x-ms-wmv",
    xml: "text/xml",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    doc: "application/msword",
    docx:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    mp4: "video/mp4",
};

const MIME_TYPE_EXCHANGE = (() => {
    const res: Record<string, string> = {};
    const keys = Object.keys(MIME_TYPE);
    keys.map((key) => {
        res[MIME_TYPE[key]] = key;
    });
    return res;
})();

/**
 * @description 获取文件 type
 * @param type
 */
const getFileType = <T extends string, U extends string>(type: T): U => {
    let res: U = "" as U;
    if (typeof MIME_TYPE_EXCHANGE[type] === "string") {
        res = MIME_TYPE_EXCHANGE[type] as U;
    }
    return res;
};

const _createInputProps = () => ({
    type: "file",
    id: `web-upload-file-lib_input-props-v0.0.4_${new Date().getTime()}`,
    multiple: false,
});

const TAG = "input";
const STYLE = "display: none;";
const CHANGE = "change";
const CLICK = "click";

export {
    MIME_TYPE,
    MIME_TYPE_EXCHANGE,
    TAG,
    STYLE,
    CHANGE,
    CLICK,
    _createInputProps,
    getFileType
};
