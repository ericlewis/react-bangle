const {promisify} = require('util');
const {join} = require('path');
const fs = require('fs');
const mv = promisify(fs.rename);

const buildPath = join(__dirname, 'build/')
const jsPath = join(__dirname, 'build/static/js');

function package() {
    fs.readdir(jsPath, (err, files) => {
        if (err) { return console.error('Unable to scan directory: ' + err); }
    
        files.forEach((file) => {       
            if (file.startsWith("main") && file.endsWith(".js")) {
                moveFile(file, 'main.js') 
            } else if (file.startsWith("runtime") && file.endsWith(".js")) {
                moveFile(file, 'runtime.js') 
            } else if (file.endsWith("chunk.js")) {
                moveFile(file, 'vendor.js') 
            }
        });
    
        cleanupBuilds();
    });
}

function cleanupBuilds() {
    fs.readdir(buildPath, (err, files) => {
        if (err) { return console.error('Unable to scan directory: ' + err); }

        files.forEach((file) => {
            if (file != "main.js" && file != "runtime.js" && file != "vendor.js") {
                let path = join(buildPath, file)
                removePath(path)
            }
        }) 

        console.log("Done ✅", buildPath)
    });
}

function moveFile(file, name) {
    const original = join(jsPath, file);
    const target = join(buildPath, name);
    mv(original, target) 
}

function removePath(path) {
    if (fs.lstatSync(path).isDirectory()) {
        fs.rmdir(path, { recursive: true }, () => {});
    } else {
        fs.unlinkSync(path)
    }
}

package();