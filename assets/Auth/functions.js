// Files
const Crud = require("./crud.js");

exports.isPremium = async function(user) {
    accInfo = await Crud.GetUser(user, "arr");
    switch(parseInt(accInfo[3])) {
        case 0:
            return false;
        case 1 || 2 || 3 || 4 || 5:
            return true;
    }
}

exports.isReseller = async function(user) {
    accInfo = await Crud.GetUser(user, "arr");
    return (parseInt(accInfo[5]) === 1 ? true : false);
}

exports.isAdmin = async function(user) {
    accInfo = await Crud.GetUser(user, "arr");
    return (parseInt(accInfo[5]) === 2 ? true : false);
}

exports.resetIP = function(user) {
    ((fs.readFileSync("./assets/db/users.db")).split("\n")).forEach(e => {
        ((e.includes(user)) ? (((e.split("('").join("")).split("')").join("")).split("','").join(",")) : "[x] Error, No user found!");
    });
}

exports.changePW = function() {
    
}