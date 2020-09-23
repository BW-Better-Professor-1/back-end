const supertest = require('supertest')
const server = require('../api/server');
const auth = require('./auth-router');

const db = require("../data/db-config");

// beforeAll(async () => {
//     // run the migrations and do any other setup here
//     await db.migrate.latest()
//   })

describe("/api/auth ROUTER TESTING", () => {
    describe("/GET Requests", () => {
        describe("/api/auth/", () => {
            it('should return a 200 status if successful', () => {
                return supertest(server)
                    .get("/api/auth")
                    .then(res => {
                        expect(res.status).toBe(200);
                    })
                });
            it('should return a response in JSON', () => {
                return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('application/json')
                });
            });
            it('should return a list of all users', () => {
                return supertest(server)
                .get('/')
                .then(res =>{
                    expect(res.body.api).toBe("up and running");
                })
            })
        
        });
        describe("/api/auth/register", () => {
            it.todo('should return a 201 status if registered correctly')
            it.todo('should return a token')
            it.todo('should return a 500 status if error')
                
        })
        describe("/api/auth/login", () => {
            it.todo('should return a 201 status if registered correctly')
            it.todo('should return a token')
            it.todo('should return a 500 status if error')
                
        })
        describe("/:id/add-project", () => {
            it.todo('should return a 201 status if registered correctly')
            it.todo('should return a token')
            it.todo('should return a 500 status if error')
                
        })
        describe("/:id/projects", () => {
            it.todo('should return a 201 status if registered correctly')
            it.todo('should return a token')
            it.todo('should return a 500 status if error')
                
        })
        describe("/:id/students", () => {
            it.todo('should return a 201 status if registered correctly')
            it.todo('should return a token')
            it.todo('should return a 500 status if error')
                
        })
    })
})