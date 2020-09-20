import { IUploader } from "src/interface";

const slice = (file: File, options: IUploader.ShardOptions) => {
    const oneSlice = options.oneSlice || 10 * 1024 * 1024 // 5M
    const name = file.name
    // 根据每份大小拆分的所有份数
    const createFileChunk = function (file: File, size) {
        const fileChunkList: {file: Blob}[] = [];
        let cur = 0;
        while (cur < file.size) {
            fileChunkList.push({ file: file.slice(cur, cur + size) });
            cur += size;
        }
        return fileChunkList;
    }

    const createFormDataList = function (fileChunkList) {
      const formDatas = fileChunkList.map((item, index) => {
          const formData = new FormData()
          formData.append(name + '_' + (index + 1), item.file)
          return formData
      })

      return {
        name: name,
        formDatas: formDatas
      }
    }
    const fileChunkList = createFileChunk(file, oneSlice)
    const uploadFormDatas = createFormDataList(fileChunkList)
    return uploadFormDatas
}

export {
  slice
}
