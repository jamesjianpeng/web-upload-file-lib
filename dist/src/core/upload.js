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
export class Uploader {
    constructor(opts) {
        this.options = opts;
        this.inputEl = this.createInput(`Uploader-${new Date().getTime()}`);
        this.eventListener = this.addEvent();
        this.inputEl.addEventListener('change', this.eventListener);
        this.triggerEvent();
    }
    triggerEvent() {
        this.options.el = this.options.el || document.querySelector(`#${this.options.id}`);
        this.options.el.addEventListener('click', () => {
            this.inputEl.click();
        });
    }
    before(files, otherArg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.options.before(files);
        });
    }
    response(data, otherArg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.options.response(data);
        });
    }
    uploadFormData(files) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield uploadFormData(this.options.action, files);
        });
    }
    uploadAllSlice(file) {
    }
    addEvent() {
        return (e) => __awaiter(this, void 0, void 0, function* () {
            const files = Array.from(e.target.files);
            const isGono = yield this.before(files);
            console.log(isGono);
            if (isGono) {
                if (false) {
                }
                else {
                    const res = yield this.uploadFormData(files);
                    this.response(res);
                }
            }
            if (this.inputEl)
                this.inputEl.value = '';
        });
    }
    createInput(id = 'Uploader') {
        let el = document.getElementById(`#${id}`);
        if (el) {
            el = el instanceof HTMLInputElement ? el : this.createHiddenInput(id);
        }
        else {
            el = this.createHiddenInput(id);
        }
        return el;
    }
    createHiddenInput(id) {
        const input = document.createElement('input');
        input.id = id;
        input.type = 'file';
        input.style.display = 'none';
        document.body.appendChild(input);
        return input;
    }
}
Uploader.getImageSize = getImageSize;
Uploader.getVideoSize = getVideoSize;
