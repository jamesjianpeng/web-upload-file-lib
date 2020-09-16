/**
 * @description 获取图片的元信息
 * @param file
 */
const getImageSize = <T extends File, U extends unknown>(file: T): Promise<U> => {
  let res: any = {width: '', height: ''}
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (this: FileReader, theFile: ProgressEvent<FileReader>) {
      let image = new Image()
      image.src = theFile.target?.result as string
      image.onload = function (this: any, ev: Event) {
        res.width = this.width
        res.height = this.height
        resolve(res)
      }
    }
  })
  return Promise.resolve(res)
}

/**
 * @description 获取视频的元信息
 * @param file
 */
const getVideoSize = <T, U>(file: T): Promise<U> => {
  const res: U = {} as U
  return Promise.resolve(res)
}

export {
  getImageSize,
  getVideoSize
}
