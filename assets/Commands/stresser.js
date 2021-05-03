// Modules
const C = require("../Config/current.js").CurrentCmd;
// Files

// Extra

exports.Stresser = function(socket) {
    let argCount = (C.arg).length;

    if(argCount < 4 || argCount > 4) {
        return "[x] Error, Invalid argument!";
    }

    socket.write("lul");
}