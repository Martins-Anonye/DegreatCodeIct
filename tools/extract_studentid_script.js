const fs = require('fs');
const path = require('path');
const inFile = path.join(__dirname, '..', 'student-id.html');
const outFile = path.join(__dirname, '..', 'student-id-script.mjs');
const html = fs.readFileSync(inFile, 'utf8');
const m = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
if (!m) {
  console.error('module script not found');
  process.exit(2);
}
fs.writeFileSync(outFile, m[1], 'utf8');
console.log('written', outFile);
