const Blog = require("../model/bloglist");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const equalToSchema = (blog) => (b) =>
  b.author === blog.author && b.title === blog.title && b.url === blog.url;

module.exports = {
  initialBlogs,
  blogInDb,
  equalToSchema,
};
