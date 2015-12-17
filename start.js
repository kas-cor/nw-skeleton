var exec = require('child_process').execFile;

exec("./node_modules/nw/nwjs/nw.exe", ["."], function (err, data) {
    console.log(err);
    console.log(data.toString());
});