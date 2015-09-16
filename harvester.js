/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
module.exports = function (creep, exts) {

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
        creep.say('0 harv');
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
        creep.say('load harv');
    }
    else {

        creep.memory.mode = 'WORK';
        var foundExt = false;
        for (var inx in exts) {
            var ext = exts[inx];

            if (ext.energy < ext.energyCapacity){
                foundExt = true;
                creep.moveTo(ext);
                creep.transferEnergy(ext);
                creep.say("ext harv ext");
                break;
            }
        }

        if (!foundExt){
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)
            creep.say("harv");
        }

    }
};