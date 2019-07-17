# AviUtlExo2Yaml

AviUtl の EXO ファイルを YAML に相互変換

## usage

### exo を yaml に変換

```
npm start -- --dec --file="123.exo"
```

### exo を JSON に変換

```
npm start -- --dec --file="123.exo" --json
```

### yaml を exo に変換

```
npm start -- --enc --file="123.yaml"
```

### JSON を exo に変換

```
npm start -- --enc --file="123.json" --json
```

## memo

### text の仕様について

- 改行コードが CRLF の UTF-16
- 4096 文字になるようにゼロ埋め

```
あいうえお
かきくけこ
↓
あいうえお(CRLF)かきくけこ
↓
4230 4430 4630 4830 4a30 // あいうえお
0d00 0a00 // CRLF
4b30 4d30 4f30 5130 5330 // かきくけこ
↓
42304430463048304a300d000a004b304d304f30513053300000000000...000
```

```js
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
```

```
{ bufferText: '4230443046300d000a004b304d304f300d000a00410042004300',
  pureTextCRLF: 'あいう\r\nかきく\r\nABC',
  pureTextLF: 'あいう\nかきく\nABC',
  pureTextCR: 'あいう\rかきく\rABC' }
decode text -> pure { result: 'あいう\r\nかきく\r\nABC' }
encode pureCRLF -> text { result: '4230443046300d000a004b304d304f300d000a00410042004300' }
encode pureLF -> text { result: '4230443046300d000a004b304d304f300d000a00410042004300' }
encode pureCR -> text { result: '4230443046300d000a004b304d304f300d000a00410042004300' }
```
