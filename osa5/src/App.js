import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorAlert from './components/ErrorAlert'
import SuccAlert from './components/SuccAlert'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [message2, setMessage2] = useState(null)
  const [update, setUpdate] = useState(0)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes)),
    )
  }, [update])

  const login = async (event) => {
    event.preventDefault()

    try {
      const userObj = {
        username: username,
        password: password
      }
      const loginUser = await loginService.login(userObj)

      blogService.setToken(loginUser.token)
      setUser(loginUser)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loginUser)
      )
    } catch (e) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const postBlog = (blog) => {
    try {
      const newBlog = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: 0
      }

      blogService.postNewBlog(newBlog).then(postedBlog => {
        setBlogs(blogs.concat(postedBlog))
      })

      setUpdate(Math.floor(Math.random()*1000))

      blogFormRef.current.toggleVisibility()

      setMessage2(`a new blog ${newBlog.title} by ${newBlog.author} added`)



      setTimeout(() => {
        setMessage2(null)
      }, 5000)
    } catch (e) {
      console.log(e)
    }
  }

  const likeBlog = (blog) => {
    try {

      blogService.likeBlog(blog)

      setUpdate(Math.floor(Math.random()*1000))

      setMessage2(`Liked ${blog.title}`)

      setTimeout(() => {
        setMessage2(null)
      }, 5000)
    } catch (e) {
      console.log(e)
    }
  }

  const removeBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try {

        blogService.removeBlog(blog.id)

        setUpdate(Math.floor(Math.random()*1000))

        setMessage2(`Removed ${blog.title} successfully`)

        setTimeout(() => {
          setMessage2(null)
        }, 5000)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  if (user === null) {
    return (

      <div>
        <h2>Log in to application</h2>
        <ErrorAlert message={message}></ErrorAlert>

        <form onSubmit={login}>
          <div>
            username:
            <input
              id='username'
              type={'text'}
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              id='password'
              type={'password'}
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )

  }

  let isBlogUsers = false

  return (
    <div>
      <h2>blogs</h2>
      <ErrorAlert message={message}/>
      <SuccAlert message={message2}/>

      <p>{user.username} logged in </p>
      <button onClick={logout}>log out</button>

      <Togglable buttonLabel="Create a new Blog" ref={blogFormRef}>
        <NewBlogForm postBlog={postBlog}></NewBlogForm>
      </Togglable>
      <div className='blog-list'>
        {blogs.map(blog => {
          if(blog.user.username === user.username){
            isBlogUsers = true
          }
          return (<Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} isBlogUsers={isBlogUsers}/>)
        }
        )}
      </div>
    </div>
  )

}


export default App