const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("../tests/test_helper");

test("bloglists are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// 4.9: Blog list tests, step2
test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const onePost = response.body[0];
  expect(onePost._id).toBeDefined();
});

// 4.10: Blog list tests, step3

describe("Making POST request and content of the blog post is saved correctly to the database", () => {
  test("verifies that making an HTTP POST", async () => {
    const newBlog = {
      author: "Martin Fowler",
      title: "Microservices Resource Guide",
      url: "https://martinfowler.com/microservices/",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const postNewBlog = await helper.blogInDb();

    expect(postNewBlog.length).toBe(helper.initialBlogs.length + 1);

    const contents = postNewBlog.find(helper.equalToSchema(newBlog));

    expect(contents).toBeDefined();
    //  verify that the content of the blog post is saved correctly to the database.
    const savedPost = await helper.blogWithId();
    expect(savedPost.body).toMatchObject(newBlog);
  });
});

// 4.11*: Blog list tests, step4
describe("the likes property is missing from the request, it will default to the value 0", () => {
  test("likes property", async () => {
    const newBlog = {
      author: "Martin Fowler",
      title: "Microservices Resource Guide",
      url: "https://martinfowler.com/microservices/",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const postNewBlog = await helper.blogInDb();

    const contents = postNewBlog.find(helper.equalToSchema(newBlog));

    expect(contents.likes).toBe(0);
  });
});

// 4.12*: Blog list tests, step5
describe("POST /api/blogs", () => {
  test("should return 400 bad request if title is missing", async () => {
    const newBlog = {
      author: "Martin Fowler",
      url: "https://martinfowler.com/microservices/",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const postNewBlog = await helper.blogInDb();

    expect(postNewBlog.length).toBe(helper.initialBlogs.length);
  });
  test("should return 400 bad request if url is missing", async () => {
    const newBlog = {
      author: "Martin Fowler",
      title: "Microservices Resource Guide",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const postNewBlog = await helper.blogInDb();

    expect(postNewBlog.length).toBe(helper.initialBlogs.length);
  });
});
