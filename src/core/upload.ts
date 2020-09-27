import { IUploader } from '../interface'
import { uploadFormData } from './xhr'
import { getImageSize, getVideoSize } from '../helper'
import { DomInput } from './DomInput'
export class Uploader extends DomInput {

  public readonly options: IUploader.Options

  static getImageSize = getImageSize
  static getVideoSize = getVideoSize

  constructor(opts: IUploader.Options) {
    super(opts)
    this.options = { ...opts }
    this.mountedInputEvent(this.inputEvent.bind(this))
  }

  private async inputEvent (e: any) {
        const files: File[] = Array.from(e.target?.files || [])
        const isGono = await this.before(files)
        if (isGono) {
            // xhr 上传
            const oneSlice = this.options.oneSlice
            const res: any = await this.uploadFormData(files)
            this.response(res)
        }
  }

  /**
   * @description 获取 files 对他们进行一些处理，在 before 里用于判断尺寸
   * @param files
   * @param otherArg
   */
  public async before (files: File[], otherArg?: any): Promise<boolean> {
    const promiseAll = files.map(async (file: File): Promise<IUploader.IFile> => {
      const meta = await Uploader.getImageSize<File, IUploader.ImageMeta>(file)
      return { file, meta }
    })
    const filesRes: IUploader.IFile[] = await Promise.all(promiseAll)
    return await this.options.before(filesRes)
  }

  /**
   * @description 进度显示，主要针对分片上传
   * @param data
   * @param otherArg
   */
  public async progress (data: any, otherArg?: any) {
    if (typeof this.options.progress === 'function') {
      await this.options.progress(data, otherArg)
    }
  }


  /**
   * @description 响应内容
   * @param data
   * @param otherArg
   */
  public async response (data: any, otherArg?: any): Promise<void> {
    return await this.options.response(data)
  }

  /**
   * @description 单个文件上传
   */
  async uploadFormData (files: File[]) {
    const formData = new FormData()
    files.map((file, index) => {
      formData.append(index.toString(), file)
    })
     return await uploadFormData(this.options.action, formData)
  }
}
