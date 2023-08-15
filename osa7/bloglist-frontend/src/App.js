import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from "react-router"
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import Users from './components/Users'
import User from './components/User'
import Nav from './components/Nav'
import Comments from './components/Comments'

import { useNotificationDispatch } from './contexts/NotificationContext'
import { useUserDispatch, useUserValue } from './contexts/userContext'


const App = () => {
  const queryClient = useQueryClient()
  const notiDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

  const likeBlogMutation = useMutation(blogService.likeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const removeBlogMutation = useMutation(blogService.removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      queryClient.invalidateQueries('users')
    }
  })

  const newBlogMutation = useMutation(blogService.postNewBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      queryClient.invalidateQueries('users')
    },
    onError: (error) => {
      notiDispatch({ type: 'SHOW', payload: error.message })
    }
  })

  const newCommentMutation = useMutation(blogService.postNewComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      notiDispatch({ type: 'SHOW', payload: error.message })
    }
  })

  const loginMutation = useMutation(loginService.login, {
    onSuccess: (loginUser) => {

      blogService.setToken(loginUser.token)
      userDispatch({ type: 'SET_USER', payload: user })
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loginUser)
      )
      window.location.reload()
    },
    onError: () => {
      notiDispatch({ type: 'SHOW', payload: 'wrong username or password' })
      setTimeout(() => {
        notiDispatch({ type: 'HIDE' })
      }, 5000)
    }
  })

  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useUserValue()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: loggedUser })
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const result = useQuery('blogs', blogService.getAll, {
    onSuccess: (data) => {
      console.log(result)
      console.log(data)
      setBlogs(data)
    },
    retry: 1,
    onError: () => {
      return (
        notiDispatch({ type: 'SHOW', payload: 'Error with the blog server' })
      )
    }
  })

  const usersResult = useQuery('users', userService.getAll, {
    onSuccess: (data) => {
      console.log(usersResult)
      console.log(data)
      setUsers(data)
    }
  })

  const login = (event) => {
    event.preventDefault()

    const userObj = {
      username: username,
      password: password
    }
    loginMutation.mutate(userObj)

  }

  const postBlog = (blog) => {
    const newBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: 0
    }

    newBlogMutation.mutate(newBlog)

    blogFormRef.current.toggleVisibility()

    notiDispatch({ type: 'SHOW', payload: `a new blog ${newBlog.title} by ${newBlog.author} added` })

    setTimeout(() => {
      notiDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const postNewComment = ( content, id ) => {
    const comment = {
      content: content,
      id: id
    }
    newCommentMutation.mutate(comment)

    notiDispatch({ type: 'SHOW', payload: `Added comment ${content}` })

    setTimeout(() => {
      notiDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const likeBlog = (blog) => {

    likeBlogMutation.mutate(blog)

    notiDispatch({ type: 'SHOW', payload: `Liked ${blog.title}` })

    setTimeout(() => {
      notiDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const id = blog.id
      removeBlogMutation.mutate(id)
      navigate('/')

      notiDispatch({ type: 'SHOW', payload: `Removed ${blog.title} successfully` })

      setTimeout(() => {
        notiDispatch({ type: 'HIDE' })
      }, 5000)
    }
  }

  const logout = () => {
    userDispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  if (user === null) {
    return (

      <div>
        <h2>Log in to application</h2>
        <Notification />
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

  return (
    <div>
      <Nav username={user.username} logout={logout} />
      <h1>blogs</h1>
      <Notification />
      <Routes>
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={
          <div>
            <Blog blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} />
            <Comments blogs={blogs} postNewComment={postNewComment}/>
          </div>
        } />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={
          <div>
            <Togglable buttonLabel="Create a new Blog" ref={blogFormRef}>
              <NewBlogForm postBlog={postBlog}></NewBlogForm>
            </Togglable>
            <Blogs blogs={blogs} />
          </div>
        } />
      </Routes>
    </div>
  )

}


export default App