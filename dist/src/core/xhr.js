var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = (options) => {
    const type = options.type;
    const path = options.url;
    const data = options.data;
    const headers = options.headers || {};
    const isFormData = (data) => {
        return data instanceof FormData;
    };
    return new Promise((reslove, reject) => {
        if (['GET', 'POST'].indexOf(type) < 0) {
            reject(new Error('只持支 GET POST'));
        }
        const xhr = new XMLHttpRequest();
        xhr.timeout = 150000;
        xhr.onload = () => {
            const readyState = xhr.readyState;
            const DONE = xhr.DONE;
            let response;
            try {
                response = JSON.parse(xhr.response);
            }
            catch (e) {
                response = xhr.response;
            }
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
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        }
        xhr.send(body);
    });
};
const uploadFormData = (action, formData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield request({
        type: 'POST',
        url: action,
        data: formData
    });
    return res;
});
export { request, uploadFormData };
