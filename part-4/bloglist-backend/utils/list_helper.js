const dummy = (blogs) => {
  return (blogs = 1);
};

const totalLikes = (posts) => {
  return posts.reduce((total, post) => total + post.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
