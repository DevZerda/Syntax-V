// Modules

// Files

// Extra

exports.set_title = function(string, socket) {
    socket.write("\033]0;" + string + "\007")
}