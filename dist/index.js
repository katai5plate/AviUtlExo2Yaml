"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var exo_1 = require("./conv/exo");
var format_1 = require("./conv/format");
var ini2yaml_1 = require("./conv/ini2yaml");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var _a = minimist_1.default(process.argv.slice(2)), file = _a.file, dec = _a.dec, enc = _a.enc, json = _a.json;
(function () { return __awaiter(_this, void 0, void 0, function () {
    var fileName, outFileName, obj, _a, formated, yaml, targetText, targetObj, normalized, ini;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, fs_extra_1.pathExists(file)];
            case 1:
                if (!_b.sent()) return [3 /*break*/, 12];
                fileName = path_1.parse(file).name;
                outFileName = void 0;
                if (!dec) return [3 /*break*/, 7];
                _a = ini2yaml_1.iniToObj;
                return [4 /*yield*/, exo_1.load(file)];
            case 2:
                obj = _a.apply(void 0, [_b.sent()]);
                formated = format_1.readable(obj);
                yaml = ini2yaml_1.objToYaml(formated);
                if (!json) return [3 /*break*/, 4];
                outFileName = "_" + fileName + ".json";
                return [4 /*yield*/, fs_extra_1.outputFile(outFileName, JSON.stringify(formated, null, "  "))];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4:
                outFileName = "_" + fileName + ".yaml";
                return [4 /*yield*/, fs_extra_1.outputFile(outFileName, yaml)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                console.log('出力されました', { outFileName: outFileName });
                return [3 /*break*/, 11];
            case 7:
                if (!enc) return [3 /*break*/, 10];
                return [4 /*yield*/, fs_extra_1.readFile(file, "utf8")];
            case 8:
                targetText = _b.sent();
                targetObj = {};
                if (json) {
                    outFileName = "_" + fileName + "_json.exo";
                    targetObj = JSON.parse(targetText);
                }
                else {
                    outFileName = "_" + fileName + "_yaml.exo";
                    targetObj = ini2yaml_1.yamlToObj(targetText);
                }
                normalized = format_1.normalize(targetObj);
                ini = ini2yaml_1.objToIni(normalized);
                return [4 /*yield*/, exo_1.save(outFileName, ini)];
            case 9:
                _b.sent();
                console.log('出力されました', { outFileName: outFileName });
                return [3 /*break*/, 11];
            case 10:
                console.log('パラメータが無効です', { file: file, dec: dec, enc: enc, json: json });
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                console.log('ファイルが見つかりません', { file: file });
                _b.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); })();
