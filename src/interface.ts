export namespace IUploader {
   export interface Options {
    el?: HTMLElement
    id?: string
    action: string,
    before: (file: File) => Promise<boolean>
    success: (data: Response) => void
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
}
