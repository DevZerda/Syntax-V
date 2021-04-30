// Modules
const Net = require('net');

// Files
const Crud = require("../Auth/crud.js");

// Extra Const
const port = 455; //getRandomInt(65500);
exports.Server = new Net.Server();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

this.Server.listen(port, function() {
    console.log("Server started! => "  + port);
    Crud.resetSessions();
});