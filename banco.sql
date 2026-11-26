CREATE DATABASE IF NOT EXISTS social_media_clientes;
USE social_media_clientes;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    instagram VARCHAR(100) NOT NULL,
    plano VARCHAR(80) NOT NULL,
    valor_mensal DECIMAL(10, 2) NOT NULL,
    dia_pagamento INT NOT NULL,
    link_drive VARCHAR(255),
    link_trello VARCHAR(255),
    status VARCHAR(30) DEFAULT 'ativo'
);