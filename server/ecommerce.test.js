const request = require ('supertest');
const app = require('./app');
const { sequelize , Product } = require ('./models')
const {queryInterface} = sequelize;

afterAll(done => {
    queryInterface
    .bulkDelete('Products', {})
    .then(() => done())
    .catch(err => done(err))
});

describe('Create a product item', function(){
    describe('Successfully create product')
})
