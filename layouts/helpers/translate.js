const yaml = require('yaml-js');
const fs = require('fs');
const englishFile = fs.readFileSync('./src/en/strings.md', 'UTF-8'); 
const slovakFile = fs.readFileSync('./src/sk/strings.md', 'UTF-8'); 
module.exports = function (locale, stringOrArray) {
    const path = typeof stringOrArray === 'string' ? [stringOrArray] : stringOrArray;
    const strings = {
        en: yaml.load_all(englishFile)[0],
        sk: yaml.load_all(slovakFile)[0]
    };
    return path.reduce((prev, cur) => {
        return prev[cur];
    }, strings[locale]);
} 