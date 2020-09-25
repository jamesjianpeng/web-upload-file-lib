const getImageSize = (file) => {
    let res = { width: '', height: '' };
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
            var _a;
            let image = new Image();
            image.src = (_a = theFile.target) === null || _a === void 0 ? void 0 : _a.result;
            image.onload = function (ev) {
                res.width = this.width;
                res.height = this.height;
                resolve(res);
            };
        };
    });
    return Promise.resolve(res);
};
const getVideoSize = (file) => {
    const res = {};
    return Promise.resolve(res);
};
export { getImageSize, getVideoSize };
