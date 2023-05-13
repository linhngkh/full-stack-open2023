const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../model/users");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("../tests/test_helper");

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
      .expect(200)
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
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

// 4.23*: bloglist expansion, step11
describe("POST /api/blogs", () => {
  test("should add a new blog with authentication", async () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW";
    const newBlog = {
      author: "Martin Fowler",
      title: "Microservices Resource Guide",
      url: "https://martinfowler.com/microservices/",
      likes: 3,
    };
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newBlog.title);
    expect(res.body.author).toBe(newBlog.author);
  });

  test("creation fails with too short password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "hellas",
      name: "Arto Hellas",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("password minimum length 3");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("should return 401 Unauthorized if token is not provided", async () => {
    const newBlog = {
      author: "Martin Fowler",
      title: "Microservices Resource Guide",
      url: "https://martinfowler.com/microservices/",
      likes: 3,
    };

    const response = await api.post("/api/blogs").send(newBlog);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Unauthorized");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
