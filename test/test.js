const λ = require('..')
const assert = require('assert')

λ.log('Hello World')

// we create AsyncEffect that expects a number from 0 to 1
// and based on that, it resolve or rejects 10 milliseconds after it is triggered
const myAsyncEffect = λ.AsyncEffect.of(
  reject => resolve =>
  setTimeout(
    () => Math.random() > 0.5 ? resolve('success') : reject('failure'), 
    10
  )
);

// when you are ready, you can call trigger to trigger the side effect
// nothing is executed until the trigger is called
myAsyncEffect.trigger(error => λ.log(error))(result => λ.log(result));
// => logs 'random success' or 'random failure' depending on Math.random() value
