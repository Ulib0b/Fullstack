import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {

  return (
    <div>
      <div>
        {blogs.map(blog => {
          return(
            <div key={blog.id}>
              <Link to={`blogs/${blog.id}/`}>{blog.title} {blog.author}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Blogs