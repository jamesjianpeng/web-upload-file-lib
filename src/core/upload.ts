import { IUploader } from '../interface'
import { uploadFormData } from './xhr'
import { getImageSize, getVideoSize } from '../helper'
import { DomInput } from './DomInput'
import { slice } from './shard'
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
        const isGono = await this.before(files)
        if (isGono) {
            // xhr 上传
            const oneSlice = this.options.oneSlice
            console.log(oneSlice)
            if (files.length === 1 && oneSlice && files[0].size > oneSlice) {
              // this.uploadAllSlice(files)
              await this.shardFileUpload(files[0])
            } else {
              const res: any = await this.uploadFormData(files)
              this.response(res)
            }
        }
  }

  /**
   * @description 分片上传
   * @param file
   */
  async shardFileUpload (file: File) {
    const uploadFormDatas = slice(file, this.options)
    const items =await this.uploadShardFile(uploadFormDatas)
    console.log(items)
  }

  /**
   * @description 测试上传
   * @param uploadFormDatas
   */
  async uploadShardFile (uploadFormDatas) {
    const uploadIndex = 0
    const loopUpload = async (index: number): Promise<any> => {
      const item: any = uploadFormDatas.formDatas[index]
      const res = await uploadFormData(this.options.action, item)
      await this.progress(res, { uploadFormDatas, index })
      const nextUploadIndex = index + 1
      if (uploadFormDatas.formDatas.length > nextUploadIndex) {
        return await loopUpload(nextUploadIndex)
      } else {
        return Promise.resolve(null)
      }
    }
    await loopUpload(uploadIndex)
  }

  /**
   * @description 在上传完所有的分片之后，在进行调用合并所有链接处理方法之前的处理程序
   */
  async mergeShardFileBefore () {

  }

  /**
   * @description 测试上传
   * @param uploadFormDatas
   */
  async mergeShardFile (urls: string[]) {
    console.log(urls)
  }

  /**
   * @description 合并所有的分片链接的结果
   */
  async mergeShardFileResponse () {

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
  public async progress (data: any, otherArg?: any): Promise<any> {
    return await this.options.progress(data, otherArg)
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
    let formData = new FormData()
    files.map((file, index) => {
      formData.append(index.toString(), file)
    })
     return await uploadFormData(this.options.action, formData)
  }

  protected uploadAllSlice (file: File) {

  }
}
