var marked = require('marked');
module.exports = function (content, inline) {
    let html = marked(content);
    if (inline) {
        html = html.replace('<p>', '');
        html = html.replace('</p>', '');
    }
    return html;
}