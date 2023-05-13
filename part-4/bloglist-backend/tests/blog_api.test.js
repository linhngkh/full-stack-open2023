const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../model/blogs");
const helper = require("../tests/test_helper");

// 4.8: Blog list tests, step1
test("all blogs are returned", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(res.body).toBe(helper.initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
