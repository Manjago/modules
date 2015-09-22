'use strict';
module.exports.task = function (num, creep, sources, spawns) {

    function loadFromSource(){
        if (sources.length){
            var inda = num % sources.length;
            creep.moveTo(sources[inda]);
            creep.harvest(sources[inda]);
        }
    }


    function tryHarvExt(){
        var foundExt = false;

        var myexts = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function (i) {
                return STRUCTURE_EXTENSION == i.structureType && (i.energy < i.energyCapacity);
            }
        });

        if (myexts.length){
            var inda = num % myexts.length;
            var ext = myexts[inda];
            foundExt = true;
            creep.moveTo(ext);
            creep.transferEnergy(ext);
            creep.say(num + " harv " + inda);
        }

        return foundExt;
    }

    function tryHarvSpawns(){
        var foundSpwn = false;
        for (var inx in spawns) {
            var spwn = spawns[inx];

            if (spwn.energy < spwn.energyCapacity){
                foundSpwn = true;
                creep.moveTo(spwn);
                creep.transferEnergy(spwn);
                creep.say(num + "spawn harv");
                break;
            }
        }
        return foundSpwn;
    }

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        loadFromSource();
        creep.say(num + ' no harv');
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        loadFromSource();
        creep.say(num +' load harv');
    }
    else {

        creep.memory.mode = 'WORK';

        if (tryHarvSpawns()){
            return;
        }

        if (tryHarvExt()){
            return;
        }

        creep.say(num + ' harv no work');

    }
};