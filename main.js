'use strict';
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

Energy.prototype.findClosestCarrier = function () {
    return this.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: function (i) {
            return i.getActiveBodyparts(CARRY) > 0 && (i.carry.energy < i.carryCapacity);
        }
    });
};

module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log('creep ' + name + ' with role ' + Memory.creeps[name].role + " die");
            delete Memory.creeps[name];
        }
    }

    for (var name in Memory.spawns) {
        if (!Game.spawns[name]) {
            delete Memory.spawns[name];
        }
    }

    var stats = {
        guard: 0,
        harvester: 0,
        builder: 0,
        upgrader: 0,
        healer: 0
    };

    var mainRoom;
    for (var ind in Game.rooms) {
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
            harvester.task(hCount, creep, sources, spawns);
            stats[creep.memory.role]++;
        }

        if (creep.memory.role == BUILDER) {
            builder.task(bCount, creep, roads);
            stats[creep.memory.role]++;
        }

        if (creep.memory.role == GUARD) {
            guard.task(creep);
            stats[creep.memory.role]++;
        }

        if (creep.memory.role == UPGRADER) {
            upgrader.task(creep);
            stats[creep.memory.role]++;
        }

        if (creep.memory.role == HEALER) {
            healer.task(creep);
            stats[creep.memory.role]++;
        }

    }

    mainRoom.find(FIND_DROPPED_ENERGY).forEach(function (energy) {
        var creep = energy.findClosestCarrier();
        if (creep != null && energy != null) {
            creep.moveTo(energy);
            creep.pickup(energy);
            creep.say("dropped");
            if (creep.carry.energy > 0) {
                console.log('' + creep + ' has energy ' + creep.carry.energy + ' and ready work');
                creep.memory.mode = 'WORK';
            }
        }
    });

    Memory.stats = stats;
    spawn(stats);

    function sp(role, cost) {
        console.log('spawn ' + role + ' ' + cost);
        Game.spawns.Spawn1.createCreep(spawner.task(role, cost), null, {role: role});
    }

    function spawn(options) {

        var ee = Game.spawns.Spawn1.energy;
        var extCount = 0;
        for (var inx in exts) {
            ++extCount;
            ee = ee + exts[inx].energy;
        }

        var cost = 0;

        if (extCount < 5 && ee >= 300) {
            cost = 300;
        } else if (extCount < 10 && ee >= 550) {
            cost = 550;
        } else if (extCount < 20 && ee >= 800) {
            cost = 800;
            // todo автоматическая генерация по весу - и вообще что-то надо делать
        } else if (extCount >= 20 && ee >= 800) {
            cost = 800;
        }

        // страховка от всеобщей пустоты
        if (options.harvester == 0 && cost == 0) {
            cost = 300;
        }

        // переписать этот говнокод
        if (cost != 0) {
            if (options.harvester < 2) {
                sp(HARVESTER, cost);
            } else if (options.guard < 1) {
                sp(GUARD, cost);
            } else if (options.healer < 1) {
                sp(HEALER, cost);
            } else if (options.builder < 2) {
                sp(BUILDER, cost);
            } else if (options.upgrader < 1) {
                sp(UPGRADER, cost);
            } else if (options.harvester < 3) {
                sp(HARVESTER, cost);
            } else if (options.guard < 2) {
                sp(GUARD, cost);
            } else if (options.harvester < 4) {
                sp(HARVESTER, cost);
            } else if (options.builder < 4) {
                sp(BUILDER, cost);
            } else if (options.upgrader < 2) {
                sp(UPGRADER, cost);
            } else {
                // do nothing
            }
        }

    }

};


