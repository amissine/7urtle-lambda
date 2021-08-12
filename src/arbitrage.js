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
    spreadsNew()
  }
  log(`${id}: ${qt} >>>  ∆ ${delta}`)
  spreadsAdd(item)
}

let spreads = [], spreadsMaxLength = 0

function spreadsNew () {
  if (spreads.length > 0) {
    if (spreadsMaxLength == 0) {        // assuming 1st pack of spreads
      spreadsMaxLength = spreads.length // comes in full
    }
    arbitrage() // also runs on incomplete packs of spreads
  }
}

function spreadsAdd (item) {
  spreads.push([item[0], item[1][0], item[2][0]]) // xid, maxbid, minask
  if (spreads.length == spreadsMaxLength) {
    arbitrage()
  }
}

/*
 Arbitrage opportunities can be found on spreads from different exchanges, taken
 within a short timeframe < 1000 ms. For two exchanges x0 and x1, represented by
 their spreads

   s0 = [x0, [maxBidPrice, maxBidAmount, …], [minAskPrice, minAskAmount, …]]

 and

   s1 = [x1, [maxBidPrice, maxBidAmount, …], [minAskPrice, minAskAmount, …]]

 , AO can be defined as follows:

   sTopBid = s0[1][0] > s1[1][0] ? s0 : s1
   sBtmAsk = s0[2][0] < s1[2][0] ? s0 : s1

   if (sTopBid[1][0] > sBtmAsk[2][0]) {

     AO(s0, s1) = (sTopBid[1][0] - sBtmAsk[2][0])
                  * Math.min(sTopBid[1][1], sBtmAsk[2][1])
   }

 For N ≥ 2 exchanges, represented by their spreads S = [s0, s1, …, sNm1], AO can be
 defined as follows:

   AO(N) = Math.max(...Array.from(
                         Array.from(S, pairs), 
                         p => p && AO(p[0], p[1]) ?? 0))
 where 

   const pairs = (x, i) => Array.from(
              Array.from(S, (x2p, j) => j > i ? x2p : undefined),
              x2p => x2p ? [x, x2p] : undefined)
*/
function arbitrage () {
  if (spreads.length < 2) {
    log('=== NO ARBITRAGE POSSIBLE ===')
    spreads = []
    return;
  }
  log('- ' + deepInspect(spreads))
  spreads = []
}
