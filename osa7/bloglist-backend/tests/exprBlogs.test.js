require("dotenv").config();
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const Blog = require('../models/blogi')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Blog.deleteMany({})  
  let blogObject = new Blog(initialBlogs[0])  
  await blogObject.save()  
  blogObject = new Blog(initialBlogs[1])  
  await blogObject.save()
})

describe('GET /api/blogs', () => {
  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('identifier is id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('valid blog can be posted', async () => {
    const blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const contents = response.body[response.body.length-1]

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents.title).toContain(
      blog.title
    )
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})