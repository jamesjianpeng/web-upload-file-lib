import { getFileType } from "./config";
import { IUploader } from "./interface";
/**
 * @description 获取图片的元信息
 * @param file
 */
const getImageSize = (
    file: File
): Promise<IUploader.ImageMeta> => {
    const res: any = { width: "", height: "" };
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (
            this: FileReader,
            theFile: ProgressEvent<FileReader>
        ) {
            const image = new Image();
            image.src = theFile.target?.result as string;
            image.onload = function (this: any, ev: Event) {
                res.width = this.width;
                res.height = this.height;
                res.scale = getScale(res.width, res.height);
                resolve(res);
            };
        };
    });
    return Promise.resolve(res);
};

/**
 * @description 获取视频的元信息
 * @param file
 */
const getVideoSize = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const res: any = { width: "", height: "" };
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const video = document.createElement("video");
            const dataUrl = e.target?.result;
            video.id = "upload-video";
            video.style.display = "none";
            document.body.appendChild(video);
            video.src = typeof dataUrl === "string" ? dataUrl : "";
            video.addEventListener("loadedmetadata", () => {
                res.width =
                    typeof video.videoWidth === "string"
                        ? video.videoWidth
                        : "";
                res.height =
                    typeof video.videoHeight === "string"
                        ? video.videoHeight
                        : "";
                document.body.removeChild(video);
                res.scale = getScale(res.width, res.height);
                resolve(res);
            });
            video.addEventListener("error", () => {
                resolve({});
            });
        };
        reader.readAsDataURL(file);
    });
};

/**
 * @description 获取长宽比
 * @param width
 * @param height
 */
const getScale = (width: number, height: number): string => {
    const widthLen = width.toString().length;
    const heightLen = height.toString().length;
    const min = Math.min(widthLen, heightLen);
    const baseNum = [0, 1, 10, 100, 1000];
    const item = baseNum[min];
    const widthCeil = Math.ceil(width / item);
    const heightCeil = Math.ceil(height / item);
    return `${widthCeil}:${heightCeil}`;
};

/**
 * @description 比较文件的 type
 * @param type
 * @param expectType
 */
const compareFileType = (
    type: string,
    expectType: string
): boolean => {
    return getFileType(type) === expectType;
};

/**
 * @description 判断是否为图片格式
 * @param type
 */
const isFileImage = (type: string): boolean => {
    let isImage = false;
    isImage =
        compareFileType(type, "png") ||
        compareFileType(type, "jpg") ||
        compareFileType(type, "jpeg") ||
        compareFileType(type, "gif") ||
        compareFileType(type, "svg") ||
        compareFileType(type, "tiff");
    return isImage;
};

const getFileMeta = async (file: File): Promise<any> => {
    let meta: any = {};
    if (isFileImage(file.type)) {
        meta = await getImageSize(file);
    }
    return Promise.resolve(meta);
};

export {
    getImageSize,
    getVideoSize,
    getFileType,
    compareFileType,
    isFileImage,
    getFileMeta
};
