const fs = require('fs');
const {parse} = require("nodemon/lib/cli");

function run(client) {

    var data = "";

    const json = fs.readFileSync('./dump.json', 'utf8');

    data = JSON.parse(json)

    console.log(data);

    var query = "INSERT INTO products VALUES ";
    for (var i = 0; i < data.length; i++) {
        query += "('" + data[i].name + "', " + data[i].price + ", '" + data[i].image + "'), ";
    }


    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);

        res.render('search', {table: res.rows});
    });



}

module.exports = {run}