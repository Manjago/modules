module.exports = function (creep) {

    var target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: function(object) {
            return object.hits < object.hitsMax;
        }
    });
    if(target) {
        creep.moveTo(target);
        creep.heal(target);
    }

};
