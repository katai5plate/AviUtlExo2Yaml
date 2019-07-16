"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ini_1 = require("ini");
var yaml_1 = require("yaml");
exports.iniToObj = function (data) { return ini_1.parse(data); };
exports.objToYaml = function (data) { return yaml_1.stringify(data); };
exports.yamlToObj = function (data) { return yaml_1.parse(data); };
exports.objToIni = function (data) { return ini_1.stringify(data); };
