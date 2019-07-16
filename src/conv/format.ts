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
  return { items, ...otherItems }
}
export const normalize = (obj: any) => {
  const { items, ...others } = obj;
  return { ...others, ...items.map(({ effects, ...confs }: { effects: any[] }) => ({ ...effects, ...confs })) }
}