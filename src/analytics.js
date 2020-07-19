
export const _c = (...fns) => arg =>
  fns.reverse().reduce((acc, fn) => fn(acc), arg)

const trunk = (num, dec = 2) => Math.trunc(num * 10**dec) / (10**dec)

const toHours = time => time / (1000 * 60 * 60)

export const mapDeltas = values => {
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
