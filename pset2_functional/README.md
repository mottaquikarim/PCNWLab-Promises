# Functional

This pset is intended to guage your ability to _use_ promises for practical purposes

## Problems

### 1

We know how to use `fs.readFile` - 

```js
const fs = require('fs')
fs.readFile('filename', 'utf-8', (err, data) => console.log(err, data))
```

This is fine but becomes cumbersome when we want to read multiple files, etc. Write a function `readFilePromise` that returns a promise with file data on success or err info on fail.
