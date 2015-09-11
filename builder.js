/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
module.exports = function (creep) {

    if (creep.carry.energy == 0) {
        creep.say('need energy');
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
    }
    else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            creep.say('got work');
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        } else {
            var structuresNeedsRepair = findRepo(30000);

            if (structuresNeedsRepair.length) {
                creep.say('rep 30000');
                creep.moveTo(structuresNeedsRepair[0]);
                creep.repair(structuresNeedsRepair[0]);
            }  
            else {
                
                var structuresNeedsRepair = findRepo(3000);
                if (structuresNeedsRepair.length) {
                creep.say('rep 3000');
                creep.moveTo(structuresNeedsRepair[0]);
                creep.repair(structuresNeedsRepair[0]);
                } else {
                  creep.say('no work');
                } 
                
            }
        }
    }
}    


function findRepo(divider){
             var structuresNeedsRepair = Game.rooms.E9N14.find(FIND_STRUCTURES, {
                filter: function (i) {
                    return ("constructedWall" == i.structureType) && (i.hits < i.hitsMax/divider);
                }
            });
            return structuresNeedsRepair;
}