/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
module.exports = function (creep) {

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        creep.say('need energy');
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        creep.say('load');
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    } else {

        creep.memory.mode = 'WORK';
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (i) {
                return STRUCTURE_EXTENSION == i.structureType
            }
        });

        if (targets.length) {
            creep.say('work ext');
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        } else {

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: function (i) {
                    return STRUCTURE_EXTENSION != i.structureType
                }
            });

            if (targets.length) {
                creep.say('work wall');
                creep.moveTo(targets[0]);
                creep.build(targets[0]);
            } else {
                //todo изжить это безобразие
                var structuresNeedsRepair = findRepo(900, creep.room);

                if (structuresNeedsRepair.length) {
                    creep.say('rep 900');
                    creep.moveTo(structuresNeedsRepair[0]);
                    creep.repair(structuresNeedsRepair[0]);
                }
                else {

                    var structuresNeedsRepair = findRepo(300, creep.room);
                    if (structuresNeedsRepair.length) {
                        creep.say('rep 300');
                        creep.moveTo(structuresNeedsRepair[0]);
                        creep.repair(structuresNeedsRepair[0]);
                    } else {
                        creep.say('no work');
                        creep.moveTo(Game.flags.FlagBuilder);
                    }

                }

            }


        }
    }
}


function findRepo(divider, room) {
    var structuresNeedsRepair = room.find(FIND_STRUCTURES, {
        filter: function (i) {
            return ("constructedWall" == i.structureType) && (i.hits < i.hitsMax / divider);
        }
    });
    return structuresNeedsRepair;
}