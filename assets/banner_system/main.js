// Modules
const fs = require("fs");

// Files
const Config = require("../Config/main.js");

// Extra


exports.ModifyBanner = function(file_name) {
    let db = fs.readFileSync(`./assets/banner_system/banner_files/${file_name}.txt`, "utf8");

    let nef = db.split("{RED}").join(Config.Colors.Red);
    nef = nef.split("{YELLOW}").join(Config.Colors.Yellow);
    nef = nef.split("{BLUE}").join(Config.Colors.Blue);
    nef = nef.split("{PURPLE}").join(Config.Colors.Purple);
    nef = nef.split("{GREEN}").join(Config.Colors.Green);
    nef = nef.split("{CYAN}").join(Config.Colors.Cyan);
    nef = nef.split("{BLACK}").join(Config.Colors.Black);
    nef = nef.split("{GREY}").join(Config.Colors.Grey);
    nef = nef.split("{WHITE}").join(Config.Colors.White);
    nef = nef.split("{BG_GREY}").join(Config.Colors.Background_DarkGrey);
    nef = nef.split("{BG_YELLOW}").join(Config.Colors.Background_Yellow);
    nef = nef.split("{BG_BLUE}").join(Config.Colors.Background_Blue);
    nef = nef.split("{RESET}").join(Config.Colors.Reset + Config.Colors.Background_Reset);
    // socket.write(socket, nef);
    return nef;
}