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

// Listar todos os clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
});

// Buscar um cliente pelo ID
app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (results.length === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
        res.json(results[0]);
    });
});

// Cadastrar novo cliente
app.post('/clientes', (req, res) => {
    const { nome, instagram, plano, valor_mensal, dia_pagamento, link_drive, link_trello, status } = req.body;
    const sql = `
        INSERT INTO clientes (nome, instagram, plano, valor_mensal, dia_pagamento, link_drive, link_trello, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nome, instagram, plano, valor_mensal, dia_pagamento, link_drive || '', link_trello || '', status || 'ativo'],
        (err, result) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({
                id: result.insertId,
                nome,
                instagram,
                plano,
                valor_mensal,
                dia_pagamento,
                link_drive: link_drive || '',
                link_trello: link_trello || '',
                status: status || 'ativo'
            });
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});