var TravisFTPr = require("travis-ftpr");

new TravisFTPr().deploy({
    host: process.argv[2],
    username: process.argv[3],
    password: process.argv[4],
    localDirectory: process.argv[5],
    remoteDirectory: process.argv[6]
}, function() {
    console.log("Done");
});
