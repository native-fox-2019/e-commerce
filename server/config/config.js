require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "djegosbysrnblc",
    "password": "2f78487270fbe18d8c8ddba1f4322e084452c22c546f1a6bc38e7d02aebd1da6",
    "database": "d6kf0rh56d0f8",
    "host": "ec2-52-207-93-32.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
