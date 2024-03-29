import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteAnecdoteMutation.mutate(votedAnecdote)
    dispatch({ type: 'VOTE', payload: anecdote.content})
    setTimeout(() => {
      dispatch({ type: 'HIDE'})
    },5000)
  }


  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false
  })
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  } 

  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
