import { IUploader } from '../interface';
export declare class DomInput {
    protected readonly DomInputoptions: IUploader.DomInputOptions;
    constructor(DomInputoptions: IUploader.DomInputOptions);
    protected addTriggerEvent(): void;
    protected mountedInputEvent(cb: (e: any) => void): void;
    removeTriggerEvent(): void;
    protected addInputEvent(cb: (e: any) => void): ((e: Event) => void);
    protected createInput(domInputoptions: IUploader.DomInputOptions): HTMLInputElement;
    protected createHiddenInput(DomInputOptions: IUploader.DomInputOptions): HTMLInputElement;
}
