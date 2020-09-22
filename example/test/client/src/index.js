import { Uploader } from './dist/index.js'
let urls = []
new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3400/upload',
  oneSlice: 20 * 1024, // 20 kb
  before (files) {
    console.log(files)
    urls = []
    return true
  },
  mergeShardFileBefore (data) {
    console.log('before')
    console.log(data)
    return true
  },
  progress (xhr, arg) {
    console.log('start')
    console.log(xhr)
    urls.push(xhr.response.url)
    console.log(arg)
    console.log('end')
  },
  mergeShardFile (urls) {
    console.log('before')
    console.log(urls)
  },
  response (xhr, arg) {
    console.log(xhr)
    console.log(arg)
  }
})
