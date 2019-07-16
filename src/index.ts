import { load, save } from "./conv/exo";
import { readable, normalize } from "./conv/format";
import { iniToObj, objToYaml, yamlToObj, objToIni } from "./conv/ini2yaml";
// import { outputFile } from "fs-extra";

(async () => {
  const obj = iniToObj(await load('test.exo'));

  const formated = readable(obj);
  // console.log(formated)
  // await outputFile("format.json", JSON.stringify(formated, null, "  "));

  const yaml = objToYaml(formated);

  const normalized = normalize(yamlToObj(yaml))

  const ini = objToIni(normalized);
  await save("dist.exo", ini);
})()