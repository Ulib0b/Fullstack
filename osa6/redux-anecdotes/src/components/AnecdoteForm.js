import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationHandler } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnec = (event) => {
    event.preventDefault()
    const content = event.target.input.value
    event.target.input.value = ''
    console.log('add', content)
    dispatch(addAnecdote(content))
    dispatch(notificationHandler(`Created anecdote "${content}"`,5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnec}>
        <div><input name='input' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
