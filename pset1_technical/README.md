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

### 2

Using `alwaysFailure`, console.log `hello!` after 1 second. (Note, alwaysFailure will reject everytime, how can you use promises to achieve this?)


### 3

Using `alwaysSuccessful` and **then** `alwaysFailure`, first console.log out "hello, success" after 1 second and then "hello, failure" after another second

### 4

Using `randomNumber`, console.log out 3 random numbers, in order (ie: random number 1 is displayed after 1 second, then 1 second later, random number 2 is displayer, etc)

### 5

Call `sometimesSuccessful` three times, console.log('done') on success. if any of them fails, it should console.log('err') and NOT run the remaining invocations. For instance, if the FIRST sometimesSuccessful call fails, all you should see is 'err' in the console. However, if only the THIRD fails, then you should see 'done', 'done', 'err' in console


### 6

Call `sometimesSuccessful` three times, after each invocation, console.log('invocation complete!') regardless of whether it failed or not

### 7 

Call `randomNumber` three times, but NOT sequentially. Have one promise that displays all three random numbers (HINT: look at Promise.all)

### 8

Call `randomNumber` three times, SEQUENTIALLY. (ie: 1 sec passes, first randomNum generated, then another sec passes and second randomNum generated, etc). After all three have resolved, console.log the random numbers generated for all THREE invocations in one console.log. For instance, if the three invocations generates first 1, then 2, then 3, console should output `1,2,3`
