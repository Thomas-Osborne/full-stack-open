const { test, describe, after, beforeEach } = require('node:test');
const Blog = require('../models/Blog');

const assert = require('node:assert');

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
];

beforeEach(async () => {
  await Blog.deleteMany({ });
  
  let blogObject;
  for (let i = 0; i < initialBlogs.length; i++) {
    blogObject = new Blog(initialBlogs[i]);
    await blogObject.save();
  }
});

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('get /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there is one blog', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test('the first blog is called react patterns', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map(e => e.title);
    assert(titles.includes('React patterns'));
  });
});

describe('get /api/blogs id is unique identifier', () => {
  test('blogs have an id field', async () => {
    const response = await api.get('/api/blogs');

    const ids = response.body.map(e => e.id);
    const undefinedIds = ids.filter(id => !id); // finds falsy values, i.e. no id defined
    assert.strictEqual(undefinedIds.length, 0);
  });
});

describe('post /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'My new blog',
      author: 'Tom Osborne',
      url: 'www.bbc.co.uk',
      likes: 30
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map(e => e.title);
    assert.strictEqual(response.body.length, initialBlogs.length + 1); // check for increase number of blogs
    assert(titles.includes('My new blog')); // check blog is there
  });
});

describe('post /api/blogs validation', () => {
  test('likes set to zero if not provided', async () => {
    const newBlog = {
      title: 'My likeless blog',
      author: 'Tom Osborne',
      url: 'www.itv.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const addedBlog = response.body.filter(e => e.title === 'My likeless blog');
    assert.strictEqual(response.body.length, initialBlogs.length + 1); // check for increase number of blogs
    assert.strictEqual(addedBlog[0].likes, 0); // check added blog has zero likes
  });

  test('400 bad request if title not provided', async () => {
    const newBlog = {
      author: 'Tom Osborne',
      url: 'www.google.com',
      likes: 83
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

  test('400 bad request if url not provided', async () => {
    const newBlog = {
      title: 'No url to see',
      author: 'Tom Osborne',
      likes: 30
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

test('400 bad request if neither title nor url not provided', async () => {
  const newBlog = {
    author: 'Tom Osborne',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

describe('delete /api/blogs:id', () => {
  test('delete blog successfully', async () => {
    const initialId = '5a422b3a1b54a676234d17f9';
    await api
      .delete(`/api/blogs/${initialId}`)
      .expect(204);

    const response = await api.get('/api/blogs');
    const deletedBlogId = response.body.filter(e => e.id === '5a422b3a1b54a676234d17f9');
    assert.strictEqual(response.body.length, initialBlogs.length - 1); // check for decreased number of blogs
    assert.strictEqual(deletedBlogId.length, 0); // check no blog left with that id
  });
});

describe('update /api/blogs:id', () => {
  test('update blog successfully', async () => {
    const newLikes = {likes: 25};

    const initialId = '5a422b3a1b54a676234d17f9';
    await api
      .patch(`/api/blogs/${initialId}`)
      .send(newLikes)
      .expect(201);

    const response = await api.get('/api/blogs');
    const updatedBlogId = response.body.filter(e => e.id === '5a422b3a1b54a676234d17f9');

    assert.strictEqual(response.body.length, initialBlogs.length); // check for same number of blogs
    assert.strictEqual(updatedBlogId[0].likes, 25); // check updated blog has 25 likes
  });
});

after(async () => {
  await mongoose.connection.close();
});
