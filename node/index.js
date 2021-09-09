const express = require('express');
const app = express();
const faker = require('faker');
faker.locale = "pt_BR";
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);
const list = {};

connection.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");
    let sql = `create table if not exists people( id int auto_increment, name varchar(255) null, constraint people_pk primary key (id));`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Tabela criada!");
    });

    sql = "INSERT INTO people(name) values (?)";
    connection.query(sql, [faker.name.findName()], function (err, result) {
        if (err) throw err;
        console.log("1 registro inserido");
    });

    sql = "select * from people";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        list.data = '';
        result.forEach(function(value) {
            list.data += `<li>${value.name}</li>\n`;
        });
        console.log("registros selecionados");
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>\n<hr>Lista' + `<ul>${list.data}</ul>`);
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})