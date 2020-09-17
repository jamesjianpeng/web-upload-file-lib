import { IUploader } from '../interface'
import { uploadFormData } from './xhr'
import { getImageSize, getVideoSize } from '../helper'
import { DomInput } from './DomInput'
export class Uploader extends DomInput {

  public readonly options: IUploader.Options


  static getImageSize = getImageSize
  static getVideoSize = getVideoSize

  constructor(opts: IUploader.Options) {
    super({ el: opts.el, id: opts.id })
    this.options = opts
    this.mountedEvent(this.inputEvent.bind(this))
  }

  private async inputEvent (e: any) {
        const files: File[] = Array.from(e.target?.files || [])
        console.log(this)
        const isGono = await this.before(files)
        console.log(isGono)
        if (isGono) {
            // xhr 上传
            if (false) {
              // this.uploadAllSlice(files)
            } else {
              const res: any = await this.uploadFormData(files)
              this.response(res)
            }
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
   * @description 响应内容
   * @param data 
   * @param otherArg 
   */
  public async response (data: any, otherArg?: any): Promise<void> {
    return await this.options.response(data)
  }

  async uploadFormData (files: File[]) {
    let formData = new FormData()
    files.map((file, index) => {
      formData.append(index.toString(), file)
    })
     return await uploadFormData(this.options.action, formData)
  }

  protected uploadAllSlice (file: File) {

  }
}
