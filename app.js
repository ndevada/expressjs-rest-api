// ANCHOR path module
const path = require('path');
// ANCHOR express module
const express = require('express');
// ANCHOR body-parser
const bodyParser = require('body-parser');
const config = require('./config/config');
const app = express();

    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());

    // ANCHOR import route
    const index = require('./routes/index');
    const film = require('./routes/film');

    app.use('/', index);
    app.use('/film', film);

    app.listen(config.server.port, () => {
        console.log('Server running at port ' + config.server.port);
    });