const Blog = require("../model/bloglist");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const blogWithId = async () => {
  const blogId = await Blog.findById(req.params.id);
  return blogId;
};

const equalToSchema = (blog) => (b) =>
  b.author === blog.author && b.title === blog.title && b.url === blog.url;

module.exports = {
  initialBlogs,
  blogInDb,
  equalToSchema,
  blogWithId,
};
