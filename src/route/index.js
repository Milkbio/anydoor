const fs = require('fs');
const {promisify} = require('util');

// 将各种回调转换为promise
const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);

module.exports = async function (req, res, filePath) {
    try {
        // 根据路径判断是文件还是文件夹，是文件就返回内容，是文件夹就返回文件列表
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain; charset=utf-8');
            fs.createReadStream(filePath).pipe(res);
        }
        if (stats.isDirectory()) {
            const files = await readDir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain; charset=utf-8');
            res.end(files.join(','));
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/plain; charset=utf-8');
        res.end('没有找到请求的文件');
    }
}