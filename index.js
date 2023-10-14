#!/usr/bin/env node

const express = require('express')
const app = express()
const port = 3000

const { Client } = require('pg');

const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'check24',
    password: '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',
    port: 9856,
});

client.connect();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {time: new Date()});
})

app.get('/search', (req, res) => {
    data = [1, 2, 4];
    res.render('search', {table: data});
    return;

    client.query('SELECT * FROM products', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);

        res.render('search', {table: res.rows});
    });
})


// importDB.run(client);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
