// Modules

// Files
const Crud = require("./crud");

exports.Login = async function(user, pw, ip) {
    let acctInfo = await Crud.GetUser(user, "arr");
    console.log(acctInfo);
    if(acctInfo === "[x] Error, No user found!") return acctInfo;
    // if(acctInfo[1] === "none") Extra.changeIP(user);
    let response = ((acctInfo[0] === user && acctInfo[2] === pw) ? "[x] Successfully logged in. Welcome: " + user + "\r\n" : "[x] Error, Failed");
    // if(Crud.GetCurrentUser(ip, "str")) return "[x] Error, This user is already signed in. One connection per user!\r\n";
    Crud.LogSession(user, ip);
    return response;
}