import { useMutation,  useQueryClient  } from 'react-query'
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: error.response.data.error})
    }
  })

  const makeAnecdoteObj = (content) => {
    return {
      content: content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = makeAnecdoteObj(content)
    newAnecdoteMutation.mutate(newAnecdote) 
    dispatch({ type: 'CREATE', payload: content})
    setTimeout(() => {
      dispatch({ type: 'HIDE'})
    },5000)   
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
