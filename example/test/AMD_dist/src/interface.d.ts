export declare namespace IUploader {
    interface Options {
        el?: HTMLElement;
        id?: string;
        action: string;
        before: (file: File) => Promise<boolean>;
        success: (data: Response) => void;
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
}
