const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const Sequelize = require('sequelize');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

console.log('Using:'+env, { config });

const { Product } = require('./models');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

Product.findAll().then(products => {
  console.log("All Products:", JSON.stringify(products.slice(0,5), null, 4));
})
.catch((err) => {
  console.log('error on load product data',err);
});