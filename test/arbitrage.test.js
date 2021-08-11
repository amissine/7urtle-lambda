const λ = require('..')
const data = require('./data.json')

mockAsyncFeed(0)

function mockAsyncFeed (index, qt, pt) {
  let item = data[index]
  const id = item[0]
  if (index == 0) {
    λ.feed(item)
    item = data[1]; qt = item[item.length - 2]; pt = item[item.length - 1]
    setTimeout(() => mockAsyncFeed(1, qt, pt), qt - pt)
    return;
  }
  λ.feed(item)
  if (++index > data.length - 1) {
    λ.log('\n- mockAsyncFeed DONE\n')
    return;
  }
  item = data[index]; qt = item[item.length - 2]; pt = item[item.length - 1]
  setTimeout(() => mockAsyncFeed(index, qt, pt), qt - pt)
}
