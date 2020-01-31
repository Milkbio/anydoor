const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const {promisify} = require('util');

const stat = promisify(fs.stat);
const readDir = promisify(fs.readdir);

const config = require('./config');

const app = http.createServer(async (req, res) => {
    const {url} = req;
    const filePath = path.join(config.root, url);
    try {
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
});

app.listen(config.port, config.host, () => {
    const addr = `http://${config.host}:${config.port}`;
    console.log(chalk.green(`Server run at ${addr}`));
});