var harvester = require('harvester');
var builder = require('builder');
const GUARD = 'guard';
var guard = require(GUARD);
var upgrader = require('upgrader');

const HARVESTER = 'harvester';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';

var gCount = 0;
var hCount = 0;
var bCount = 0;

for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == HARVESTER) {
        harvester(creep);
        ++hCount;
    }

    if (creep.memory.role == BUILDER) {
        builder(creep);
        ++bCount;
    }

    if (creep.memory.role == GUARD) {
        guard(creep);
        ++gCount;

    }

    if (creep.memory.role == UPGRADER) {
        upgrader(creep);

    }

    spawn(gCount, hCount, bCount);
}

function spawn(guardCount, harvesterCount, builderCount){
    if (Game.spawns.Spawn1.energy >= 300) {

        if (guardCount < 3) {
            Game.spawns.Spawn1.createCreep([TOUGH, ATTACK, ATTACK, MOVE, MOVE], null, {role: GUARD});
        } else if (harvesterCount < 4) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: HARVESTER});
        } else if (builderCount < 3) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: BUILDER});
        }
        else {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, CARRY, MOVE], null, {role: UPGRADER});
        }
    }

}
    
 