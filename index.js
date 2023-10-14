#!/usr/bin/env node
//const generateDB = require('./GenerateDB.js')
//generateDB.run(client);

const express = require('express')
const app = express()
const port = 3000

const { Client } = require('pg');

const client = new Client({
    user: 'admin',
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
    let data = [{
        "name": "Refectocil Lash & Brow Booster Wachstumsfördernd, frei von Prostamid und synthetischen Hormonen 6 ml",
        "price": 4079,
        "image": "https://cdn2.beauty.check24.de/product/eyJrZXkiOiI5YS85YTAxNzRjMS1kNThjLTVmOTUtYjZiNS1mMjliNWE2OTI4YWIuanBlZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MzAwLCJoZWlnaHQiOjMwMCwiZml0IjoiaW5zaWRlIn0sInRyaW0iOjF9fQ=="
    },
        {
            "name": "Hörmann Handsender HSE4 868-BS Kunststoff schwarz Struktur SW-Eu (4511736)",
            "price": 4189,
            "image": "https://cdn2.baumarkt.check24.de/product/eyJrZXkiOiJwcm9kdWN0L3E3Yy9nNGwvZHh4Lzl4bHFkZzdoYWhjOC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjMwMCwiaGVpZ2h0IjozMDAsImZpdCI6Imluc2lkZSJ9LCJ0cmltIjoxfX0="
        }];
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
