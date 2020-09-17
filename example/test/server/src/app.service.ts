import { Injectable, OnModuleInit, HttpService } from '@nestjs/common';
import { existDirSync, writeFileSync, splitFileName } from './util'
import setting from '../settings.json'
import path from 'path'
import moment from 'moment'

@Injectable()
export class AppService implements OnModuleInit {
  constructor (
    private readonly httpService: HttpService
  ) {}

  onModuleInit () {
  }

  async upload (data: File[]) {
    console.log(data)
    const promiseAll = data.map(async (data: File) => {
      return await this.storageFile(data)
    })
    const result = await Promise.all(promiseAll)
    return result
  }

  async getFileFuffer (url: string) {
    const res= await this.httpService.get(url).toPromise()
    const base64 = Buffer.isEncoding('base64')
    console.log(base64)
  }

  async storageFile (file: any): Promise<boolean | { url: string, msg: string }> {
    let result = true
    let filePath = ''
    let status = true
    filePath = path.join(__dirname, '../static')
    status = existDirSync(filePath)
    if (!status) {
      console.log(filePath, '不存在这样的目录文件')
      result = false
    }
    const { fileName, fileSuffix } = splitFileName(file.originalname)
    const lastFileName = `${fileName}-${moment(new Date()).format('YYYYMMDDhhmmss')}.${fileSuffix}`
    filePath = path.join(filePath, lastFileName)
    status = writeFileSync(filePath, file.buffer)
    if (!status) {
      console.log(filePath, '文件写入失败')
      result = false
    }
    const url = `${setting.staticHost}/${lastFileName}`
    await this.getFileFuffer(url)
    return { url:  result ? url : '', msg: result ? '' : '文件上传失败' }
  }
}
