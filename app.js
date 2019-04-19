// ANCHOR path module
const path = require('path');
// ANCHOR express module
const express = require('express');
// ANCHOR body-parser module
const bodyParser = require('body-parser');
const app = express();

    const config = require('./config/config');
    
    // ANCHOR knex
    const knex = require('knex')({
        client: config.database.client,
        connection: {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        },
        debug: true
    });

    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());

    // ANCHOR import route
    const index = require('./routes/index');

    app.use('/', index);
    // app.use('/film', film);

    app.listen(config.server.port, () => {
        console.log('Server running at port ' + config.server.port);
    });