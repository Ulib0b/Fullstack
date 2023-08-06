/* eslint-disable default-case */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state = initialState, action){
      return state.map(anecdote =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    },
    createNewAnecdote(state = initialState, action){
      return state.concat(action.payload)
    },
    replaceState(state, action){
      console.log(action.payload)
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(replaceState(anecdotes))
  }
}

export const addAnecdote = ( content ) => {
  return async dispatch => { 
    const newAnecdote = asObject(content)   
    const addedAnecdote = await anecdoteService.addAnecdote(newAnecdote)    
    dispatch(createNewAnecdote(addedAnecdote))
  }
}

export const addVoteAnecdote = ( id ) => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()
    const preVotedAnecdote = anecdotes.find(anec => anec.id === id)
    const votedAnecdote = {
      ...preVotedAnecdote,
      votes: preVotedAnecdote.votes + 1
    }    
    anecdoteService.updateAnecdote(votedAnecdote)
    dispatch(voteAnecdote(votedAnecdote))
  }
}


export const { voteAnecdote, createNewAnecdote, replaceState } = anecdoteSlice.actions
export default anecdoteSlice.reducer