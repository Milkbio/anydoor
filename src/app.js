const http = require('http');
const chalk = require('chalk');
const {promisify} = require('util');

const config = require('./config');

const app = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
    res.end('<html><head><title>haha</title></head><body>nihaoa</body></html>');
});

app.listen(config.port, config.host, () => {
    const addr = `http://${config.host}:${config.port}`;
    console.log(chalk.green(`Server run at ${addr}`));
});