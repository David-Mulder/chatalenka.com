const yaml = require('yaml-js');
const fs = require('fs');
const englishFile = fs.readFileSync('./src/en/strings.md', 'UTF-8'); 
const slovakFile = fs.readFileSync('./src/sk/strings.md', 'UTF-8'); 
// const dutchFile   = fs.readFileSync('./src/nl/strings.md', 'UTF-8'); 
module.exports = function (locale, stringOrArray) {
    const path = typeof stringOrArray === 'string' ? [stringOrArray] : stringOrArray;
    const strings = {
        en: yaml.load_all(englishFile)[0],
        sk: yaml.load_all(slovakFile)[0],
        // nl: yaml.load_all(dutchFile)[0]
    };
    return path.reduce((prev, cur) => {
        return prev[cur];
    }, strings[locale]);
} 
