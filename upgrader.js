'use strict';
module.exports.task = function (creep) {

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        creep.say("u energy");
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')){
        creep.say("u load");
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }
    else {
        creep.memory.mode = 'WORK';
        if (creep.room.controller) {
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
            creep.say("upgrade");
        } else {
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)
            crrep.say("0 uprade");
        }


    }
}