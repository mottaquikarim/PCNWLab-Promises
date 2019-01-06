const fs = require('fs');

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

copyFile2('index.js').then(_ => console.log('look ma im done'))

const concatFiles = (fileNames, newFile) => {
     

    return new Promise((resolve, reject) => {
        const newData = [];
        for (let i = 0; i < fileNames.length; i++) {
            console.log(`in for loop`)

            const currentFile = fileNames[i];

            readFilePromise(currentFile)
                .then((data) => {
                    console.log(data);
                    newData.push(data);
                }).catch(() => {
                    console.log('failed to read', currentFile);
                });
        };

        console.log(`past for loop`)

        writeFilePromise(newFile, newData)
        .then(() => {
            console.log(`write for loop promise`)
            resolve();
        }).catch(() => {
            reject();
        });

    });

};


writeFilePromise('test2', {
        name: 'Robert',
        age: 30
    }).then( () => {
        return writeFilePromise('test3', {
            name: 'Robert',
            age: 30
        });
    }).then(() => {
        return concatFiles(['test', 'test_copy', 'test2', 'test3'], 'concat');
    }).then(() => {
        console.log('All files should have been concated')
        // return readFilePromise('concat');
    }).catch(()=> {
        console.log('Files Failed to concat');
    })

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