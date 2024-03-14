const maxBy = require('lodash/maxBy');

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const { author } = maxBy(blogs, blog => blog.author);
  const totalAuthorBlogs = blogs.reduce((a, blog) => blog.author === author ? a + 1 : a, 0);

  const object = {author: author, blogs: totalAuthorBlogs};
  return object;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const kvp = {};

  blogs.forEach(blog => {
    if (!Object.hasOwnProperty.call(kvp, blog.author)) {
      kvp[blog.author] = blog.likes;
    } else {
      kvp[blog.author] += blog.likes;
    }
  });

  let mostBlogger = null;
  let mostBloggerLikes = 0; // need this for the initial part of the loop or it stays null

  for (const key in kvp) {
    console.log(key);
    if (kvp[key] > mostBloggerLikes) {
      mostBlogger = key;
      mostBloggerLikes = kvp[key];
    }
  }

  return {author: mostBlogger, likes: mostBloggerLikes};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};