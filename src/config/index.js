module.exports =  {
    root: process.cwd(),
    host: '127.0.0.1',
    port: 8888,
    compress: /\.(html|css|js|txt|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}