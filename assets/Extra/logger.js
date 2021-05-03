// Modules
const fs = require("fs");

// Files

// Extra

exports.consoleLog = function() {

}

exports.DiscordLog = function() {

}

exports.Log_Attack = function() {

}

exports.Log_Login = function() {

}

exports.LogCmd = function(output) {
    fs.appendFileSync("./assets/db/users.db", "utf8");
    
}