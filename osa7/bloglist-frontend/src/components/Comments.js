import { useParams } from "react-router"

const Comments = ({ blogs, postNewComment }) => {

  if(blogs.length === 0){
    return null
  }

  const id = useParams().id
  const blog = blogs.find(a => a.id === id)
  const comments = blog.comments

  const addNewComment = (event) => {
    event.preventDefault()
    const content = event.target.input.value
    event.target.input.value = ''
    postNewComment(content,id)
  }

  const CommentList = () => {
    if(comments.length === 0){
      return null
    }
    return (
      comments.map(comment => {
        return(
          <li key={comment.id}>{comment.content}</li>
        )
      })
    )
  }

  return(
    <div>
      <h2>Comments</h2>
      <form onSubmit={addNewComment}>
        <input name='input' />
        <button type='submit'>Add comment</button>
      </form>
      <ul>
        <CommentList />
      </ul>
    </div>
  )

}

export default Comments