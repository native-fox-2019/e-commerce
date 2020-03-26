module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce",
    "host": "127.0.0.1",
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
    "username": "echmjisdrorvms",
    "password": "df358613fa4c2d4bd9a96f8b3287d98256ac7a68b017a8d456dbd61a4fbb261c",
    "database": "d9ge8vqq08a72t",
    "host": "ec2-18-235-20-228.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
