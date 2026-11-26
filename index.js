const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // coloque a senha do seu MySQL se tiver
    database: 'social_media_clientes'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de controle de clientes de social media ativa!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});