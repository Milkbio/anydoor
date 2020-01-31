const http = require('http');
const path = require('path');
const chalk = require('chalk');

const config = require('./config');

// 引入route
const route = require('./route');

const app = http.createServer(async (req, res) => {
    const {url} = req;
    const filePath = path.join(config.root, url);
    route(req, res, filePath);
});

app.listen(config.port, config.host, () => {
    const addr = `http://${config.host}:${config.port}`;
    console.log(chalk.green(`Server run at ${addr}`));
});