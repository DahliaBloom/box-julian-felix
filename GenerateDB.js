const fs = require('fs');
const {parse} = require("nodemon/lib/cli");

function run(client) {

    var data = "";

    let json = fs.readFileSync('./dump.json', 'utf8');


    data = JSON.parse(json)

    console.log(data);

    var query = "INSERT INTO products (name, price, image) VALUES ";
    for (var i = 0; i < data.length; i++) {

        query += "('" + mysql_real_escape_string(data[i].name) + "', " + data[i].price + ", '" + data[i].image + "'), ";
    }

    query = query.substring(0, query.length - 2);

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);

        res.render('search', {table: res.rows});
    });



}

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
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
            default:
                return char;
        }
    });
}


module.exports = {run}