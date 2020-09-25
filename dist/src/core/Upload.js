var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { uploadFormData } from './xhr';
import { getImageSize, getVideoSize } from '../helper';
import { DomInput } from './DomInput';
export class Uploader extends DomInput {
    constructor(opts) {
        super(opts);
        this.options = Object.assign({}, opts);
        this.mountedInputEvent(this.inputEvent.bind(this));
    }
    inputEvent(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const files = Array.from(((_a = e.target) === null || _a === void 0 ? void 0 : _a.files) || []);
            const isGono = yield this.before(files);
            if (isGono) {
                const oneSlice = this.options.oneSlice;
                const res = yield this.uploadFormData(files);
                this.response(res);
            }
        });
    }
    before(files, otherArg) {
        return __awaiter(this, void 0, void 0, function* () {
            const promiseAll = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const meta = yield Uploader.getImageSize(file);
                return { file, meta };
            }));
            const filesRes = yield Promise.all(promiseAll);
            return yield this.options.before(filesRes);
        });
    }
    progress(data, otherArg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.options.progress(data, otherArg);
        });
    }
    response(data, otherArg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.options.response(data);
        });
    }
    uploadFormData(files) {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData();
            files.map((file, index) => {
                formData.append(index.toString(), file);
            });
            return yield uploadFormData(this.options.action, formData);
        });
    }
}
Uploader.getImageSize = getImageSize;
Uploader.getVideoSize = getVideoSize;
