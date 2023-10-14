const fs = require('fs');
const {parse} = require("nodemon/lib/cli");

function run(client) {

    var data = "";

    const json = fs.readFileSync('./dump.json', 'utf8');

    data = parse(json)

    console.log(data);

    return;
    //
    // client.query('INSERT INTO products VALUES ', (err, res) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log(res.rows);
    //
    //     res.render('search', {table: res.rows});
    // });
    //


}

module.exports = {run}