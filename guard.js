'use strict';
module.exports.task = function (creep) {

    var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: function(i) {
            return "Source Keeper" != i.owner.username;
        }
    });
    if (targets.length) {
        creep.moveTo(targets[0]);
        creep.rangedAttack(targets[0]);
        creep.attack(targets[0]);
    } else {
        creep.moveTo(Game.flags.Flag1);
    }

};