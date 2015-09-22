'use strict';

function SpawnParam(role, cost) {
    this.role = role;
    this.cost = cost;
}

console.log(new SpawnParam('f', 3));

function func() {
    console.log(this);
}

const GUARD = 'guard';
const HARVESTER = 'harvester';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';
const HEALER = 'healer';


var info = {
    'harvester': 0,
    builder: 0,
    fff: function () {
        return this.harvester * 2 + this.builder;
    }
};

for (var key in info) {
    console.log(key + ' ' + info[key]);
}

info.harvester++;


var tt = HARVESTER;

console.log(func());
console.log(info[tt]);
console.log(info['harvester']);
console.log(info[HARVESTER]);
console.log(info);
console.log(info.fff());
console.log(info['gg']);
console.log(info['gg'] === undefined);

if (info['builder']) {
    console.log('ok');
} else {
    console.log('nook');
}