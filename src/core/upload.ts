import { IUploader } from '../interface'
import { uploadFormData } from './xhr'
import { getImageSize, getVideoSize } from '../helper'
export class Uploader {

  public readonly options: IUploader.Options
  public readonly inputEl: HTMLInputElement | null
  public readonly eventListener: (e: any) => void

  static getImageSize = getImageSize
  static getVideoSize = getVideoSize

  constructor(opts: IUploader.Options) {
    this.options = opts
    this.inputEl = this.createInput(`Uploader-${new Date().getTime()}`)

    this.eventListener = this.addEvent()
    this.inputEl.addEventListener('change', this.eventListener)

    this.triggerEvent()
  }

  /**
   * @description 触发上传组件的元素，添加 click 事件
   */
  protected triggerEvent () {
    this.options.el = this.options.el || document.querySelector(`#${this.options.id}`) as HTMLElement
    this.options.el.addEventListener('click', () => {
      this.inputEl!.click()
    })
  }

  public async before (files: File[], otherArg?: any): Promise<boolean> {
    return await this.options.before(files)
  }

  public async response (data: any, otherArg?: any): Promise<void> {
    return await this.options.response(data)
  }

  async uploadFormData (files: File[]) {
     return await uploadFormData(this.options.action, files)
  }

  protected uploadAllSlice (file: File) {

  }

  protected addEvent (): ((e: MouseEvent) => void) {
    return async (e: any) => {
        const files: File[] = Array.from(e.target.files)
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
        if (this.inputEl) this.inputEl.value = ''
    }
  }

  /**
   * @description 创建一个隐藏的 input
   * @param id
   */
  protected createInput (id = 'Uploader'): HTMLInputElement {
    let el: HTMLInputElement = document.getElementById(`#${id}`) as HTMLInputElement
    if (el) {
      el = el instanceof HTMLInputElement ? el : this.createHiddenInput(id)
    } else {
      el = this.createHiddenInput(id)
    }
    return el
  }

  /**
   * @description 创建隐藏的 input 的具体方法
   * @param id
   */
  protected createHiddenInput (id): HTMLInputElement {
    const input = document.createElement('input')
    input.id = id
    input.type = 'file'
    input.style.display = 'none'
    document.body.appendChild(input)
    return input
  }
}
