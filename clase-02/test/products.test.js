import { expect } from "chai";

import request from "supertest";
import app from "../app.js";

import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { updateProduct } from "../controllers/products-controller.js";

describe("Products endpoint", function() {

    this.timeout(5000);

   beforeEach (async function () {
    
    await Category.deleteMany({});

    const category = await Category.create({
        name: "Electronics",
        });
        
    await Product.deleteMany({});

    await Product.create({
      name: "Mouse",
      price: 80,
      stock: 10,
      category: category._id
    })
   })

    it("should return all products with a 200 status and an array", async function() {
        const response = await request(app).get("/products");
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.equal(1);
    });


    it("should return name products ", async function() {
        const response = await request(app).get("/products");
        
        expect(response.body[0]).to.have.property("name");
    });

   it("should create a new product", async function() {
  const category = await Category.findOne({ name: "Electronics" });
  
  const newProduct = {
    name: "notebook",
    price: 1000,
    stock: 5,
    category: category.id
  };
  const response = await request(app)
    .post("/products").send(newProduct);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name");
   expect(response.body.name).to.equal("notebook");
});
 it("should return product by id ", async function() {
  
  const product = await Product.findOne();
  
  

    const response = await request(app).get(`/products/${product._id}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("name");
    expect(response.body.name).to.equal("Mouse");
});

it("should return 422 if name is missing", async function() {
  const category = await Category.findOne();
  const newProduct = {
    price: 100,
    stock: 5,
    category: category.id
  };
  const response = await request(app)
    .post("/products").send(newProduct);
  expect(response.status).to.equal(422);
});
   

   it("should update product", async function (){
    const product = await Product.findOne();
    product.name = "Mouse Gamer";

    const updateProduct ={
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category
    };
    const response = await request(app)
    .put(`/products/${product._id}`).send(updateProduct);
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal("Mouse Gamer");
    
   });


   it ("should delete product", async function() {
    const product = await Product.findOne();
    const response = await request(app)
    .delete(`/products/${product._id}`);
    expect(response.status).to.equal(204);
   });
});
