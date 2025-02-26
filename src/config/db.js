// src/config/database.js
require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
    requestTimeout: 60000,
    connectionTimeout: 15000
  }
};

async function conectarBD() {
  try {
    console.log('Conexión Exitosa!');
    return await sql.connect(config);
  } catch (err) {
    console.error('Error de conexión:', err);
    throw err;
  }
}

module.exports = { conectarBD };