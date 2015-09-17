var lodash = require('lodash');

var data = [1, 2, 3, 4, 5];

console.log(lodash.first(data));

var res = lodash.filter(data, function(n){
    console.log(n);
    return n <= 3;
});

console.log(res);

for(var i = 3000; i >=0; i-=100){
    console.log(i);
}

/*
console.log(getRandomInt(0, 5));

function getRandomInt(min, max)
{
    var newVar = Math.floor(Math.random() * (max - min + 1)) + min;
    if(newVar > max){
        newVar = 0;
    }
    return newVar;
}
    */