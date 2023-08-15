import { Link } from "react-router-dom"

const Nav = ({ username, logout }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <p>{username} logged in </p>
      <button onClick={logout}>log out</button>
    </div>
  )
}

export default Nav