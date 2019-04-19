var appRoot = require('app-root-path');
var winston = require('winston');

// ANCHOR set log yg akan keluar di console dan disimpan ke dalam file
var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/logger.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};

// ANCHOR Panggil class winston dengan setting yg sudah di buat
var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // NOTE Aplikasi tidak akan berhenti kalau ada exception
});

// ANCHOR file stream (nulis file) yang akan dipakai oleh morgan
logger.stream = {
    write: (message, encoding) => {
        // NOTE pakai login info agar ouput dipakai sama filestream dan console
        logger.info(message);
    }
};

module.exports = logger;

