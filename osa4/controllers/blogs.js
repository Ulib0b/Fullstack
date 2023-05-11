const blogsRouter = require('express').Router()
const Blog = require('../models/blogi')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => { 
  const authorization = request.get('Authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)  
  if (!decodedToken.id) {    
    return response.status(401).json({ error: 'token invalid' })
  }  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  }) 

  const savedBlog = await blog.save()
  console.log(user.blogs)
  const kaikkiBlogit = user.blogs
  kaikkiBlogit.push(savedBlog.id)

  user.blogs = kaikkiBlogit
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const deletedBlog = await Blog.findByIdAndRemove({_id: request.params.id})
  if(deletedBlog === null){
    response.status(400).end()
  }
  response.status(204).json(deletedBlog).end()
})

module.exports = blogsRouter