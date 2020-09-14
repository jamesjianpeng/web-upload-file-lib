import { IUploader } from '../interface';
export declare class Uploader {
    readonly options: IUploader.Options;
    readonly inputEl: HTMLInputElement | null;
    readonly eventListener: (e: any) => void;
    static getImageSize: <T, U>(file: T) => Promise<U>;
    static getVideoSize: <T, U>(file: T) => Promise<U>;
    constructor(opts: IUploader.Options);
    protected triggerEvent(): void;
    before(files: File[], otherArg?: any): Promise<boolean>;
    response(data: any, otherArg?: any): Promise<void>;
    uploadFormData(files: File[]): Promise<unknown>;
    protected uploadAllSlice(file: File): void;
    protected addEvent(): ((e: MouseEvent) => void);
    protected createInput(id?: string): HTMLInputElement;
    protected createHiddenInput(id: any): HTMLInputElement;
}
