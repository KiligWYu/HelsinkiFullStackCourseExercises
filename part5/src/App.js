import { useState, useEffect, useRef } from 'react'
import Blog from './componments/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './componments/Notification'
import BlogForm from './componments/BlogForm'
import Togglable from './componments/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification message={message}/>
      <form onSubmit={handleLogin}>
        <div>
          username <input id='username' type="text" value={username} onChange={({ target }) => {setUsername(target.value)}} />
        </div>
        <div>
          password <input id='password' type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )

  const blogFormRef = useRef()

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} />
      </Togglable>

      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          removeable={blog.user.username === user.username}
          updateBlog={handleBlogUpdate}
          removeBlog={handleBlogRemove} />
      )}
    </>
  )

  const handleBlogUpdate = async (blogObject) => {
    const response = await blogService.update(blogObject)
    const newBlogs = blogs.map(blog => blog.id !== response.id ? blog : response)
    setBlogs(newBlogs)
  }

  const handleBlogRemove = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('error: wrong username or password')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateNewBlog = async (blogObject) => {
    try {
      console.log(blogObject)
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage(`info: a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => setMessage(null), 5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setMessage('an error occurred, try again later')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App
