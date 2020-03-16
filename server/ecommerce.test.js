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
    describe('Successfully create product', function() {
        test('Should return 201 and object (message, product)', (done) =>{
            request(app)
            .post('/products')
            .send({
                name: 'jam tangan',
                image_url:`https://jamtangan123`,
                price:1000000,
                stock:30
            })
            .then(result =>{
                const { body, status } = result
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Successfully create product')
                expect(body).toHaveProperty('product')
                expect(body.product.name).toBe('jam tangan')
                expect(body.product.image_url).toBe('https://jamtangan123')
                expect(body.product.price).toBe(1000000)
                expect(body.product.stock).toBe(30)
                done()
            })
        })
    })
})
