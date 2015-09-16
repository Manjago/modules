console.log(getRandomInt(0, 5));

function getRandomInt(min, max)
{
    var newVar = Math.floor(Math.random() * (max - min + 1)) + min;
    if(newVar > max){
        newVar = 0;
    }
    return newVar;
}