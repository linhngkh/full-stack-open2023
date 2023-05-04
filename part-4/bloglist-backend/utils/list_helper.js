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
  const likesCount = _.groupBy(blogs, "author");
  const authorsTotal = _.mapValues(likesCount, (posts) =>
    _.sumBy(posts, "likes")
  );
  const authorName = _.maxBy(
    _.keys(authorsTotal),
    (author) => authorsTotal[author]
  );
  const mostLikesCount = authorsTotal[authorName];
  return {
    author: authorName,
    likes: mostLikesCount,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
