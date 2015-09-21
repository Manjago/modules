module.exports.task = function (num, creep, roads, first) {

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

    function tryRepairRoad(roads) {

        if(!first){
            return false;
        }

        if (roads.length) {
            creep.say('road ' + roads.length +'!');
            creep.moveTo(roads[0]);
            creep.repair(roads[0]);
            return true;
        } else {
            return false;
        }
    }

    function moveAndBuild(targets) {
        if (targets.length){
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
            creep.say('work noext');
            moveAndBuild(targets);
            return true;
        } else {
            return false;
        }
    }

    function tryRepair(coeff) {
        var structuresNeedsRepair = findRepo(coeff, creep.room);

        if (structuresNeedsRepair.length) {
            creep.say('rep ' + coeff);
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
        creep.say('b 0 energy');
        loadFromSource();
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        creep.say('b load');
        loadFromSource();
    } else {

        creep.memory.mode = 'WORK';

        if (tryRepairRoad(roads)){
            return;
        }

        if (tryBuildExtensions()) {
            return;
        }

        if (tryBuildNonExtensions()) {
            return;
        }

        if (!tryRepairAll()) {
            creep.say('no work');
            creep.moveTo(Game.flags.FlagBuilder);
        }


    }


};


