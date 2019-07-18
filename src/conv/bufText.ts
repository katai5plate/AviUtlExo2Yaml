import { decode, encode } from 'iconv-lite'

const code = "utf16le";

const chunkString = (str: string, size: number) => {
  const arr = [...str];
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  ).map(v => v.join(''));
};

const convertCRLF = (s: string, x: string) => s.replace(/\r?\n|\r/g, x)

export const bufferText2PureText = (bufferText: string) =>
  convertCRLF(
    decode(
      Buffer.from(chunkString(bufferText, 2).map(n => parseInt(n, 16))), code
    ).replace(/\0/g, ""), '\n'
  )

export const pureTextToBufferText = (pureText: string) => {
  return [...encode(convertCRLF(pureText, '\r\n'), code)]
    .map(n => n.toString(16).padStart(2, '0'))
    .join('')
    .padEnd(4096, '0');
}
