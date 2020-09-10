import { IUploader } from './interface';
export declare class Uploader {
    readonly options: IUploader.Options;
    readonly inputEl: HTMLInputElement | null;
    readonly eventListener: (e: any) => void;
    constructor(opts: IUploader.Options);
    before(file: File, meta: IUploader.Meta): Promise<boolean>;
    success(data: IUploader.Response): Promise<void>;
    protected getImageSize(file: File): Promise<IUploader.ImageMeta>;
    protected getVideoSize(file: File): Promise<IUploader.VideoMeta>;
    protected upload(file: File): void;
    protected uploadAllSlice(file: File): void;
    protected addEvent(cb: any): ((e: MouseEvent) => void);
    protected createInput(id?: string): HTMLInputElement;
    protected createHiddenInput(id: any): HTMLInputElement;
}
