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

export interface IUploaderClass {
  options: IUploader.Options
  inputEl: HTMLInputElement | null
  before: (file: File, meta: IUploader.Meta) => Promise<boolean>
  success: (data: IUploader.Response) => Promise<void>
  getImageSize: (file: File) => Promise<IUploader.ImageMeta>
  getVideoSize: (file: File) => Promise<IUploader.VideoMeta>
  createInput: (id: string | 'Uploader') => HTMLInputElement
  createHiddenInput: (id: string | 'Uploader') => HTMLInputElement
}
