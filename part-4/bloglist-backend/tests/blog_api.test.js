const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../model/bloglist");
const helper = require("../tests/test_helper");
const User = require("../model/users");
const bcrypt = require("bcrypt");

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
  test("should return 400 bad request if title and url are missing", async () => {
    const newBlog = {
      author: "Martin Fowler",
      likes: 3,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);

    const postNewBlog = await helper.blogInDb();

    expect(postNewBlog.length).toBe(helper.initialBlogs.length);
  });
});

describe("deletion of a single blog post", () => {
  test("succeeds deleting with status code 204", async () => {
    const blogAtStart = await helper.blogInDb();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const postNewBlog = await helper.blogInDb();
    expect(postNewBlog.length).toBe(helper.initialBlogs - 1);

    const contents = postNewBlog.map((r) => r.author);
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

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});