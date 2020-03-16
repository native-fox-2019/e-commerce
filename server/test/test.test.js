const request = require(`supertest`)
const app = require(`../index`)
const model = require(`../models`)

afterAll((done) => {
    model.User.destroy({truncate: true})
})


describe(`Admin User Test`, () => {
    it(`Admin register should return token`, (done) => {
        request(app)
            .post(`/admins/register`)
            .send({
                email: `test@test.com`,
                password: `test`
            })
            .expect(201)
            .then(data => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it(`Admin Login should return token`, (done) => {
        request(app)
            .post(`/admins/login`)
            .send({
                email: `test@test.com`,
                password: `test`
            })
            .expect(200)
            .then(data => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// describe(`admin CRUD test`, () => {
//     it(`Admin create Produce should return array of data`, (done) => {
//         request(app)
//                 .get(`/produces`)
//                 .expect(200)
//                 .then(respond => {
//                     console.log(respond)
//                     expect(respond.body.name).toBe(`apa`)
//                     done()
//                 })
//                 .catch(err => {
//                     done(err)
//                 })
//     })
// })