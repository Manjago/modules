module.exports.task = function (creep, exts, sources, spawns) {

    function loadFromSource(){
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }


    function tryHarvExt(){
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
                creep.say("spawn harv");
                break;
            }
        }
        return foundSpwn;
    }

    if (creep.carry.energy == 0) {
        creep.memory.mode = 'LOAD';
        loadFromSource();
        creep.say('0 harv');
    } else if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.mode == 'LOAD')) {
        loadFromSource();
        creep.say('load harv');
    }
    else {

        creep.memory.mode = 'WORK';

        if (tryHarvSpawns()){
            return;
        }

        if (tryHarvExt()){
            return;
        }

        creep.say('harv no work');

    }
};