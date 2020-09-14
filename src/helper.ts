/**
 * @description 获取图片的元信息
 * @param file
 */
const getImageSize = <T, U>(file: T): Promise<U> => {
  const res: U = {} as U
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
