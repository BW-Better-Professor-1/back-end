const supertest = require('supertest')

const server = require('./server.js');

const db = require("../data/db-config");


describe("server", () => {
    describe("environment", () => {
        it('should set the NODE_ENV variable to "test"', () => {
            expect(process.env.NODE_ENV).toBe("test");
        });
    })
});

describe("GET /", () => {
    it("should return HTTP status code 200", () => {
        return supertest(server)
            .get("/")
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
    it("should return HTTP status code 200", () => {
        return supertest(server)
            .get("/")
            .then(res => {
                expect(res.type).toBe('application/json');
            });
    })
})