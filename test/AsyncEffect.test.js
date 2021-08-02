const λ = require('..')
const assert = require('assert')
const data = require('./data.json')
/*
for (const item of data) {
  const id = item[0], qt = item[item.length - 2], pt = item[item.length - 1]
  let delta  = qt - pt

  if (delta > 1500) {
    λ.log('-')
  }
  λ.log(`- ${id}: ${qt} >>>  ∆ ${delta}`)
}
λ.log('- sync feed DONE\n')
*/
mockAsyncFeed(0)

function mockAsyncFeed (index, qt, pt) {
  let item = data[index]
  const id = item[0]
  if (index == 0) {
    qt = item[item.length - 2]
    λ.log(`- ${id}: ${qt}`)
    item = data[1]
    qt = item[item.length - 2]
    pt = item[item.length - 1]
    setTimeout(() => mockAsyncFeed(1, qt, pt), qt - pt)
    return;
  }

  let delta  = qt - pt
  if (delta > 1500) {
    λ.log('-')
  }
  λ.log(`- ${id}: ${qt} >>>  ∆ ${delta}`)
  if (++index > data.length - 1) {
    λ.log('\n- mockAsyncFeed DONE\n')
    return;
  }
  item = data[index]
  qt = item[item.length - 2]
  pt = item[item.length - 1]
  setTimeout(() => mockAsyncFeed(index, qt, pt), qt - pt)
}
