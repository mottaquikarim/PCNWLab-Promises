# Practical

This PSET is intended to gauge your ability to use promises on the frontend / to solve problems, actually

## Problems

### 1

On the frontend, write a function that uses the following but returns a promise:

```js
const GET = (url, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = e => {
    cb(e.target.responseText);
  }
  xhr.send();
}

// usage
GET('http://foo/bar', data => {
  console.log('this is response data', data)
})
```

So our function, `GETPromise` should somehow return a promise that calls `GET` and resolves once data is back, so we can do...

```
GETPromise('http://foo/bar').then(data => console.log('response data in promise!', data))
```

### 2

On the frontend, use the `GETPromise` from above to make three consecutive API calls (giphy API is fine) in sequential order

### 3

Taq's interview question:

Given a list of imageUrls, load each image sequentially. For example,

```js
loadImages(['http://url/to/img/a', 'http://url/to/img/b', 'http://url/to/img/c']) 
```

will first load AND render image a, THEN will load and render image b, etc
