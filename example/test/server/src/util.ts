import fs from 'fs';

/**
 * @description 判断一个文件目是否存在，不存的文件目录则递归创建对于的目录
 * @param dirPath
 * @
 */
export const existDirSync = (dirPath: string): boolean => {
  let result = true
  try {
    const res = fs.existsSync(dirPath)
    if (!res) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  } catch (e) {
    console.error(e)
    result = false
  }
  return result
}

/**
 * @description 写入一个文件
 * @param filePath
 * @param file
 */
export const writeFileSync = (filePath: string, file: Buffer): boolean => {
  let result = true
  try {
    fs.writeFileSync(filePath, file)
  } catch(e) {
    console.error(e)
    result = false
  }
  return result
}

/**
 * @description 分割文件名，获得文件名和文件扩展名
 * @param { fileName, fileSuffix }
 */
export const splitFileName = (file: string) => {
  const dotLocation = file.lastIndexOf('.')
  const fileName = file.substr(0, dotLocation)
  const fileSuffix = file.substr(dotLocation + 1)
  return {
    fileName,
    fileSuffix
  }
}
