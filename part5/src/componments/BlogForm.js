import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:<input id='title' value={title} onChange={handleTitleChange} placeholder='write here blog title'></input></div>
        <div>author:<input id='author' value={author} onChange={handleAuthorChange} placeholder='write here blog author'></input></div>
        <div>url:<input id='url' value={url} onChange={handleUrlChange} placeholder='write here blog url'></input></div>
        <button id='create-button' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
