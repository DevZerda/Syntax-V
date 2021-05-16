// Modules

// Files
const Crud = require("./crud");


exports.login = async function(user, pass, ip) {
    if(user === "undefined" || pass === "undefined" || ip === "undefined") return "[x] Error, Invalud argument value!";

    let get_user = await Crud.GetUser(user, "arr");
    console.log(get_user);
    if(get_user === "[x] Error, No user found!") return "[x] Error, Username or password seem to be incorrect!. Try again";

    let info = get_user;

    //Debugging / Ignore
    console.log("Username Input: " + user);
    console.log("Password Input: " + pass);
    console.log("Current IP: " + ip);
    console.log("Closest matching Username Fetched from DB: " + get_user[0]);
    console.log("Closest matching Password Fetched from DB: " + get_user[2]);
    console.log("IP Fetched from DB: " + get_user[1] + "\r\n\r\n");


    let depend = ((user === get_user[0] && pass === get_user[2]) ? "[+] Successfully logged in, Welcome: " + user : "[x] Error, Username or password seem to be incorrect!. Try again");
    // ((info[1] === "none") ? Crud.changeIP(user, ip) : 0); // Change IP to current if IP equals to 'none'
    (depend == "[+]" ? Crud.LogSession(user, ip) : 0); // Log Session
    (depend == "[+]" ? eExtra.log_login(user, ip) : 0); // Log Login
    console.log(depend);
    return depend;
}