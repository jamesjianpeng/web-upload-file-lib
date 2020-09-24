import { IUploader } from '../interface'
import { _createInputProps, TAG, STYLE } from '../config'

export class DomInput {
  protected readonly DomInputoptions: IUploader.DomInputOptions
  
  constructor(DomInputoptions: IUploader.DomInputOptions) {
    this.DomInputoptions = DomInputoptions
    this.DomInputoptions.inputProps = Object.assign(_createInputProps, DomInputoptions.inputProps || {})
    this.DomInputoptions.tag = TAG
    this.DomInputoptions.style = STYLE
    this.DomInputoptions.inputEl = this.createInput(this.DomInputoptions)

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
  protected createInput (domInputoptions: IUploader.DomInputOptions): HTMLInputElement {
    let el: HTMLInputElement = document.getElementById(`#${domInputoptions.inputProps?.id}`) as HTMLInputElement
    if (el) {
      el = el instanceof HTMLInputElement ? el : this.createHiddenInput(domInputoptions)
    } else {
      el = this.createHiddenInput(domInputoptions)
    }
    return el
  }

  /**
   * @description 创建隐藏的 input 的具体方法
   * @param id
   */
  protected createHiddenInput (DomInputOptions: IUploader.DomInputOptions): HTMLInputElement {
    const input = document.createElement(DomInputOptions.tag) as HTMLInputElement
    input.id = DomInputOptions.inputProps?.id!
    input.type = DomInputOptions.inputProps?.type!
    input.multiple = DomInputOptions.inputProps?.multiple!
    input.style.cssText = DomInputOptions.style
    document.body.appendChild(input)
    return input
  }
}