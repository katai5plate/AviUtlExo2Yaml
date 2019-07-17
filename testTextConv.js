const { decode, encode } = require('iconv-lite');
const chunkString = (str, size) => {
  const arr = [...str];
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  ).map(v => v.join(''));
};

// data
const bufferText = '4230443046300d000a004b304d304f300d000a00410042004300';
const pureTextCRLF = 'あいう\r\nかきく\r\nABC';
const pureTextLF = 'あいう\nかきく\nABC';
const pureTextCR = 'あいう\rかきく\rABC';
console.log({
  bufferText,
  pureTextCRLF,
  pureTextLF,
  pureTextCR
});
const code = 'utf16le';

// decode text -> pure
const bufferText2PureText = t =>
  decode(Buffer.from(chunkString(t, 2).map(n => parseInt(n, 16))), code);

console.log('decode text -> pure', {
  result: bufferText2PureText(bufferText)
});

// encode pure -> text
const pureTextToBufferText = p =>
  [...encode(p.replace(/\r?\n|\r/g, '\r\n'), code)]
    .map(n => n.toString(16).padStart(2, '0'))
    .join('');

[
  { p: pureTextCRLF, n: 'CRLF' },
  { p: pureTextLF, n: 'LF' },
  { p: pureTextCR, n: 'CR' }
].forEach(({ p, n }) =>
  console.log(`encode pure${n} -> text`, {
    result: pureTextToBufferText(p)
  })
);

console.log('--------------');

console.log(
  'conv:',
  chunkString(pureTextToBufferText(pureTextCRLF), 4).join(' '),
  { t: pureTextCRLF }
);
console.log('text:', chunkString(bufferText, 4).join(' '), {
  t: bufferText2PureText(bufferText)
});
console.log({
  textToPure: bufferText2PureText(bufferText) === pureTextCRLF,
  pureToText: pureTextToBufferText(pureTextCRLF) === bufferText
});
console.log({
  LF: encode('\n', code),
  CRLF: encode('\r\n', code),
  CR: encode('\r', code)
});
console.log([...encode('あ\r\n', code)].map(n => n.toString(16)).join(' '));
