module.exports = function (str, big) {
    if (typeof big === 'number') {
        return str.replace('.jpg', '.' + big + '.jpg')
    }
    return !big ? str.replace('.jpg', '.820.jpg') : str.replace('.jpg', '.1640.jpg')
}
