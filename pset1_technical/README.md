## Technical

This PSET is intended to gauge your technical understanding of promises.

## Starter code

```js
const alwaysSuccessful = () => new Promise(resolve => setTimeout(resolve, 1000))
const alwaysFailure = () => new Promise((resolve, reject) => setTimeout(reject, 1000))
const randomNumber = () => new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random()*10)), 1000))
const sometimesSuccessful = () => randomNumber().then(k => k % 2 === 0 ? alwaysSuccessful() : alwaysFailure())
```

## Problems

Using the 4 functions above, implement the following...

### 1

Using `alwaysSuccessful`, console.log `hello!` after 1 second. (Note, alwaysSuccessful has a setTimeout already baked into it, how can you use promises to achieve this?)
