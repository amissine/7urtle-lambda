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
λ.log('\n- sync feed DONE\n')

mockAsyncFeed(0)

λ.log(Array.from({ length: mockAsyncFeed.length }, (_, i) => i))
*/
const sum = (...args) => {
  console.log(`- args.length ${args.length}`)
  let result = 0
  for (const arg of args) {
    result += arg
  }
  return result;
}

console.log(sum(10, 20, 30, 40, 50))

const curry = fn => {
  const N = 5
  return function curried (...args) {
    console.log(args)
    if (args.length == N) {
      return fn.apply(this, args);
    } else {
      return (...args2) => curried.apply(this, args.concat(args2));
    }
  };
}

const Fun = curry(sum)
console.log(Fun(10)(20)(30)(40)(50))

/*
function curry (fn) {
  const N = 5
  return function curried (...args) {
    console.log(args)
    if (args.length == N) {
      return fn.apply(this, args);
    } else {
      return (...args2) => curried.apply(this, args.concat(args2));
    }
  };
}

function sum (...args) {
  console.log(`- args.length ${args.length}`)
  let result = 0
  for (const arg of args) {
    result += arg
  }
  return result;
}
*/
function mockAsyncFeed (index, qt, pt) {
  let item = data[index]
  const id = item[0]
  if (index == 0) {
    feed(item)
    item = data[1]; qt = item[item.length - 2]; pt = item[item.length - 1]
    setTimeout(() => mockAsyncFeed(1, qt, pt), qt - pt)
    return;
  }
  feed(item)
  if (++index > data.length - 1) {
    λ.log('\n- mockAsyncFeed DONE\n')
    return;
  }
  item = data[index]; qt = item[item.length - 2]; pt = item[item.length - 1]
  setTimeout(() => mockAsyncFeed(index, qt, pt), qt - pt)
}

function feed (item) {
  const id = item[0], qt = item[item.length - 2], pt = item[item.length - 1]
  if (pt == 0) {
    λ.log(`${id}: ${qt}`)
    return;
  }
  let delta  = qt - pt
  if (delta > 1500) {
    λ.log('')
  }
  λ.log(`${id}: ${qt} >>>  ∆ ${delta}`)
}
