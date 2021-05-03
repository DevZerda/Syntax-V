
const Auth = require("./assets/Auth/crud.js");
const Login = require("./assets/Auth/main.js");

const Extra = require("./assets/Extra/main.js");

const roots = require("./assets/root_system/main.js");

let lul = process.argv;

// console.log(Auth.addUser(lul[2], lul[3], lul[4], lul[5], lul[6]))
// console.log(Auth.removeUser(lul[2]))

// Auth.LogSession(lul[2], lul[3]);
//console.log(Auth.removeSession(lul[2]))

// async function niggered() {
//     skid = await Auth.GetCurrentUser("root", "arr");
//     console.log(skid);
//     ggay = await Auth.GetUser("root", "arr")
//     console.log(ggay)
//     // console.log(await Auth.updateUser(lul[2], lul[3], lul[4], lul[5]))
//     // console.log(await Auth.GetCurrentUser(lul[2], "str"));
//     // console.log(await Login.Login(lul[2], lul[3], lul[4]));
// }

// niggered();

// Extra.pScan(lul[2]);

roots.SendCommand(cmd);