function run(client) {

    var data = "";

    fetch('./dumb.json')
        .then((response) => response.json())
        .then((json) => data = parse(json));

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