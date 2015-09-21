
var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var upgrader = require('upgrader');
var healer = require('healer');
var spawner = require('spawner');

const GUARD = 'guard';
const HARVESTER = 'harvester';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';
const HEALER = 'healer';

Energy.prototype.findClosestCarrier = function() {
    return this.pos.findClosestByPath(FIND_MY_CREEPS, { filter: function(i) {
        return i.getActiveBodyparts(CARRY) > 0 && (i.carry.energy < i.carryCapacity);
    }});
};

module.exports.loop = function() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log('creep ' + name + 'with role ' + Memory.creeps[name].role + " die");
            delete Memory.creeps[name];
        }
    }

    for (var name in Memory.spawns) {
        if (!Game.spawns[name]) {
            delete Memory.spawns[name];
        }
    }

    var gCount = 0;
    var hCount = 0;
    var bCount = 0;
    var uCount = 0;
    var healCount = 0;

    var mainRoom;
    for (var ind in Game.rooms){
        mainRoom = Game.rooms[ind];
        break;
    }

    var exts = mainRoom.find(FIND_MY_STRUCTURES, {
        filter: function (i) {
            return STRUCTURE_EXTENSION == i.structureType
        }
    });

    var roads = mainRoom.find(FIND_STRUCTURES, {
        filter: function (i) {
            return STRUCTURE_ROAD == i.structureType && (i.hits < i.hitsMax);
        }
    });

    var sources = mainRoom.find(FIND_SOURCES);

    var spawns = mainRoom.find(FIND_MY_SPAWNS);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == HARVESTER) {
            harvester.task(creep, exts, sources, spawns);
            ++hCount;
        }

        if (creep.memory.role == BUILDER) {
            builder.task(creep, roads, bCount == 0);
            ++bCount;
        }

        if (creep.memory.role == GUARD) {
            guard.task(creep);
            ++gCount;
        }

        if (creep.memory.role == UPGRADER) {
            upgrader.task(creep);
            ++uCount;
        }

        if (creep.memory.role == HEALER) {
            healer.task(creep);
            ++healCount;
        }

    }

    mainRoom.find(FIND_DROPPED_ENERGY).forEach(function(energy) {
        var creep = energy.findClosestCarrier();
        if (creep != null && energy != null){
            creep.moveTo(energy);
            creep.pickup(energy);
            creep.say("dropped");
            if (creep.carry.energy > 0){
                console.log('' +  creep + ' has energy ' + creep.carry.energy + ' and ready work');
                creep.memory.mode = 'WORK';
            }
        }
    });

    spawn(gCount, hCount, bCount, uCount, healCount);

    function sp(role, cost){
        console.log('spawn ' + role + ' ' + cost);
        Game.spawns.Spawn1.createCreep(spawner.task(role, cost), null, {role: role});
    }

    function spawn(guardCount, harvesterCount, builderCount, upgraderCount, healerCount) {

        var ee = Game.spawns.Spawn1.energy;
        var extCount = 0;
        for (var inx in exts) {
            ++extCount;
            ee = ee + exts[inx].energy;
        }

        var cost = 0;

        if (extCount < 5 && ee >= 300){
            cost = 300;
        } else if (extCount < 10 && ee >= 550) {
            cost = 550;
        } else if (extCount < 20 && ee >= 800) {
            cost = 800;
        } else if (extCount >= 20 && ee >= 800){
            cost = 800;
        }

        // ��������� �� �������� �������
        if (harvesterCount == 0 && cost == 0){
            cost = 300;
        }

        if (cost != 0){
            if (harvesterCount < 2) {
                sp(HARVESTER, cost);
            } else if (guardCount < 1) {
                sp(GUARD, cost);
            } else if (healerCount < 1) {
                sp(HEALER, cost);
            } else if (builderCount < 1) {
                sp(BUILDER, cost);
            } else if (upgraderCount < 1) {
                sp(UPGRADER, cost);
            } else if (guardCount < 2) {
                sp(GUARD, cost);
            } else if (harvesterCount < 4) {
                sp(HARVESTER, cost);
            } else if (builderCount < 4) {
                sp(BUILDER, cost);
            } else if (upgraderCount < 2) {
                sp(UPGRADER, cost);
            } else {
                // do nothing
            }
        }

    }

};


