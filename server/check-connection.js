const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
const Sequelize = require('sequelize');
const { Client } = require('pg')

console.log(config)

const client = new Client({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: 5432,
  // ssl: {
  //   require: true,
  //   rejectUnauthorized: false,
  // }
})
client.connect().then(() => {
  console.log('BERHIASIL CONNECT')
})
.catch((err) => {
  console.log('Gagal untuk connect',err);
})
.finally(e => {
  console.log('Finally', { e });
})