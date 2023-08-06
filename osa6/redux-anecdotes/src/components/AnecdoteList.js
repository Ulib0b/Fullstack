import { useSelector, useDispatch } from 'react-redux'
import { addVoteAnecdote } from '../reducers/anecdoteReducer'
import { notificationHandler } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anec => anec.content.includes(state.filter)))
  anecdotes.sort((a,b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteAnecdote(id))
    dispatch(notificationHandler(`Voted for ${id}`,5))
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList