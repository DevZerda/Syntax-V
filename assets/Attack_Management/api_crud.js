// Modules
const fs = require("fs");

// File

// Extra

exports.addAPI = function(api, methods) {
    /*
    * For method parameters it must be a string with commaas 'UDP,TCP'
    */
}

exports.removeAPI = function() {

}

exports.updateAPI = function() {

}

exports.GetAPI = function(method) {
    let API_db = fs.readFileSync("./assets/db/apis.db", "utf8");
    API_db.forEach(e => {
        if(e.length > 5) return;
        let methods = e.split(":")[1]
        if(methods.includes(method)) {
            return e.split(":")[0];
        }
    });
    return "[x] None of the API contains this method!";
}