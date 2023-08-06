import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, isBlogUsers }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const showRemoveButton = { display: isBlogUsers ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    likeBlog(blog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  return(
    <>
      <div className="blog">
        <span className="title">{blog.title} </span>
        <span className="author">{blog.author}</span>
        <button id="view-button" style={hideWhenVisible} onClick={toggleVisibility}>view</button> <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
        <div className="blogStats" style={showWhenVisible}>
          <span className="url">{blog.url}</span><br/>
          <span className="like">likes: {blog.likes}</span> <button id="like-button" onClick={like}>like</button><br/>
          <span className="name">{blog.user.name}<br/></span>
          <button id="remove-button" style={showRemoveButton} onClick={remove}>remove</button>
        </div>
      </div> <br/>
    </>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog