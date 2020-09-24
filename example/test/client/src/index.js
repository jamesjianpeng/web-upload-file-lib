import { Uploader } from './dist/index.js'
let urls = []
const instance = new Uploader({
  el: document.querySelector('#upload'),
  action: 'http://localhost:3400/upload',
  inputProps: {
    multiple: true
  },
  before (files) {
    console.log(files)
    urls = []
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
  response (xhr, arg) {
    console.log(xhr)
    console.log(arg)
  }
})
console.log(instance)
// setTimeout(() => {
const instance2 = new Uploader({
  el: document.querySelector('#upload2'),
  action: 'http://localhost:3400/upload',
  inputProps: {
    multiple: true
  },
  before (files) {
    console.log(files)
    urls = []
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
  response (xhr, arg) {
    console.log(xhr)
    console.log(arg)
  }
})
console.log(instance2)
  
// }, 2000)
document.querySelector('#upload2_remove').onclick = () => {
  instance2.removeTriggerEvent()
}
