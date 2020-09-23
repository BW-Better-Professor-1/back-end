const supertest = require('supertest')
const server = require('../api/server');
const messages = require('./messages-router');

const db = require("../data/db-config");

describe("/api/messages/", () => {
    describe("GET /api/messages/", () => {
        it.todo('should return a 201 status if registered correctly')
        it.todo('should return a token')
        it.todo('should return a 500 status if error')     
    });
    describe("GET /api/messages/:id/message", () => {
        it.todo('should return a 201 status if registered correctly')
        it.todo('should return a token')
        it.todo('should return a 500 status if error')     
    });
    describe("GET /api/messages/:id/messages", () => {
        it.todo('should return a 201 status if registered correctly')
        it.todo('should return a token')
        it.todo('should return a 500 status if error')     
    });
    describe("POST /api/messages/:id", () => {
        it.todo('should return a 201 status if registered correctly')
        it.todo('should return a token')
        it.todo('should return a 500 status if error')     
    });
})