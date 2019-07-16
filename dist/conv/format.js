"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readable = function (obj) {
    var filtering = function (o, isNumber) { return Object.keys(o)
        .filter(function (v) { return isNumber ? Number.isFinite(Number(v)) : !Number.isFinite(Number(v)); }); };
    var fold = function (a, o) { return a.reduce(function (p, c) {
        var _a;
        return (__assign({}, p, (_a = {}, _a[c] = o[c], _a)));
    }, {}); };
    var itemNumbers = filtering(obj, true);
    var otherItems = fold(filtering(obj, false), obj);
    var items = itemNumbers.map(function (v) { return obj[v]; }).map(function (item) {
        var effectNumbers = filtering(item, true);
        var itemParams = fold(filtering(item, false), item);
        var effects = effectNumbers.map(function (v) { return item[v]; });
        return __assign({ effects: effects }, itemParams);
    });
    return __assign({ items: items }, otherItems);
};
exports.normalize = function (obj) {
    var items = obj.items, others = __rest(obj, ["items"]);
    return __assign({}, others, items.map(function (_a) {
        var effects = _a.effects, confs = __rest(_a, ["effects"]);
        return (__assign({}, effects, confs));
    }));
};
