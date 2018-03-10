var fs = require('fs');
var morgan = require('morgan');

var accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

var logConf = morgan('combined', { stream: accessLogStream });

module.exports = logConf;