const http = require('http');
const path = require('path');
const chalk = require('chalk');

const config = require('./config');

// 引入route
const route = require('./route');

class Server {
    constructor(conf) {
        this.config = Object.assign({}, config, conf);
    }
    start() {
        const app = http.createServer(async (req, res) => {
            const {url} = req;
            const filePath = path.join(this.config.root, url);
            route(req, res, filePath, this.config);
        });

        app.listen(this.config.port, this.config.host, () => {
            const addr = `http://${this.config.host}:${this.config.port}`;
            console.log(chalk.green(`Server run at ${addr}`));
        });
    }
}

module.exports = Server