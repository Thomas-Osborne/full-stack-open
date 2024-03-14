const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {

  if (blogs.length === 0) {
    return 0;
  }

  const likes = blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b);
  return likes;
};

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return null;
  }

  let index = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[index].likes) {
      index = i;
    }
  }
  return blogs[index];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};