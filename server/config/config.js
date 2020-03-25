require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "rllfpswvdgmpwi",
    "password": "f8b7737a24719a4cf1c6499a960e5122e666983da6a9ee57b00f466ff3e6d8a0",
    "database": "db2lq48ud64977",
    "host": "ec2-3-211-48-92.compute-1.amazonaws.com",
    "dialect": "postgrest"
  }
}
