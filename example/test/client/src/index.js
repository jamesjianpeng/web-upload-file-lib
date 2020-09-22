import { Uploader } from './dist/index.js'
import axios from 'axios'
const oneSlice = 20 * 1024
let urls = []
new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3400/upload',
  oneSlice, // 20 kb
  before (files) {
    console.log(files)
    urls = []
    return true
  },
  uploadShardFileBefore (data) {
    console.log('before')
    console.log(data)
    return true
  },
  progress (xhr, arg) {
    if (arg.shard) {
      const url = JSON.parse(xhr.response)[0].url
      if (xhr.response) {
        urls.push(url)
      }
    }
  },
  async mergeShardFileBefore (arg) {
    console.log('mergeShardFileBefore')
    console.log(urls)
    console.log(arg)
    const res = await axios.post('http://127.0.0.1:3400/mergeShardFile', { urls, name: 'mergetest.png', oneSlice })
    console.log(res)
    return true
  },
  response (xhr, arg) {
    console.log(xhr)
    console.log(arg)
  }
})
