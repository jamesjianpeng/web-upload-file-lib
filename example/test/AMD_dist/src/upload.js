var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Uploader = void 0;
    class Uploader {
        constructor(opts) {
            this.options = opts;
            this.inputEl = this.createInput(`Uploader-${new Date().getTime()}`);
            this.eventListener = this.addEvent(opts.before);
            this.inputEl.addEventListener('change', this.eventListener);
            this.options.el = this.options.el || document.querySelector(`#${this.options.id}`);
            this.options.el.addEventListener('click', () => {
                this.options.el.click();
            });
        }
        before(file, meta) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = true;
                return Promise.resolve(res);
            });
        }
        success(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(data);
            });
        }
        getImageSize(file) {
            return Promise.resolve({});
        }
        getVideoSize(file) {
            return Promise.resolve({});
        }
        upload(file) {
            console.log(file);
        }
        uploadAllSlice(file) {
        }
        addEvent(cb) {
            return (e) => {
                console.log(e);
                const isGono = cb(e.target);
                if (isGono) {
                    const file = e.target.files[0];
                    if (false) {
                        this.uploadAllSlice(file);
                    }
                    else {
                        this.upload(file);
                    }
                }
                if (this.inputEl)
                    this.inputEl.value = '';
            };
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
            input.style.display = 'none';
            document.body.appendChild(input);
            return input;
        }
    }
    exports.Uploader = Uploader;
});
