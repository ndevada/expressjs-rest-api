const config = require('./config');
    
// ANCHOR knex
var knex = require('knex')({
    client: config.database.client,
    connection: {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    },
    debug: true
});

module.exports = knex;