import { useState } from "react"
import PropTypes from 'prop-types'

const NewBlogForm = ({ postBlog }) => {


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }


    setAuthor('')
    setTitle('')
    setUrl('')

    postBlog(newBlog)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input
            id='title'
            type={'text'}
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type={'text'}
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type={'text'}
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br></br>
        <button id='new-blog-button' type='submit'>Create a new blog</button>
      </form>
      <br></br>
    </div>
  )
}

NewBlogForm.propTypes = {
  postBlog: PropTypes.func.isRequired
}

export default NewBlogForm