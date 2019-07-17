import { readFile, outputFile } from 'fs-extra'
import { decode, encode } from 'iconv-lite'

export const load = async (fileName: string) => decode(await readFile(fileName), "Shift_JIS");
export const save = async (fileName: string, data: string) => await outputFile(fileName, encode(data, "Shift_JIS"));