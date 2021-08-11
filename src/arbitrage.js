import { log } from './utils'

export const feed = item => {
  const id = item[0], qt = item[item.length - 2], pt = item[item.length - 1]
  if (pt == 0) {
    log(`${id}: ${qt}`)
    return;
  }
  let delta  = qt - pt
  if (delta > 1500) {
    log('')
  }
  log(`${id}: ${qt} >>>  ∆ ${delta}`)
}
