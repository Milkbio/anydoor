const path = require('path');

const mimeTypes = {
    css: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'text/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    swf: 'application/x-shockwave-flash',
    tiff: 'image/tiff',
    txt: 'text/plain',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    xml: 'text/xml'
}

module.exports = (filePath) => {
    let ext = path.extname(filePath)
        .substring(1)
        .toLowerCase();

    if (!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt'];
}
