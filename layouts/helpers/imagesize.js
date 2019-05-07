module.exports = function (str, big) {
    return !big ? str.replace('.jpg', '.820.jpg') : str.replace('.jpg', '.1640.jpg')
}