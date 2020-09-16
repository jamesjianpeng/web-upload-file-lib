import { Uploader } from './dist/index.js'
new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3400/upload',
  before (files) {
    console.log(files)
    return true
  },
  response (xhr) {
    console.log(xhr)
  }
})
