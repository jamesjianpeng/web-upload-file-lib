import { Uploader } from './dist/index.js'
new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3400/upload',
  oneSlice: 1 * 1024 * 1024,
  before (files) {
    console.log(files)
    return true
  },
  response (xhr) {
    console.log(xhr)
  }
})
