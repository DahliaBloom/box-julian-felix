export function run(client) {

    fetch('dumb.json')
        .then((response) => response.json())
        .then((json) => console.log(json));


    client.query('INSERT INTO products VALUES ', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);

        res.render('search', {table: res.rows});
    });



}
