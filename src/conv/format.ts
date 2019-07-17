import { bufferText2PureText, pureTextToBufferText } from './bufText'

export const readable = (obj: any) => {
  const filtering = (o: {}, isNumber: boolean) => Object.keys(o)
    .filter(v => isNumber ? Number.isFinite(Number(v)) : !Number.isFinite(Number(v)))
  const fold = (a: any[], o: any) => a.reduce((p, c) => ({ ...p, [c]: o[c] }), {})
  const itemNumbers = filtering(obj, true)
  const otherItems = fold(filtering(obj, false), obj)
  const items = itemNumbers.map(v => obj[v]).map(item => {
    const effectNumbers = filtering(item, true);
    const itemParams = fold(filtering(item, false), item)
    const effects = effectNumbers.map(v => item[v])
    return { effects, ...itemParams }
  })

  items.forEach(({ effects }) => effects.filter(({ text }: { text: string }) => !!text).forEach((eff: { text: string }) => {
    eff.text = bufferText2PureText(eff.text)
  }))

  return { items, ...otherItems }
}
export const normalize = (obj: any) => {
  const { items, ...others } = obj;
  items.forEach(({ effects }: any) => effects.filter(({ text }: { text: string }) => !!text).forEach((eff: { text: string }) => {
    eff.text = pureTextToBufferText(eff.text)
  }))
  return { ...others, ...items.map(({ effects, ...confs }: { effects: any[] }) => ({ ...effects, ...confs })) }
}