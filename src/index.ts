import minimist from 'minimist'
import { load, save } from "./conv/exo";
import { readable, normalize } from "./conv/format";
import { iniToObj, objToYaml, yamlToObj, objToIni } from "./conv/ini2yaml";
import { outputFile, pathExists, readFile } from "fs-extra";
import { parse } from 'path';

const { file, dec, enc, json } = minimist(process.argv.slice(2));

(async () => {
  if (await pathExists(file)) {
    const fileName = parse(file).name;
    let outFileName;
    if (dec) {
      const obj = iniToObj(await load(file));
      const formated = readable(obj);
      const yaml = objToYaml(formated);
      if (json) {
        outFileName = `_${fileName}.json`;
        await outputFile(outFileName, JSON.stringify(formated, null, "  "));
      } else {
        outFileName = `_${fileName}.yaml`;
        await outputFile(outFileName, yaml);
      }
      console.log('出力されました', { outFileName });
    } else if (enc) {
      const targetText = await readFile(file, "utf8");
      let targetObj = {};
      if (json) {
        outFileName = `_${fileName}_json.exo`;
        targetObj = JSON.parse(targetText);
      } else {
        outFileName = `_${fileName}_yaml.exo`;
        targetObj = yamlToObj(targetText);
      }
      const normalized = normalize(targetObj);
      const ini = objToIni(normalized);
      await save(outFileName, ini);
      console.log('出力されました', { outFileName });
    } else {
      console.log('パラメータが無効です', { file, dec, enc, json });
    }
  } else {
    console.log('ファイルが見つかりません', { file })
  }
})()