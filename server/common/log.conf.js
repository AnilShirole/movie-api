var fs = require('fs');
var morgan = require('morgan');

var dir = './log';

if (!fs.existsSync(dir)) {
    fs.mkdir(dir);
}

var accessLogStream = fs.createWriteStream('./log/access.log', { flags: 'a' });

var logConf = morgan('combined', { stream: accessLogStream });

module.exports = logConf;