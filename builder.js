/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
module.exports = function (creep) {

    function findRepo(divider, room) {
        return room.find(FIND_STRUCTURES, {
            filter: function (i) {

                if (divider == 0) {
                    return (i.hits < i.hitsMax);
                } else {
                    return (i.hits < i.hitsMax / divider);
                }

            }
        });
    }

    function loadFromSource() {
        var sources = creep.room.find(FIND_SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }

    function tryBuildExtensions() {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (i) {
                return STRUCTURE_EXTENSION == i.structureType
            }
        });
        if (targets.length) {
            creep.say('work ext');
            moveAndBuild(targets);
            return true;
        } else {
            return false;
        }
    }

    function moveAndBuild(targets) {
        creep.moveTo(targets[0]);
        creep.build(targets[0]);
    }

    function tryBuildNonExtensions() {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (i) {
                return STRUCTURE_EXTENSION != i.structureType
            }
        });
        if (targets.length) {
            creep.say('work noext');
            moveAndBuild(targets);
            return true;
        } else {
            return false;
        }
    }

    function tryRepair(coeff){
        var structuresNeedsRepair = findRepo(coeff, creep.room);

        if (structuresNeedsRepair.length) {
            creep.say('rep ' + coeff);
            creep.moveTo(structuresNeedsRepair[0]);
            creep.repair(structuresNeedsRepair[0]);
            return true;
        } else {
            return false;
        }
    }

    function tryRepairAll() {
        var hasWork = false;
        for (var i = 3000; i >= 0; i -= 100) {
            if (tryRepair(i)) {
                hasWork = true;
                break;
            }
        }
        return hasWork;
    }

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        creep.say('b 0 energy');
        loadFromSource();
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        creep.say('b load');
        loadFromSource();
    } else {

        creep.memory.mode = 'WORK';

        if (tryBuildExtensions()) {
            return;
        }

        if (tryBuildNonExtensions()) {
            return;
        }

        if (!tryRepairAll()){
            creep.say('no work');
            creep.moveTo(Game.flags.FlagBuilder);
        }


    }


};


