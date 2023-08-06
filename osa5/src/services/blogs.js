import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = async (newBlog) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

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

  await axios.put(url,likedBlog)

}

const removeBlog = (id) => {

  const url = `${baseUrl}/${id}`

  axios.delete(url)
}


export default { getAll, postNewBlog, setToken, likeBlog, removeBlog }