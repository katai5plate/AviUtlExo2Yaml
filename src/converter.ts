import { readable, normalize } from "./conv/format";
import { iniToObj, objToYaml, yamlToObj, objToIni } from "./conv/ini2yaml";

export const decode = (targetText: string, toJson: boolean) => {
  const obj = iniToObj(targetText);
  const formated = readable(obj);
  const yaml = objToYaml(formated);
  if (toJson) {
    return JSON.stringify(formated, null, "  ")
  }
  return yaml
}
export const encode = (targetText: string, fromJson: boolean) => {
  let targetObj = {};
  if (fromJson) {
    targetObj = JSON.parse(targetText);
  } else {
    targetObj = yamlToObj(targetText);
  }
  const normalized = normalize(targetObj);
  return objToIni(normalized);
}