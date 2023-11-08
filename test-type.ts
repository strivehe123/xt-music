interface IFnCall {
  <TWHY>(name: () => TWHY, age: string): TWHY
}

const fuck: IFnCall = (name, age) => {
  return name()
}

fuck(() => '111', 'fsfsf')
