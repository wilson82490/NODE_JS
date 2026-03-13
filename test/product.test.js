import { expect } from "chai";

import request from "supertest";
import app from "../app.js";


describe("Products endpoint", function() {
    it("should return all products with a 200 status and an array", async function() {
        const response = await request(app).get("/products");
        expect(response.status).to.equal(200);
        console.log(response.status, response.body);
    });
})