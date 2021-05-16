// Modules
const fs = require("fs");
const f = require("node-fetch");

// Files
const Banner = require("../banner_system/main.js");
const Extra = require("../Extra/main.js");
const C = require("../Config/current.js").CurrentCmd;
const Config = require("../Config/main.js");

// Extra

exports.PortScan = async function() {
    let getPorts = await(await f(`https://api.hackertarget.com/nmap/?q=${C.arg[1]}`)).text();
    let results = "";
    getPorts.split("\n").forEach(e => {
        if(e.includes("open")) {
            results += "                    " + ((((e.split(" ").join(",")).split(",,,").join(" ")).split(",,").join(",")).split(",").join(" ").split(" ") + "\r\n");
        } else if(e.includes("closed")) {
            results += "                    " + ((((e.split(" ").join(",")).split(",,,").join(" ")).split(",,").join(",")).split(",").join(" ").split(" ") + "\r\n");
        } else if(e.includes("filter")) {
            results += "                    " + ((((e.split(" ").join(",")).split(",,,").join(" ")).split(",,").join(",")).split(",").join(" ").split(" ") + "\r\n");
        }
    })
    return this.ColorPortScan(results)
}

exports.ColorPortScan = function(r) {    
    lines = r.split("\n");
    let results = "";
    lines.forEach(e => {
        if(e.length < 4) return;
        let shit = e.split(",");
        results += Config.Colors.Red + shit[0] + " " + Config.Colors.Yellow + shit[1] + " " + Config.Colors.Red + shit[2] + "\n";
    })
    return results;
}
