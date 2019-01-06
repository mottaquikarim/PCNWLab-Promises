const alwaysSuccessful = () => {
    return new Promise(resolve => setTimeout(resolve, 1000))
};

const alwaysFailure = () => {
    return new Promise((resolve, reject) => setTimeout(reject, 1000))
};

const randomNumber = () => {
    return new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 10)), 1000))
};

const sometimesSuccessful = () => {
    return randomNumber().then(k => k % 2 === 0 ? alwaysSuccessful() : alwaysFailure())
};


// problem 1
alwaysSuccessful()
    .then(() => {
        console.log('hello');;
    });

// problem 2 

alwaysFailure()
    .then(() => {
        console.log('this will never fire');
    }, _ => {
        console.log('hello failure');
    });

//problem 3

alwaysSuccessful()
    .then(() => {
        console.log('hello success');;
        return alwaysFailure()
    }).then(() => {
        console.log('this will never fire');
    }, _ => {
        console.log('hello failure problem 3');
    });

//problem 4

randomNumber()
.then( (rnd) => {
    console.log('First Random', rnd);
    return randomNumber();
}).then( (rnd) => {
    console.log('Second Random', rnd);
    return randomNumber();
}).then( (rnd) => {
    console.log('Third Random', rnd);
});