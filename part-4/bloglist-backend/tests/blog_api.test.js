const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../model/bloglist");
const helper = require("../tests/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("bloglists are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// 4.9: Blog list tests, step2
test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const onePost = response.body[0];
  expect(onePost.id).toBeDefined();
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
describe("it will default to the value 0", () => {
  test("if the likes property is missing from the request", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect("Content-Type", /application\/json/);

    const postNewBlog = await helper.blogInDb();

    const contents = postNewBlog.find(helper.equalToSchema(newBlog));

    expect(contents.likes).toBe(0);
  });
});

// 4.12*: Blog list tests, step5
describe("POST /api/blogs", () => {
  test("title and url are missing", async () => {
    const newBlog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
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

describe("deletion of a single blog post", () => {
  test("succeeds deleting with status code 204", async () => {
    const blogAtStart = await helper.blogInDb();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogAtEnd = await helper.blogInDb();
    expect(blogAtEnd.length).toBe(helper.initialBlogs.length - 1);

    const contents = blogAtEnd.map((d) => d.author);
    expect(contents).not.toContain(blogToDelete.author);
  });
});

describe("updating the LIKES of an individual blog post.", () => {
  test("succeeds updating with status code 204", async () => {
    const updatedBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 11,
    };
    const postNewBlog = await helper.blogInDb();
    const blogToUpdate = postNewBlog[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
