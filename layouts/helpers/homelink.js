module.exports = function (locale) {
    if (locale === 'en') {
        return '/';
    }
    return '/' + locale + '/';
}