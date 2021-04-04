const express = require('express');

const PORT = 80

const app = express();

app.set('port', PORT);

app.route('/extrato').get( (req, res) => {
    res.status(200).send("Você solicitou o Extrato")
} );

app.route('/lancamento').get( (req, res) => {
    res.status(200).send("Você solicitou para adicionar um lancamento")
} );

app.listen(PORT, ()=> {
    console.log("Servidor iniciado na porta: ", PORT);
})