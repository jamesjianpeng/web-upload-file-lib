import { Uploader } from './dist/index.js'
new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3400/upload',
  oneSlice: 1 * 1024 * 1024,
  before (files) {
    console.log(files)
    return true
  },
  progress (xhr, arg) {
    console.log('start')
    console.log(xhr)
    console.log(arg)
    console.log('end')
  },
  response (xhr, arg) {
    console.log(xhr)
    console.log(arg)
  }
})
