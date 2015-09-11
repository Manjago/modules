var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');

var guardCount = 0;
var hCount = 0;
var bCount = 0;


for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
        harvester(creep);
        ++hCount;
    }

    if (creep.memory.role == 'builder') {
        builder(creep);
        ++bCount;
    }

    if (creep.memory.role == 'guard') {
        guard(creep);
        ++guardCount;

    }

    if (creep.memory.role == 'upgrader') {
        upgrader(creep);

    }
}

if (Game.spawns.Spawn1.energy >= 300) {

    if (guardCount < 3) {
        Game.spawns.Spawn1.createCreep([TOUGH, ATTACK, MOVE, MOVE], null, {role: 'guard'});
    } else if (hCount < 4) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});
    } else if (bCount < 3) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'builder'});
    }
    else {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'upgrader'});
    }
}
      
    
 