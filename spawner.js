module.exports = function (role, cost){

    switch(role){
        case 'guard':
            return bodyGuard(cost);
            break;
        case 'harvester':
            return bodyHarvester(cost);
            break;
        case 'builder':
            return bodyBuilder(cost);
            break;
        case 'upgrader':
            return bodyUpgrader(cost);
            break;
        case 'healer':
            return bodyHealer(cost);
            break;
    }
};

function bodyGuard(cost){

    switch(cost){
        case 300:
            return [RANGED_ATTACK, ATTACK, MOVE, TOUGH, TOUGH]; //300
        case 550:
            return [RANGED_ATTACK, RANGED_ATTACK, ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH]; //550
        case 800:
            return [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH ]; //800
    }

}

function bodyHarvester(cost){

    switch(cost){
        case 300:
            return [WORK, CARRY, CARRY, MOVE, MOVE]; // 300
        case 550:
            return [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]; // 550
        case 800:
            return [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]; // 800
    }

}

function bodyBuilder(cost){

    switch(cost){
        case 300:
            return [WORK, WORK, CARRY, MOVE]; // 300
        case 550:
            return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]; //550
        case 800:
            return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]; //800
    }

}

function bodyUpgrader(cost){

    switch(cost){
        case 300:
            return [WORK, WORK, CARRY, MOVE]; // 300
        case 550:
            return [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]; // 550
        case 800:
            return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]; // 800
    }

}

function bodyHealer(cost){

    switch(cost){
        case 300:
            return [HEAL, MOVE];
        case 550:
            return [HEAL, HEAL, MOVE];
        case 800:
            return [HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
    }

}

