const {createGzip, createDeflate} = require('zlib');

module.exports = (stream, req, res) => {
    const acceptEncoding = req.headers['accept-encoding'];

    if (!acceptEncoding || !/\b(gzip|deflate)\b/.test(acceptEncoding)) {
        return stream;
    } else if (/\bgzip\b/.test(acceptEncoding)) {
        res.setHeader('Content-Encoding', 'gzip');
        return stream.pipe(createGzip());
    } else if (/\bdeflate\b/.test(acceptEncoding)) {
        res.setHeader('Content-Encoding', 'deflate');
        return stream.pipe(createDeflate());
    }
}