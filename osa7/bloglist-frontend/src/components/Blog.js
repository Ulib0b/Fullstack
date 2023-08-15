import PropTypes from 'prop-types'
import { useParams } from "react-router"

const Blog = ({ blogs, likeBlog, removeBlog }) => {

  if(blogs.length === 0){
    return null
  }
  const id = useParams().id
  const blog = blogs.find(a => a.id === id)

  const like = () => {
    likeBlog(blog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  return(
    <div className="blog">
      <h1 className="title">{blog.title} {blog.author}</h1>
      <span className="url">{blog.url}</span><br/>
      <span className="like">likes: {blog.likes}</span> <button id="like-button" onClick={like}>like</button><br/>
      <span className="name">{blog.user.name}<br/></span>
      <button id="remove-button" onClick={remove}>remove</button>
    </div>
  )

}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog