import { IUploader } from './interface'
import { request } from './xhr'
export class Uploader {

  public readonly options: IUploader.Options
  public readonly inputEl: HTMLInputElement | null
  public readonly eventListener: (e: any) => void

  constructor(opts: IUploader.Options) {
    this.options = opts
    this.inputEl = this.createInput(`Uploader-${new Date().getTime()}`)

    this.eventListener = this.addEvent(opts.before)
    this.inputEl.addEventListener('change', this.eventListener)

    this.options.el = this.options.el || document.querySelector(`#${this.options.id}`) as HTMLElement
    this.options.el.addEventListener('click', () => {
      this.inputEl!.click()
    })
  }

  public async before (file: File, meta: IUploader.Meta): Promise<boolean> {
    const res = true
    return Promise.resolve(res)
  }

  public async success (data: IUploader.Response): Promise<void> {
    console.log(data)
  }

  protected getImageSize (file: File): Promise<IUploader.ImageMeta> {
    return Promise.resolve({})
  }

  protected getVideoSize (file: File): Promise<IUploader.VideoMeta> {
    return Promise.resolve({})
  }

  async upload (files: File[]) {
    let formData = new FormData()
    files.map((file, index) => {
      formData.append(index.toString(), file)
    })
    const res = await request({
      type: 'POST',
      url: this.options.action,
      data: formData
    })
    console.log(res)
    return res
  }

  protected uploadAllSlice (file: File) {

  }

  protected addEvent (cb): ((e: MouseEvent) => void) {
    return async (e: any) => {
        const files: File[] = Array.from(e.target.files)
        const isGono = await cb(files)
        console.log(isGono)
        if (isGono) {
            // xhr 上传
            console.log('upload')
            if (false) {
              // this.uploadAllSlice(files)
            } else {
              this.upload(files)
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
