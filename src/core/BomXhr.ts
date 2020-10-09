const request = (options) => {
    const type = options.type;
    const path = options.url;
    const data = options.data;

    const headers = options.headers || {};
    const isFormData = (opt) => {
        return opt instanceof FormData;
    };

    return new Promise((reslove, reject) => {
        if (["GET", "POST"].indexOf(type) < 0) {
            reject(new Error("只持支 GET POST"));
        }

        const xhr = new XMLHttpRequest();

        xhr.timeout = 150000;
        xhr.onload = () => {
            /** @link {https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState} */
            const readyState = xhr.readyState;
            const DONE = xhr.DONE;
            if (readyState === DONE) {
                reslove(xhr);
            }
        };

        let body = null;

        body = isFormData(data) ? data : JSON.stringify(data);
        xhr.open(type, path, true);
        console.log(type, path);
        Object.keys(headers || {}).forEach((val) => {
            xhr.setRequestHeader(val, (headers || {})[val]);
        });

        if (!isFormData(data)) {
            xhr.setRequestHeader(
                "Content-Type",
                "application/json;charset=utf-8"
            );
        }
        xhr.send(body);
    });
};

const _uploadFormData = async (action: string, formData: FormData) => {
    const res = await request({
        type: "POST",
        url: action,
        data: formData,
    });
    return res;
};

/**
 * @description 单个文件上传
 */
const uploadFormData = async (action: string, files: File[]) => {
    const formData = new FormData();
    files.map((file, index) => {
        formData.append(index.toString(), file);
    });
    return await _uploadFormData(action, formData);
};

export { request, uploadFormData };
