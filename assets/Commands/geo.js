// Modules
const fs = require("fs");
const f = require("node-fetch");

// Files
const Banner = require("../banner_system/main.js");
const C = require("../Config/current.js").CurrentCmd;
const Config = require("../Config/main.js");
const Extra = require("../Extra/main.js");

// Extra

exports.GeoIP = async function(socket) {
    if((C.arg).length === 2) {
        let geoResult = JSON.parse(await(await f(`http://ip-api.com/json/${C.arg[1]}`)).text());
        let result = "";
        Object.keys(geoResult).forEach(key => {
            result += ("                    " + Config.Colors.Red + (key[0].toUpperCase() + key.slice(1)) + Config.Colors.Yellow + ": " + geoResult[key] + "\r\n");
        })
        socket.write(result);
    } else {
        socket.write("[x] Error, Invalid argument\r\nUsage: geo <ip>\r\nExample: geo 5.5.5.5\r\n");
    }
    socket.write("\r\n" + Banner.ModifyBanner("hostname"));
    Extra.MoveCursorToLeft(31, socket);
    Extra.MoveCursorUp(1, socket);
}