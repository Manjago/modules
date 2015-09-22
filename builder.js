'use strict';
module.exports.task = function (num, creep, roads) {

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
            creep.say(num + ' work ext');
            moveAndBuild(targets);
            return true;
        } else {
            return false;
        }
    }

    function tryRepairRoad(roads) {

        if (!roads.length) {
            return false;
        }

        var roadMode = Memory.roadMode;
        if (!roadMode){
            roadMode = 1;
            Memory.roadMode = 1;
        }

        if (roads.length > 10 && roadMode == 1){
            roadMode = 2;
            Memory.roadMode = 2;
        } else if (roads.length < 5 && roadMode == 2){
            roadMode = 1;
            Memory.roadMode = 1;
        }

        switch (roadMode){
            case 1:
                if (num != 0) {
                    return false;
                }
                break;
            case 2:
                if (num != 0 && num != 1) {
                    return false;
                }
                break;
            default:
                break;
        }

        creep.say(num + ' road ' + roads.length + '!');
        var inda;

        if (num == 0){
            inda = 0;
        } else {
            inda = roads.length - 1;
        }

        creep.moveTo(roads[inda]);
        creep.repair(roads[inda]);
        return true;
    }

    function moveAndBuild(targets) {
        if (targets.length) {
            var inda = num % targets.length;
            creep.moveTo(targets[inda]);
            creep.build(targets[inda]);
        }
    }

    function tryBuildNonExtensions() {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (i) {
                return STRUCTURE_EXTENSION != i.structureType
            }
        });
        if (targets.length) {
            creep.say(num + ' work noext');
            moveAndBuild(targets);
            return true;
        } else {
            return false;
        }
    }

    function tryRepair(coeff) {
        var structuresNeedsRepair = findRepo(coeff, creep.room);

        if (structuresNeedsRepair.length) {
            creep.say(num + ' rep ' + coeff);
            var inda = num % structuresNeedsRepair.length;
            creep.moveTo(structuresNeedsRepair[inda]);
            creep.repair(structuresNeedsRepair[inda]);
            return true;
        } else {
            return false;
        }
    }

    function tryRepairAll() {
        var hasWork = false;
        for (var i = 300; i >= 0; i -= 10) {
            if (tryRepair(i)) {
                hasWork = true;
                break;
            }
        }
        return hasWork;
    }

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        creep.say(num + ' b 0 energy');
        loadFromSource();
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        creep.say(num + ' b load ' + (creep.carry.energy / creep.carryCapacity));
        loadFromSource();
    } else {

        creep.memory.mode = 'WORK';

        if (tryRepairRoad(roads)) {
            return;
        }

        if (tryBuildExtensions()) {
            return;
        }

        if (tryBuildNonExtensions()) {
            return;
        }

        if (!tryRepairAll()) {
            creep.say(num + ' no work');
            creep.moveTo(Game.flags.FlagBuilder);
        }


    }


};


