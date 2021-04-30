// Modules
const fs = require("fs");

// Extra

exports.GetUser = async function(user, type) {
    return new Promise((resolve, reject) => {
        const lines = fs.readFileSync('./assets/db/users.db', 'utf8').split('\n')
        for (const line of lines) {
            const user_split = line.replace(/\('|'\)/g, '').split(`','`)
            const user_line = user_split.join(',')
            if (user_split[0] === user) {
                resolve(type === "str" ? user_line : user_split);
            }
        }
        return "No user found";;
    })
}

exports.addUser = function(user, passwd, lvl, mtime, admin) {
    fs.appendFileSync("./assets/db/users.db", "('" + user + "','" + passwd + "','" + lvl + "','" + mtime + "','" + admin + "')\n");
    return "User: " + user + " successfully added!";
}

exports.removeUser = function(user) {
    let new_db = "";
    ((fs.readFileSync("./assets/db/users.db", "utf8")).split("\n")).forEach(e => {
        if(e.length <= 3) return
        if(!e.includes(user)) { new_db += e + "\n"; }
    })
    fs.writeFileSync("./assets/db/users.db", new_db);
    return "[x] User: " + user + " successfully removed!\r\n";
}

exports.updateUser = async function(user, lvl, mtime, admin) {
    let new_db = "";
    let acctInfo = await this.GetUser(user, "arr");
    if(acctInfo === "[x] Error, No user found!") return "[x] Error, No user found to update!\r\n";
    ((fs.readFileSync("./assets/db/users.db", "utf8")).split("\n")).forEach(e => {
        if(e.length <= 3) return
        if(!e.includes(user)) {
            new_db += e + "\n";
        }
    })
    new_db += "('" + user + "','" + acctInfo[1] + "','" + acctInfo[2] + "','" + lvl + "','" + mtime + "','" + admin + "')\n";
    fs.writeFileSync("./assets/db/users.db", new_db);
    return "[x] User: " + user + " successfully removed!\r\n";
}

/*
*       Sessions
*/

exports.LogSession = function(user, ip) {
    fs.appendFileSync("./assets/db/current.db", "('" + user + "','" + ip + "')\n");
}

exports.removeSession = function(ip) {
    let new_db = "";
    ((fs.readFileSync("./assets/db/current.db", "utf8")).split("\n")).forEach(e => {
        if(!e.includes(ip)) {
            new_db += e + "\n";
        }
    })
    fs.writeFileSync("./assets/db/current.db", new_db);
}

exports.GetCurrentUser = function(ip, type) {
    return new Promise((resolve) => {
        lul = "";
        (fs.readFileSync("./assets/db/current.db", "utf8")).split("\n").forEach(user_l => {   // Looping thru all lines in db
            user_line = user_l;
            user_l = ((user_l.split("('").join("")).split("')").join("")).split("','");     //Spliting user line
            let response = (type === "str" ? user_line : user_l);
            (user_l[1] === ip ? lul : response);
        })
        resolve(lul);
    });
}

exports.resetSessions = function() {
    fs.writeFileSync("./assets/db/current.db", "");
}