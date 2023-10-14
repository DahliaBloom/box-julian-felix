#!/usr/bin/env node

//const generateDB = require('./GenerateDB.js')


const express = require('express')
const app = express()
const port = 3000

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '192.168.140.147',
    database: 'check24',
    password: 'MSw/&=D;)*EHK~s<a2x}Jj',
    port: 9856,
});

client.connect();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {time: new Date()});
})

app.get('/search', (req, res) => {
    console.log(`SELECT * FROM products WHERE name like \'%${req.query}%\'`)
    client.query(`SELECT * FROM products WHERE name like \'%${req.query}%\'`, (err, ress) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(ress.rows);

        res.render('search', {table: ress.rows, q: req.query.q});
    });
})

//generateDB.run(client);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
