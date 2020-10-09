import { MIME_TYPE_EXCHANGE } from './config';
/**
 * @description 获取图片的元信息
 * @param file
 */
const getImageSize = <T extends File, U extends unknown>(
    file: T
): Promise<U> => {
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
const getVideoSize = <T, U>(file: T): Promise<U> => {
    const res: U = {} as U;
    return Promise.resolve(res);
};

const getFileType = <T extends string, U extends string>(type: T): U => {
    let res: U = '' as U;
    if (typeof MIME_TYPE_EXCHANGE[type] === 'string') {
        res = MIME_TYPE_EXCHANGE[type] as U;
    }
    return res;
};

const compareFileType = <T extends string, U extends boolean>(type: T, expectType: T): U => {
    return (getFileType(type) === expectType) as U;
};

const isFileImage = (type: string): boolean => {
    let isImage = false;
    isImage = compareFileType(type, 'png') || compareFileType(type, 'jpg') || compareFileType(type, 'jpeg');
    return isImage;
};

export { getImageSize, getVideoSize, getFileType, compareFileType, isFileImage };
