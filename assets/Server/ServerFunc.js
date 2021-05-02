// Modules

// Files

// Extra

exports.set_title = function(string, socket) {
    socket.write("\033]0;" + string + "\007")
}

exports.set_TerminalSize = function(row, col, socket) {
    socket.write("\033[8;" + row + ";" + col + "t");
}