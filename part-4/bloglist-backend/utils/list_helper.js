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




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
