const fs = require("fs")
const path = require("path")
const scriptBin = fs.readFileSync(path.join(__dirname, './out/bulk_mint.bin'));
console.log(scriptBin.toString('hex'))
fs.writeFile('./binFile.ts', scriptBin.toString('hex'), err => {
    if (err) {
      console.error(err);
    }
});
