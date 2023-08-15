import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const postNewBlog = async (newBlog) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const postNewComment = async ( comment ) => {
  const id = comment.id
  const content = { content: comment.content }
  const url = `${baseUrl}/${id}/comments`

  const response = await axios.post(url,content)

  return response.data
}

const likeBlog = async (blog) => {

  const url = `${baseUrl}/${blog.id}`
  const likedBlog = {
    _id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes+1,
    user: blog.user
  }

  const response = await axios.put(url,likedBlog)

  return response.data

}

const removeBlog = async (id) => {

  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url)

  return response.data
}


export default { getAll, postNewBlog, setToken, likeBlog, removeBlog, postNewComment }