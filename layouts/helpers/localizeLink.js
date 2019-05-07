// useless? / not needed?
module.exports = function (link, locale) {
    if (locale === 'en' && link === '/') {
        return '/';
    }
    if (link.substring(0, 10) === '/en/posts/') {
        return link;
    }
    return '/' + locale + '/' + link.substring(4);
}