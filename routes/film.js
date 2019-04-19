// ANCHOR express module
const express = require('express');
// ANCHOR body-parser
const body = require('body-parser');
// ANCHOR response module
const response = require('../res/response');
// ANCHOR config
const knex = require('../config/conn');
// ANCHOR log
const logger = require('../config/logger');
// const knex = require('knex');
// ANCHOR express validator
const {check, validationResult} = require('express-validator/check');
const app = express();

app.get('/', async (req, res) => {
    try {
        let pemilik = await knex('film');
        res.status(200)
        response.ok(200, pemilik, res);
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
});

app.post('/', [
    check('judul').not().isEmpty(),
    check('sinopsis').not().isEmpty(),
    check('genre').not().isEmpty(),
    check('tahun_tayang').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let judul = req.body.judul;
        let sinopsis = req.body.sinopsis;
        let genre =    req.body.genre;
        let  tahun_tayang = req.body.tahun_tayang; 

        let id = await knex('film').insert({
            'judul': judul,
            'sinopsis': sinopsis,
            'genre':    genre,
            'tahun_tayang': tahun_tayang
        });
        res.json({
            id: id[0],
            judul,
            sinopsis,
            genre,
            tahun_tayang
        });
    } catch (error) {
        logger.error(error.message);
        next(error);
    }

});

module.exports = app;