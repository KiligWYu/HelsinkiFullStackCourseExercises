import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add') {
      setPage('login')
    }
  }

  useEffect(() => {
    if (token) {
      setPage('books')
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <LoginForm show={page === 'login'} setError={setErrorMessage} setToken={setToken} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'}/>
    </div>
  )
}

export default App
