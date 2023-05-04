const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (posts) => {
  return posts.reduce((total, post) => total + post.likes, 0);
};
// reduce method
// const favoriteBlog = (blogs) => {
//   return blogs.reduce((prev, current) => {
//     return prev.likes > current.likes ? prev : current;
//   });
// };

// sort method
const favoriteBlog = (blogs) => {
  const sortBlog = blogs.sort((a, b) => b.likes - a.likes);
  return sortBlog[0];
};

const mostBlogs = (blogs) => {
  const blogsCount = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(_.keys(blogsCount), (author) => blogsCount[author]);
  const mostBlogsCount = blogsCount[topAuthor];
  return {
    author: topAuthor,
    blogs: mostBlogsCount,
  };
};

const mostLikes = (blogs) => {
  const likesCount = _.countBy(blogs, "author");
  const authorName = _.maxBy(
    _.keys(likesCount),
    (author) => likesCount[author]
  );
  const mostLikesCount = likesCount[authorName];
  return {
    author: authorName,
    blogs: mostLikesCount,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
