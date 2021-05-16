/*
*
*
*@title: Syntax V
*@since: 4/20/21
*@creator: vlob
*
*
*                 ╔═╗╦ ╦╔╗╔╔╦╗╔═╗═╗ ╦   ╦  ╦
*                 ╚═╗╚╦╝║║║ ║ ╠═╣╔╩╦╝   ╚╗╔╝
*                 ╚═╝ ╩ ╝╚╝ ╩ ╩ ╩╩ ╚═    ╚╝ 
*                      The Final Version
*/

// Files
const Server = require("./assets/Server/main.js");
const ServerFunc = require("./assets/Server/ServerFunc.js");

const Crud = require("./assets/Auth/crud.js");
const Auth = require("./assets/Auth/main.js");
const AuthFunc = require("./assets/Auth/functions.js");

const Extra = require("./assets/Extra/main.js");

const Banner = require("./assets/banner_system/main.js");

const Config = require("./assets/Config/main.js");
const Current = require("./assets/Config/current.js");
const ConfigFunc = require("./assets/Config/currentFunctions.js");

const roots = require("./assets/root_system/main.js");


// Command Files
const Help = require("./assets/Commands/help.js");
const Geo = require("./assets/Commands/geo.js");
const Stresser = require("./assets/Commands/stresser.js");
const root = require("./assets/Commands/root.js");
const Scan = require("./assets/Commands/scan.js");


/*
*
* User connecting
*
*/
console.clear()
Server.Server.on('connection', async function(socket) {
    
    console.log('--------------------------------------------');
    console.log("A new connection has been established");
    console.log('Client IP: ' + socket.remoteAddress.replace("::ffff:", "") + ":" + socket.remotePort + ' | IP4/IP6: ' + socket.remoteFamily);
    console.log('--------------------------------------------\r\n\r\n')

    ServerFunc.set_title("Syntax V", socket);

    var CurrentIP = socket.remoteAddress.replace("::ffff:", "");


    let username = await getInput(socket, "Username: ");
    let password = await getInput(socket, "Password: ");
    let login_run = await Auth.login(username, password, CurrentIP);
    socket.write(login_run + "\r\n");
    if(login_run.includes("[x]")) {
        socket.write("Closing in 5 seconds.....\r\n");
        await Extra.sleep(5000).then(() => {
            socket.destroy();  
        })
    }

    socket.write(Config.Colors.Clear + Banner.ModifyBanner("main") + "\r\n");
    socket.write(Banner.ModifyBanner("hostname"));
    Extra.MoveCursorToLeft(31, socket);
    Extra.MoveCursorUp(1, socket);
/*
*
* User data input loop
*
*/ 
    socket.on('data', async function(chunk) {
        socket.write(Config.Colors.Clear + Banner.ModifyBanner("main") + "\r\n");

        var cleanSTR = chunk.toString().replace(/(\r\n|\n|\r)/gm,""); // Removing \r \n \r\n from the data
        console.log(cleanSTR);

        ConfigFunc.GetCmd(cleanSTR); // Set Current Command Info

/*
*
* Command Handling
*
*/


        switch(Current.CurrentCmd.Cmd) {
            case "help" || "?":
                Help.help_func(socket);
                return;
            case "clear" || "cls":
                socket.write(Config.Colors.Clear + Banner.ModifyBanner("main") + "\r\n");
                return;
            case "geo":
                Geo.GeoIP(socket);
                return;
            case "pscan":
                socket.write(Extra.pScan(Current.CurrentCmd.arg[1]));
        }
        // Outputing hostname and positioning cursor
    });

    socket.on('end', function() {
        Crud.removeSession(CurrentIP);
        console.log('Client: ' + CurrentIP + ' has left!\r\n');
    });

    socket.on('error', function(err) {
        console.log("[NODEJS SERVER ERROR(IGNORE)]: " + err + "\r\n");
    });
});

function getInput(socket, string) {
    return new Promise(resolve => {
        socket.write(string);

        socket.on("data", c => {
        c = c.toString();
        
        if(c.indexOf("\n") !== -1) {
            socket.removeAllListeners("data");
  
          return resolve(c.trim());
        }
      });
    });
} 
