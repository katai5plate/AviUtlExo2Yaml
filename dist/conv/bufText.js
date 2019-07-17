"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var iconv_lite_1 = require("iconv-lite");
var code = "utf16le";
var chunkString = function (str, size) {
    var arr = __spread(str);
    return Array.from({ length: Math.ceil(arr.length / size) }, function (v, i) {
        return arr.slice(i * size, i * size + size);
    }).map(function (v) { return v.join(''); });
};
exports.bufferText2PureText = function (bufferText) {
    return iconv_lite_1.decode(Buffer.from(chunkString(bufferText, 2).map(function (n) { return parseInt(n, 16); })), code).replace(/\0/g, "");
};
exports.pureTextToBufferText = function (p) {
    return __spread(iconv_lite_1.encode(p.replace(/\r?\n|\r/g, '\r\n'), code)).map(function (n) { return n.toString(16).padStart(2, '0'); })
        .join('')
        .padEnd(4096, '0');
};
