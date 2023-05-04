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

describe("Making POST request", () => {
  test("verifies that making an HTTP POST", async () => {
    const newBlog = {
      title: "Stoic",
      author: "Stoic",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const postNewBlog = await helper.blogInDb();
    expect(postNewBlog.length).toBe(helper.initialBlogs.length + 1);

    const contents = postNewBlog.find(helper.equalToSchema(newBlog));
    expect(contents).toContain("async/await simplifies making async calls");
  });
});
