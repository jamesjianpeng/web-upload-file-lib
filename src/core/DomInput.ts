import { IUploader } from '../interface'

export class DomInput {
  protected readonly DomInputoptions: IUploader.DomInputOptions
  
  constructor(DomInputoptions) {
    this.DomInputoptions = DomInputoptions
    this.DomInputoptions.inputEl = this.createInput(`Uploader-${new Date().getTime()}`)

    this.triggerEvent()
  }

  /**
   * @description 触发上传组件的元素，添加 click 事件
   */
  protected triggerEvent () {
    this.DomInputoptions.el = this.DomInputoptions.el || document.querySelector(`#${this.DomInputoptions.id}`) as HTMLElement
    this.DomInputoptions.triggerEventListener = (e: MouseEvent) => {
      this.DomInputoptions.inputEl!.click()
    }
    this.DomInputoptions.el.addEventListener('click', this.DomInputoptions.triggerEventListener)
  }

  /**
   * @description input 挂载 change 事件的时候，需要插入业务处理程序，需要传入一个回调函数，这个函数的调用时机是在 DOMInput 这个类初始化完成之后 upload 子类进行调用 
   * @param cb 
   */
  protected mountedEvent (cb: (e: any) => void) {
    this.DomInputoptions.inputEventListener = this.addEvent(cb)
    this.DomInputoptions.inputEl?.addEventListener('change', this.DomInputoptions.inputEventListener)
  }

  protected addEvent (cb: (e: any) => void): ((e: Event) => void) {
    return async (e: any) => {
        await cb(e)
        this.DomInputoptions.inputEl!.value = ''
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