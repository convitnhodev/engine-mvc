const fs = require('fs');
const path = require('path');

console.log(__dirname);
const filePath = path.join(__dirname, `./index.html`);
const sample_template = fs.readFileSync(filePath, 'utf-8');

module.exports = sample_template;



