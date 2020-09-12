export const request = (options) => {
  const type = options.type
  const path = options.url
  const data = options.data
  const headers = options.headers || {}
  const isFormData = (data) => {
      return data instanceof FormData
  }


  return new Promise((reslove, reject) => {
    if (['GET', 'POST'].indexOf(type) < 0) {
        reject(new Error('只持支 GET POST'))
    }

    const xhr = new XMLHttpRequest()

    xhr.timeout = 150000
    xhr.onload = () => {
      /** @link {https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState} */
      const status = xhr.status
      let response: any
      try {
          response = JSON.parse(xhr.response)
      } catch (e) {
          response = xhr.response
      }
      if (status >= 200 && status <= 300) {
          if (response.code === 0) {
            reslove(response.data)
          } else {
              console.error(`${response.data.message}`)
              reslove(response.data)
          }
      } else {
          const responseText = xhr.statusText
          console.error(`${responseText}(${status})`)
          reslove(responseText)
      }
    }

    let body = null

    body = isFormData(data) ? data : JSON.stringify(data)
    xhr.open(type, path, true)
    console.log(type, path)
    Object.keys(headers || {}).forEach((val) => {
        xhr.setRequestHeader(val, (headers || {})[val])
    })

    if (!isFormData(data)) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
    }
    xhr.send(body)
  })

}
