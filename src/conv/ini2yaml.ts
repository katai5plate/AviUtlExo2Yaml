import { parse as parseFromIni, stringify as parseToIni } from 'ini'
import { stringify as parseToYaml, parse as parseFromYaml } from 'yaml'

export const iniToObj = (data: string) => parseFromIni(data);
export const objToYaml = (data: {}) => parseToYaml(data);

export const yamlToObj = (data: string) => parseFromYaml(data);
export const objToIni = (data: {}) => parseToIni(data);