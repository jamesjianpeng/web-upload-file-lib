export namespace IUploader {
   export interface Options extends DomInputOptions, BOMXhrOptions, ShardOptions {
    before: (file: IFile[], otherArg?: any) => Promise<boolean>
    progress?: (arg: any, otherArg?: any) => void
    response: (data: IXMLHttpRequest, otherArg?: any) => void
  }

  export interface DomInputOptions {
    // trigger el
    el?: HTMLElement | null
    id?: string

    // input attribute
    inputEl?: HTMLInputElement | null
    tag: string,
    style: string,
    inputProps?: {
      type?: 'file',
      id?: string,
      multiple?: boolean
    },
    inputEventListener?: ((e: Event) => void) | null
    triggerEventListener?: ((e: MouseEvent) => void) | null
  }
  export interface BOMXhrOptions extends ShardOptions {
    action: string
  }

  export interface ShardOptions {
    oneSlice?: number
  }

  export interface Response {
    msg: string,
    code: number
  }

  export interface Meta {
    width?: string
    height?: string
    proportion?: string
  }

  export interface ImageMeta extends Meta {}
  export interface VideoMeta extends Meta {}

  export interface IFile {
    file: File
    meta: IUploader.ImageMeta | IUploader.VideoMeta | any
  }
  export interface ShardFormData {
    name: string
    formDatas: Blob[]
  }

  export interface IXMLHttpRequest {
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
