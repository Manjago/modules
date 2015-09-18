var lodash = require('lodash');


switch('g1'){
    case 'h':
        console.log('bad');
        break;
    case 'g':
        console.log('good');
        break;
    default:
        console.log('def');
        break;
}

var costs = [{cost: 100, part: 12}, {cost: 200, part: 13}];
console.log(costs);

var myMap = new Map();
myMap.set(1, "value associated with 'a string'");
console.log(myMap);

/*

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
*/
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