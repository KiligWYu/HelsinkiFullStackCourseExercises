import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdote"

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteOf(state, action) {
      const id = action.payload
      const voteChangedAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...voteChangedAnecdote,
        votes: voteChangedAnecdote.votes + 1
      }
      return state
        .map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.vote(newAnecdote)
    dispatch(voteOf(newAnecdote.id))
  }
}

export const { voteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
