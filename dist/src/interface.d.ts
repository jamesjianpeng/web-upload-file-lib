export declare namespace IUploader {
    interface Options extends DomInputOptions, BOMXhrOptions, ShardOptions {
        before: (file: IFile[], otherArg?: any) => Promise<boolean>;
        progress: (arg: any, otherArg?: any) => Promise<boolean>;
        response: (data: IXMLHttpRequest, otherArg?: any) => void;
    }
    interface DomInputOptions {
        el?: HTMLElement | null;
        id?: string;
        inputEl?: HTMLInputElement | null;
        tag: string;
        style: string;
        inputProps?: {
            type?: 'file';
            id?: string;
            multiple?: boolean;
        };
        inputEventListener?: ((e: Event) => void) | null;
        triggerEventListener?: ((e: MouseEvent) => void) | null;
    }
    interface BOMXhrOptions extends ShardOptions {
        action: string;
    }
    interface ShardOptions {
        oneSlice?: number;
    }
    interface Response {
        msg: string;
        code: number;
    }
    interface Meta {
        width?: string;
        height?: string;
        proportion?: string;
    }
    interface ImageMeta extends Meta {
    }
    interface VideoMeta extends Meta {
    }
    interface IFile {
        file: File;
        meta: IUploader.ImageMeta | IUploader.VideoMeta | any;
    }
    interface ShardFormData {
        name: string;
        formDatas: Blob[];
    }
    interface IXMLHttpRequest {
        msCaching: string;
        onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null;
        readonly readyState: number;
        readonly response: any;
        readonly responseText: string;
        responseType: XMLHttpRequestResponseType;
        readonly responseURL: string;
        readonly responseXML: Document | null;
        readonly status: number;
        readonly statusText: string;
        timeout: number;
        readonly upload: XMLHttpRequestUpload;
        withCredentials: boolean;
        abort(): void;
        getAllResponseHeaders(): string;
        getResponseHeader(header: string): string | null;
        msCachingEnabled(): boolean;
        open(method: string, url: string, async?: boolean, user?: string | null, password?: string | null): void;
        overrideMimeType(mime: string): void;
        send(data?: any): void;
        setRequestHeader(header: string, value: string): void;
        readonly DONE: number;
        readonly HEADERS_RECEIVED: number;
        readonly LOADING: number;
        readonly OPENED: number;
        readonly UNSENT: number;
        addEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
}
