const csvtojson = require('csvtojson');
const path = require('path');
const sequelize = require('sequelize');

function makeSeeder(name, queryInterface){
  return csvtojson()
  .fromFile(path.resolve(__dirname,`data/${name.toLowerCase()}.csv`))
  .then((results) => {
    // console.log(results);
    return queryInterface.bulkInsert(name, results, {});
  })
  .catch((err) => {
    console.error('There was error when seeding on '+ name, err)
  })
}

module.exports = {
  makeSeeder
}