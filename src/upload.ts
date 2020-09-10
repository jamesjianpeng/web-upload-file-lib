import { IUploader } from './interface'

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
      this.options.el!.click()
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

  protected upload (file: File) {
    console.log(file)
  }

  protected uploadAllSlice (file: File) {

  }

  protected addEvent (cb): ((e: MouseEvent) => void) {
    return (e: any) => {
        console.log(e)
        const isGono = cb(e.target)
        if (isGono) {
            // xhr 上传
            const file = e.target.files[0]
            if (false) {
              this.uploadAllSlice(file)
            } else {
              this.upload(file)
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
    input.style.display = 'none'
    document.body.appendChild(input)
    return input
  }
}
