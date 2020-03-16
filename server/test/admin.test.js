const request = require(`supertest`)
const app = require(`../index`)


describe(`Admin User Test`, () => {
    it(`Admin register should return token`, async () => {
        await request(app)
            .post(`/admin/register`)
            .send({
                email: `test@test.com`,
                password: `test`
            })
            .expect(201)
            .expect({
                token: /\S+/
            })
    })

    it(`Admin Login should return token`, async () => {
        await request(app)
            .post(`/admins/login`)
            .send({
                email: `test@test.com`,
                password: `test`
            })
            .expect(200)
            .expect({
                token: /\S+/
            })
    })
})