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
var uCount = 0;

var exts = Game.rooms.E12N2.find(FIND_MY_STRUCTURES, {
    filter: function (i) {
        return STRUCTURE_EXTENSION == i.structureType
    }
});

for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == HARVESTER) {
        harvester(creep, exts);
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
        ++uCount;
    }

    spawn(gCount, hCount, bCount, uCount);
}

function spawn(guardCount, harvesterCount, builderCount, upgraderCount) {

    var ee = Game.spawns.Spawn1.energy;
    for (var inx in exts) {
        ee = ee + exts[inx].energy;
    }



    if (ee >= 550) {

        if (guardCount < 3) {
            Game.spawns.Spawn1.createCreep([TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE], null, {role: GUARD});
        } else if (harvesterCount < 5) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null, {role: HARVESTER});
        } else if (builderCount < 3) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: BUILDER});
        }
        else if (upgraderCount < 3) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: UPGRADER});
        } else {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: BUILDER});
        }
    }

}