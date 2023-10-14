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

    if (req.query.q === undefined) {
        client.query(`SELECT * FROM products`, (err, ress) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log(ress.rows);

            res.render('search', {table: ress.rows, q: req.query.q, min: (req.query.min === undefined ? 0 : req.query.min), max: (req.query.max === undefined ? '9999' : req.query.max)});
        });

    } else {

        let sort = "ASC"

        if (req.query.sort === "desc"){
            sort = "DESC"
        }

        const content = [req.query.q]

        let priceFilter = ""
        if (req.query.priceFrom !== undefined && req.query.priceTo === undefined) {
            priceFilter = " AND price > $2"
            content.push(req.query.priceFrom)
        } else if (req.query.priceFrom === undefined && req.query.priceTo !== undefined) {
            priceFilter = " AND price < $2"
            content.push(req.query.priceTo)
        } else if (req.query.priceFrom !== undefined && req.query.priceTo !== undefined) {
            priceFilter = " AND price BETWEEN $2 AND $3"
            content.push(req.query.priceFrom)
            content.push(req.query.priceTo)
        }

        const text = 'SELECT * FROM products WHERE SIMILARITY(name, $1) > 0.02' + priceFilter + ' ORDER BY price ' + sort

        client.query(text, content, (err, ress) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log(ress.rows);

            res.render('search', {table: ress.rows, q: req.query.q, min: (req.query.min === undefined ? 0 : req.query.min), max: (req.query.max === undefined ? '9999' : req.query.max)});
        });
    }
})

// generateDB.run(client);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
                return "''"; // prepends a backslash to backslash, percent,

            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
            default:
                return char;
        }
    });
}
