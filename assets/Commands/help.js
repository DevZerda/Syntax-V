// Modules
const fs = require("fs");

// Files
const Banner = require("../banner_system/main.js");
const Extra = require("../Extra/main.js");

// Extra

exports.help_func = function(socket) {
    socket.write(Banner.ModifyBanner("help"));
    socket.write("\r\n" + Banner.ModifyBanner("hostname"));
    Extra.MoveCursorToLeft(31, socket);
    Extra.MoveCursorUp(1, socket);
}