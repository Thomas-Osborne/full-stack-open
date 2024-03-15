const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (typeof blog.likes === 'undefined') {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end(); // bad request
  }

  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

module.exports = blogsRouter;