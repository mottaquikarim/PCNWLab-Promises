const fs = require('fs');
const request = require('request');

const readFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./${fileName}.json`, (err, data) => {
            if (err) {
                reject();
            } else if (data) {
                resolve(JSON.parse(data));
            };
        });
    });
};

const writeFilePromise = (fileName, data) => {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data);
        fs.writeFile(`./${fileName}.json`, data, (err) => {
            if (err) {
                reject();
            } else {
                resolve();
            }
        });
    });
};

const readTxtFilePromise = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./${fileName}.txt`, 'utf-8', (err, data) => {
            if (err) {
                reject();
            } else if (data) {
                resolve(data);
            };
        });
    });
};


const writeTxtFilePromise = (fileName, data) => {
    return new Promise((resolve, reject) => {

        fs.writeFile(`./${fileName}.txt`, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const copyFile = (fileName) => {

    return new Promise((resolve, reject) => {
        readFilePromise(fileName)
            .then((data) => {
                writeFilePromise(`${fileName}_copy`, data)
                    .then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    });
            })
    });
};

// const copyFile2 = fileName => readFilePromise(fileName)
//     .then(data => writeFilePromise(`${fileName}_copy`, data))

// copyFile2('index.js').then(_ => console.log('look ma im done'))





const arr = ['test', 'test_copy', 'test2', 'test3'];

const concatFiles = (arr) => {

    const newData = [];

    for (let i = 0; i < arr.length; i++) {
        const currentFile = arr[i]

        const f = readFilePromise(currentFile)
        newData.push(f);
    };

    return Promise.all(newData)
};


// concatFiles(arr).then( (data)=> {
//     console.log(data.reduce((acc,e) => {
//         acc += JSON.stringify(e);
//         return acc;
//     }, ''))
// });


// writeFilePromise('test2', {
//         name: 'Robert',
//         age: 30
//     }).then( () => {
//         return writeFilePromise('test3', {
//             name: 'Robert',
//             age: 30
//         });
//     }).then(() => {
//         return concatFiles(['test', 'test_copy', 'test2', 'test3'], 'concat');
//     }).then(() => {
//         console.log('All files should have been concated')
//         // return readFilePromise('concat');
//     }).catch(()=> {
//         console.log('Files Failed to concat');
//     })

// writeFilePromise('test', {
//     name: 'Robert',
//     age: 30
// }).then(() => {
//     return readFilePromise('test');
// }).then((data) => {
//     console.log(data);
// }).catch(() => {
//     console.log(`Error: could not read`);
// });

// copyFile('test')
//     .then(() => {
//         console.log('test copied')
//     });

// writeTxtFilePromise('foo', "One,World,Two,Lives");

const splitFiles = (fileName, delimiter = '\n') => {
    return readTxtFilePromise(fileName)
        .then((originalData) => {
            const arr = originalData.split(delimiter);
            const prom = arr.reduce((acc, e, i) => {
                acc.push(writeTxtFilePromise(`${fileName}-${i}`, e))
                return acc;
            }, [])
            return Promise.all(prom);
        });
};

// readTxtFilePromise('foo')
// .then((data)=> {
//     console.log(data);
// })

/*
splitFiles('foo', ',').then(()=> {
    console.log('it worked')
}, () => {
    console.log('it broke')
})

*/

const requestPromise = (url) => {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if (err) reject(err)
            else resolve(res, body);
        })
    });
};


const api_key = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';
const search = 'avengers';
const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=2`;



// const firstRequest = requestPromise(url)
    // .then((res, body) => {

    //     console.log('res body', JSON.parse(res.body));
    //     console.log('body', body);

    // }).catch((err) => {
    //     console.log(err);
    // })



const search2 = 'spongebob';
const url2 = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search2}&limit=2`;
// const secondRequest =requestPromise(url2)

/*
Promise.all([firstRequest, secondRequest])
.then((data) => {
    console.log(data);
})
*/
/*
Open Weather
const api_key = '2d3d97dc77ad68ed64beb4e04ea81937';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api_key}`;

*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*

API: Dark Sky 
const api_key = '2997b4a60f5867d642c137e48b2245b3';
const url = `https://wt-taqqui_karim-gmail_com-0.sandbox.auth0-extend.com/darksky?api_key=${api_key}&lat=${lat}&lng=${lon}`;

*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*~~~~*

Giphy

const api_key = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';
*/


const OW_key = '2d3d97dc77ad68ed64beb4e04ea81937';
const location = 'New York City';
const OW_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${OW_key}`;

requestPromise(OW_URL)
.then((res, body) => {
    // console.log('res: ', res)
    console.log('body: ', body)
    console.log('SUCCESS!')

}, (err) => {
    console.log('There was an ERROR: ', err)
})