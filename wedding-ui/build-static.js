const fs = require("fs");
const glob = require("glob");

const files = glob.sync("src/**/*.{html,css}", { ignore: ["node_modules/**"] });

files.forEach(file => {
    const buildPath = `../static/${file.replace("src/", "")}`;
    fs.copyFileSync(file, buildPath);
    console.log(`Copying ${file} to ${buildPath}`);
});