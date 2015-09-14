for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
    }
}

for (var name in Memory.spawns) {
    if (!Game.spawns[name]) {
        delete Memory.spawns[name];
    }
}

var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');
var healer = require('healer');

const GUARD = 'guard';
const HARVESTER = 'harvester';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';
const HEALER = 'healer';

var gCount = 0;
var hCount = 0;
var bCount = 0;
var uCount = 0;
var healCount = 0;

var mainRoom = Game.rooms.E12N2;

var exts = mainRoom.find(FIND_MY_STRUCTURES, {
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

    if (creep.memory.role == HEALER) {
        healer(creep);
        ++healCount;
    }

}

spawn(gCount, hCount, bCount, uCount, healCount);

function spawn(guardCount, harvesterCount, builderCount, upgraderCount, healerCount) {

    var ee = Game.spawns.Spawn1.energy;
    var extmode = false;
    for (var inx in exts) {
        extmode = true;
        ee = ee + exts[inx].energy;
    }

    if (extmode && ee >= 550) {

        if (harvesterCount < 1) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null, {role: HARVESTER});
        } else if (guardCount < 1) {
            Game.spawns.Spawn1.createCreep([RANGED_ATTACK, RANGED_ATTACK, ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], null, {role: GUARD});
        } else if (healerCount < 1) {
            Game.spawns.Spawn1.createCreep([HEAL, HEAL, MOVE], null, {role: HEALER});
        } else if (guardCount < 3) {
            Game.spawns.Spawn1.createCreep([RANGED_ATTACK, RANGED_ATTACK, ATTACK, MOVE, MOVE], null, {role: GUARD});
        } else if (harvesterCount < 5) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], null, {role: HARVESTER});
        } else if (builderCount < 2) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: BUILDER});
        }
        else if (upgraderCount < 3) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: UPGRADER});
        } else {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: UPGRADER});
        }
    } else if (ee >= 300) {

        if (harvesterCount < 1) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: HARVESTER});
        } else if (guardCount < 1) {
            Game.spawns.Spawn1.createCreep([RANGED_ATTACK, ATTACK, MOVE, TOUGH, TOUGH], null, {role: GUARD});
        } else if (healerCount < 1) {
            Game.spawns.Spawn1.createCreep([HEAL, MOVE], null, {role: HEALER});
        } else if (guardCount < 3) {
            Game.spawns.Spawn1.createCreep([RANGED_ATTACK, ATTACK, MOVE], null, {role: GUARD});
        } else if (harvesterCount < 5) {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: HARVESTER});
        } else if (builderCount < 2) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: BUILDER});
        }
        else if (upgraderCount < 3) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: UPGRADER});
        } else {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: UPGRADER});
        }

    }

}
