const fs = require("fs")
const path = require("path")
const scriptBin = fs.readFileSync(path.join(__dirname, './out/deposit_and_offer.bin'));
console.log(scriptBin.toString('hex'))
fs.writeFile('./binFile.ts', scriptBin.toString('hex'), err => {
    if (err) {
      console.error(err);
    }
});
