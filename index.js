const pg = require('pg');
const express = require('express');
const config = require('config');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || config.get('server.port');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', port);

const pool = new pg.Pool({
    connectionString: 'postgres://jumwqecmlmmtja:404dd836e86ffeec0aed41541eedd4fcbc0c3e8fcd46e1f7f5a2bc2c480aefc6@ec2-52-21-153-207.compute-1.amazonaws.com:5432/d4u7co8p8k7gar',
    ssl: {
        rejectUnauthorized: false
    }
});

app.route('/reset').get( (req, res) => {
    
    let dropCreateTable = "";
    dropCreateTable += "DROP TABLE IF EXISTS lancamentos; "
    dropCreateTable += "CREATE TABLE lancamentos ("
    dropCreateTable += "data char(12), ";
    dropCreateTable += "descricao char(50), ";
    dropCreateTable += "valor decimal(5,2) ";
    dropCreateTable += ");";

    pool.query(dropCreateTable, (err, dbres) => {
        console.log("Error: ", err);
        console.log(dbres);
        res.status(200).send("Banco de dados foi resetado")
    })
});

app.route('/extrato').get( (req, res) => {
    let qry = "SELECT * FROM lancamentos;";
    pool.query(qry, (err, dbres) => {
        console.log("Error: ", err);
        res.status(200).json(dbres.rows);
    });
});

app.route('/lancamento').post( (req, res) => {
    let qry = "INSERT INTO lancamentos (data, descricao, valor) VALUES ";
    qry += `('${req.body.data}', '${req.body.descricao}', ${req.body.valor});`;
    pool.query(qry, (err, dbres) => {
        res.status(200).send();
    });
    res.status(200).send("Você solicitou para adicionar um lancamento")
} );

app.listen(port, ()=> {
    console.log("Servidor iniciado na porta: ", port);
})