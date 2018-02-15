const tar = require("tar"),
      utils = require("./utils"),
      ScpClient = require("scp2").Client,
      date = new Date(),
      name = "" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds(),
      nameTgz = name + ".tgz",
      scpClient = new ScpClient(utils.config);

tar.c({
    gzip: true,
    file: name + ".tgz",
    cwd: "dist"
}, ["."]).then(function() {
    console.log("Created " + nameTgz);

    scpClient.upload(nameTgz, "/home3/jon/" + nameTgz, function(error) {
        if(error) {
            console.error(error);
            process.exitCode = 1;
            throw error;
        }

        console.log("SCP finished.");

        utils.do([
            "rm -rf /home3/jon/public_html/repos/chaos-experiment",
            "mkdir -p /home3/jon/public_html/repos/chaos-experiment",
            "tar -xvf /home3/jon/" + nameTgz + " -C /home3/jon/public_html/repos/chaos-experiment",
            "rm /home3/jon/" + nameTgz
        ]);
    });
}).catch(function(error) {
    console.error(error);
    process.exitCode = 1;
    throw error;
});
