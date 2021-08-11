import { log, deepInspect } from './utils'

export const feed = item => {
  const id = item[0], qt = item[item.length - 2], pt = item[item.length - 1]
  if (pt == 0) {
    log(`${id}: ${qt}`)
    spreadsAdd(item)
    return;
  }
  let delta = qt - pt
  if (delta > 1500) {
    log('')
    spreadsClear()
  }
  log(`${id}: ${qt} >>>  ∆ ${delta}`)
  spreadsAdd(item)
}

let spreads = [], spreadsMaxLength = 0

function spreadsClear () {
  if (spreads.length > 0) {
    if (spreadsMaxLength == 0) {        // assuming 1st pack of spreads
      spreadsMaxLength = spreads.length // comes in full
    }
    arbitrage()
  }
}

function spreadsAdd (item) {
  spreads.push([item[0], item[1][0], item[2][0]]) // id, maxbid, minask
  if (spreads.length == spreadsMaxLength) {
    arbitrage()
  }
}

function arbitrage () {
  if (spreads.length < 2) {
    log('=== NO ARBITRAGE POSSIBLE ===')
    spreads = []
    return;
  }
  log('- ' + deepInspect(spreads))
  spreads = []
}
