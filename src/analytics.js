
export const _c = (...fns) => arg =>
  fns.reverse().reduce((acc, fn) => fn(acc), arg)

const trunk = (num, dec = 2) => Math.trunc(num * 10**dec) / (10**dec)

const toHours = time => time / (1000 * 60 * 60)

export const mapDeltas2 = values => {
  const vs = values.slice().reverse()

  for (let i = 0; i < vs.length; i++) {
    let dValue = i > 0
      ? trunk(vs[i].value - vs[i - 1].value )
      : 0
    let dTime = i > 0
      ? _c(trunk, toHours)(new Date(vs[i].createdAt) - new Date(vs[i - 1].createdAt))
      : 0
    let rate = i > 0
      ? trunk(dValue / dTime, 3) : 0

    vs[i].dValue = dValue
    vs[i].dTime = dTime
    vs[i].rate = rate
  }

  return vs
}

export const mapDeltas = values => {
  const vs = values.slice().reverse()

  for (let i = 0; i < vs.length - 1; i++) {
    let dValue = trunk(vs[i + 1].value - vs[i].value )
    let diff = new Date(vs[i + 1].createdAt) - new Date(vs[i].createdAt)
    let dTime = _c(trunk, toHours)(diff)
    let rate = trunk(dValue / dTime, 3)

    vs[i].dValue = dValue
    vs[i].dTime = dTime
    vs[i].rate = rate
  }

  const last = vs[vs.length - 1]
  const prelast = vs[vs.length - 2]
  last.dValue = prelast.dValue
  last.dTime = prelast.dTime
  last.rate = prelast.rate

  return vs
}
