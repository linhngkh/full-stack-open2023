const dummy = (blogs) => {
  return (blogs = 1);
};

const totalLikes = (posts) => {
  return posts.reduce((total, post) => total + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  const reduceBlog = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog
  );
  const { title, author, likes } = reduceBlog;
  return { title, author, likes };
};

// const favoriteBlog = (blogs) => {
//   const sortBlog = blogs.sort((a, b) => b.likes - a.likes);
//   return sortBlog[0];
// };

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
