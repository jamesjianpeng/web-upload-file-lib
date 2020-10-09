import { IUploader } from "../interface";
import { uploadFormData } from "./BomXhr";
import {
    getImageSize,
    getVideoSize,
    isFileImage,
    getFileMeta,
} from "../helper";
import { DomInput } from "./DomInput";
export class Uploader extends DomInput {
    public readonly options: IUploader.Options;

    static getImageSize = getImageSize;
    static getVideoSize = getVideoSize;
    static isFileImage = isFileImage;
    static getFileMeta = getFileMeta;
    static uploadFormData = uploadFormData;

    constructor(opts: IUploader.Options) {
        super(opts);
        this.options = { ...opts };

        this.mountedInputEvent(this.uploadEvent.bind(this));
    }

    private async uploadEvent(e: any) {
        const files: File[] = Array.from(e.target?.files || []);

        const isGono = await this.before(files);
        if (isGono) {
            // xhr 上传
            const res: any = await Uploader.uploadFormData(
                this.options.action,
                files
            );
            this.response(res);
        }
    }

    /**
     * @description 获取 files 对他们进行一些处理，在 before 里用于判断尺寸
     * @param files
     * @param otherArg
     */
    public async before(files: File[], otherArg?: any): Promise<boolean> {
        const promiseAll = files.map(
            async (file: File): Promise<IUploader.IFile> => {
                const meta = await Uploader.getFileMeta(file);
                return { file, meta };
            }
        );
        const filesRes: IUploader.IFile[] = await Promise.all(promiseAll);
        return await this.options.before(filesRes);
    }

    /**
     * @description 进度显示，主要针对分片上传
     * @param data
     * @param otherArg
     */
    public async progress(data: any, otherArg?: any) {
        if (typeof this.options.progress === "function") {
            await this.options.progress(data, otherArg);
        }
    }

    /**
     * @description 响应内容
     * @param data
     * @param otherArg
     */
    public async response(data: any, otherArg?: any): Promise<void> {
        return await this.options.response(data);
    }
}
