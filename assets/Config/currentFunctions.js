// Modules

// Files
const Crud = require("../Auth/crud.js");
const Current = require("./current.js");

// Extra

/*
*@param: CMD
*@type: [<void>]
*/
exports.GetCmd = function(Cmd) {
    Current.CurrentCmd.Fullcmd = Cmd;
    if(Cmd.includes(" ")) {
        let split_cmd = Cmd.split(" ");
        let i = 0;
        split_cmd.forEach(e => {
            Current.CurrentCmd.arg[i] = e;
            i++;
        });
        Current.CurrentCmd.Cmd = split_cmd[0];
    } else {
        Current.CurrentCmd.Cmd = Cmd;
        Current.CurrentCmd.arg[0] = Cmd;
    }
}

/*
*@param: Username
*@type: [<void>]
*/
exports.GetUserInfo = async function(user) {
    let get_user = await Crud.GetUser(user, "arr");
    Current.CurrentUser.Username = get_user[0];
    Current.CurrentUser.IP = get_user[1];
    Current.CurrentUser.Password = get_user[2];
    Current.CurrentUser.Level = parseInt(get_user[3]);
    Current.CurrentUser.Maxtime = parseInt(get_user[4]);
    Current.CurrentUser.isAdmin = (parseInt(get_user[5]) === 2 ? true : false);
}

/*
*@type: [<void>]
*/
exports.ResetUserInfo = function() {
    Current.CurrentCmd.arg = [];
    Current.CurrentCmd.Cmd = "";
    Current.CurrentCmd.Fullcmd = "";
    Current.CurrentUser.Username = "";
    Current.CurrentUser.IP = "";
    Current.CurrentUser.Password = "";
    Current.CurrentUser.Level = "";
    Current.CurrentUser.Maxtime = "";
    Current.CurrentUser.isAdmin = "";
}