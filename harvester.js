/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
module.exports = function (creep) {

    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
        creep.say("0 harv");
    }
    else {

        var exts = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function (i) {
                return STRUCTURE_EXTENSION == i.structureType
            }
        });

        var foundExt = false;
        for (var inx in exts) {
            var ext = exts[inx];

            if (ext.energy < ext.energyCapacity){
                foundExt = true;
                creep.moveTo(ext);
                creep.transferEnergy(ext);
                creep.say("harv ext");
                break;
            }
        }

        if (!foundExt){
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)
            creep.say("harv");
        }

    }
}