const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const Sequelize = require('sequelize');
const { Client } = require('pg')

const client = new Client({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})
client.connect().then(() => {
  console.log('BERHIASIL CONNECT')
})
.catch((err) => {
  console.log('Gagal untuk connect',err);
})