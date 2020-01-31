const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {promisify} = require('util');
const pug = require('pug');
const config = require('../config');
const mime = require('../utils/mime');
const compress = require('../utils/compress');

// 将各种回调转换为promise
const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);

const compiledFunction = pug.compileFile(path.resolve(__dirname, '../views/index.pug'));

module.exports = async function (req, res, filePath) {
    try {
        // 根据路径判断是文件还是文件夹，是文件就返回内容，是文件夹就返回文件列表
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-type', `${mime(filePath)}; charset=utf-8`);
            let stream = fs.createReadStream(filePath);
            if (filePath.match(config.compress)) {
                stream = compress(stream, req, res)
            }
            stream.pipe(res);
        }
        if (stats.isDirectory()) {
            const files = await readDir(filePath);

            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html; charset=utf-8');
            // res.end(files.join(','));
            // console.log(chalk.green(config.root, filePath));
            const dir = path.relative(config.root, filePath);
            res.end(compiledFunction({
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                list: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            }))
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/plain; charset=utf-8');
        console.log(err);
        res.end('没有找到请求的文件');
    }
}