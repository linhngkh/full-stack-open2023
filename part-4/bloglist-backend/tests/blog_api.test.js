const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../model/bloglist");

const api = supertest(app);

const initialsBlog = [
  {
    _id: "6453922e003956cf95832b8f",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "64539256003956cf95832b91",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

test("bloglists are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("there are fours blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(4);
});

test("the first note is about React patterns", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[1].title).toBe("React patterns");
});

// 4.9: Blog list tests, step2
test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const onePost = response.body[0];
  expect(onePost._id).toBeDefined();
});
