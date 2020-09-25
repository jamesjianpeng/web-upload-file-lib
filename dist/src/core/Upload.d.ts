import { IUploader } from '../interface';
import { DomInput } from './DomInput';
export declare class Uploader extends DomInput {
    readonly options: IUploader.Options;
    static getImageSize: <T extends File, U extends unknown>(file: T) => Promise<U>;
    static getVideoSize: <T, U>(file: T) => Promise<U>;
    constructor(opts: IUploader.Options);
    private inputEvent;
    before(files: File[], otherArg?: any): Promise<boolean>;
    progress(data: any, otherArg?: any): Promise<any>;
    response(data: any, otherArg?: any): Promise<void>;
    uploadFormData(files: File[]): Promise<unknown>;
}
