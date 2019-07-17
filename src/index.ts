import minimist from 'minimist'
import { load, save } from "./conv/exo";
import { decode, encode } from "./converter"
import { outputFile, pathExists, readFile } from "fs-extra";
import { parse } from 'path';

const { file, dec, enc, json } = minimist(process.argv.slice(2));

(async () => {
  if (await pathExists(file)) {
    const fileName = parse(file).name;
    let outFileName, targetText;
    if (dec) {
      targetText = await load(file)
      const result = decode(targetText, json);
      if (json) {
        outFileName = `_${fileName}.json`;
      } else {
        outFileName = `_${fileName}.yaml`;
      }
      await outputFile(outFileName, result);
      console.log('出力されました', { outFileName });
    } else if (enc) {
      targetText = await readFile(file, "utf8");
      const result = encode(targetText, json);
      if (json) {
        outFileName = `_${fileName}_json.exo`;
      } else {
        outFileName = `_${fileName}_yaml.exo`;
      }
      await save(outFileName, result);
      console.log('出力されました', { outFileName });
    } else {
      console.log('パラメータが無効です', { file, dec, enc, json });
    }
  } else {
    console.log('ファイルが見つかりません', { file })
  }
})()