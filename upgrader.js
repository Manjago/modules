/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrader'); // -> 'a thing'
 */
module.exports = function (creep) {

    if (creep.carry.energy == 0) {
        creep.say("u energy");
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }
    else {

        if (creep.room.controller) {
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
            creep.say("uprade");
        } else {
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)
            crrep.say("0 uprade");
        }


    }
}