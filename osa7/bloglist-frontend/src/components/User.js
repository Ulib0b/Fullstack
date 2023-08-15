import { useParams } from "react-router"

const User = ({ users }) => {

  if(users.length === 0){
    return null
  }

  const id = useParams().id
  const user = users.find(a => a.id === id)
  const blogs = user.blogs



  return(
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {blogs.map(blog => {
          return (
            <li key={blog.id}>{blog.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default User