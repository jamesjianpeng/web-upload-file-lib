"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestjsMdbLibModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsMdbLibModule = void 0;
const nestjs_mdb_lib_service_1 = require("./nestjs-mdb-lib.service");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let NestjsMdbLibModule = NestjsMdbLibModule_1 = class NestjsMdbLibModule {
    static register(options) {
        return {
            module: NestjsMdbLibModule_1,
            providers: [
                {
                    provide: constants_1.MDB_OPTIONS,
                    useValue: options,
                },
                nestjs_mdb_lib_service_1.NestjsMdbLibService
            ],
            exports: [nestjs_mdb_lib_service_1.NestjsMdbLibService],
        };
    }
};
NestjsMdbLibModule = NestjsMdbLibModule_1 = __decorate([
    common_1.Module({
        providers: [nestjs_mdb_lib_service_1.NestjsMdbLibService],
        exports: [nestjs_mdb_lib_service_1.NestjsMdbLibService],
    })
], NestjsMdbLibModule);
exports.NestjsMdbLibModule = NestjsMdbLibModule;
