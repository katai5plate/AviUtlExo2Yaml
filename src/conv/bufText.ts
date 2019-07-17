import { decode, encode } from 'iconv-lite'

const code = "utf16le";

const chunkString = (str: string, size: number) => {
  const arr = [...str];
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  ).map(v => v.join(''));
};

export const bufferText2PureText = (bufferText: string) =>
  decode(Buffer.from(chunkString(bufferText, 2).map(n => parseInt(n, 16))), code).replace(/\0/g, "")

export const pureTextToBufferText = (p: string) =>
  [...encode(p.replace(/\r?\n|\r/g, '\r\n'), code)]
    .map(n => n.toString(16).padStart(2, '0'))
    .join('')
    .padEnd(4096, '0');
