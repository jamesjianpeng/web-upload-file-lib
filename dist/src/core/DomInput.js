var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { _createInputProps, TAG, STYLE, CHANGE, CLICK } from '../config';
export class DomInput {
    constructor(DomInputoptions) {
        this.DomInputoptions = DomInputoptions;
        this.DomInputoptions.inputProps = Object.assign(_createInputProps(), DomInputoptions.inputProps || {});
        this.DomInputoptions.tag = TAG;
        this.DomInputoptions.style = STYLE;
        this.DomInputoptions.inputEl = this.createInput(this.DomInputoptions);
        this.addTriggerEvent();
    }
    addTriggerEvent() {
        this.DomInputoptions.el = this.DomInputoptions.el || document.querySelector(`#${this.DomInputoptions.id}`);
        this.DomInputoptions.triggerEventListener = (e) => {
            this.DomInputoptions.inputEl.click();
        };
        this.DomInputoptions.el.addEventListener(CLICK, this.DomInputoptions.triggerEventListener);
    }
    mountedInputEvent(cb) {
        this.DomInputoptions.inputEventListener = this.addInputEvent(cb);
        this.DomInputoptions.inputEl.addEventListener(CHANGE, this.DomInputoptions.inputEventListener);
    }
    removeTriggerEvent() {
        this.DomInputoptions.el.removeEventListener(CLICK, this.DomInputoptions.triggerEventListener);
        this.DomInputoptions.inputEl.removeEventListener(CHANGE, this.DomInputoptions.inputEventListener);
        const hasInputEl = document.body.contains(this.DomInputoptions.inputEl);
        if (hasInputEl) {
            document.body.removeChild(this.DomInputoptions.inputEl);
        }
        this.DomInputoptions.el = null;
        this.DomInputoptions.id = undefined;
        this.DomInputoptions.inputEl = null;
        this.DomInputoptions.triggerEventListener = null;
        this.DomInputoptions.inputEventListener = null;
    }
    addInputEvent(cb) {
        return (e) => __awaiter(this, void 0, void 0, function* () {
            yield cb(e);
            this.DomInputoptions.inputEl.value = '';
        });
    }
    createInput(domInputoptions) {
        var _a, _b;
        console.log((_a = domInputoptions.inputProps) === null || _a === void 0 ? void 0 : _a.id);
        let el = document.getElementById(`${(_b = domInputoptions.inputProps) === null || _b === void 0 ? void 0 : _b.id}`);
        console.log(el);
        console.log(el instanceof HTMLInputElement);
        if (el) {
            el = el instanceof HTMLInputElement ? el : this.createHiddenInput(domInputoptions);
        }
        else {
            el = this.createHiddenInput(domInputoptions);
        }
        return el;
    }
    createHiddenInput(DomInputOptions) {
        var _a, _b, _c;
        const input = document.createElement(DomInputOptions.tag);
        input.id = (_a = DomInputOptions.inputProps) === null || _a === void 0 ? void 0 : _a.id;
        input.type = (_b = DomInputOptions.inputProps) === null || _b === void 0 ? void 0 : _b.type;
        input.multiple = (_c = DomInputOptions.inputProps) === null || _c === void 0 ? void 0 : _c.multiple;
        input.style.cssText = DomInputOptions.style;
        document.body.appendChild(input);
        return input;
    }
}
