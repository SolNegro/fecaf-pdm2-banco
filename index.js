const express = require('express');
const config = require('config');
const path = require('path');
const port = process.env.PORT || config.get('server.port');

const app = express();

app.set('port', port);

app.route('/extrato').get( (req, res) => {
    res.status(200).send("Você solicitou o Extrato")
} );

app.route('/lancamento').get( (req, res) => {
    res.status(200).send("Você solicitou para adicionar um lancamento")
} );

app.listen(port, ()=> {
    console.log("Servidor iniciado na porta: ", port);
})