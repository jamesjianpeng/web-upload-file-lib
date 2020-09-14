import { Uploader } from './dist/index.js'
new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3000/upload',
  before (files) {
    console.log(files)
    console.log(files[0])
    return true
  },
  response (xhr) {
    console.log(xhr)
  }
})
