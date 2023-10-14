#!/usr/bin/env node
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {time: new Date()});

})

app.get('/search', (req, res) => {
   res.render('search', {q: req.query})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
