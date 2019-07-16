"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ini_1 = require("ini");
var yaml_1 = require("yaml");
exports.toYaml = function (data) { return yaml_1.stringify(ini_1.parse(data)); };
exports.toIni = function (data) { return ini_1.stringify(yaml_1.parse(data)); };
