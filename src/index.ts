import minimist from 'minimist'

import { decode, encode } from "aviutl-exo"
import { save, load, saveEXO, loadEXO } from "aviutl-exo/lib/node/fs"

import { pathExists } from "fs-extra";
import { parse } from 'path';

const { file, dec, enc, json } = minimist(process.argv.slice(2));

(async () => {
  const fileType = json ? 'JSON' : 'YAML';
  const ext = json ? 'json' : 'yaml';
  if (await pathExists(file)) {
    const fileName = parse(file).name;
    let targetText;
    if (dec) {
      targetText = await loadEXO(file)
      const result = decode(targetText, fileType);
      await save(fileName, ext, result);
      console.log('出力されました', fileName, ext);
    } else if (enc) {
      targetText = await load(file, ext);
      const result = encode(targetText, fileType);
      await saveEXO(ext, result);
      console.log('出力されました', { outFileName: ext });
    } else {
      console.log('パラメータが無効です', { file, dec, enc, json });
    }
  } else {
    console.log('ファイルが見つかりません', { file })
  }
})()