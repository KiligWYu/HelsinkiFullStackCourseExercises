import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removeable, updateBlog, removeBlog }) => {
  const [showDetail, setShowDetail ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: 16
  }

  const displayStyle = { display: showDetail ? '' : 'none' }
  const removeButtonDisplayStyle = { display: removeable ? '' : 'none' }

  const increaseLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    delete newBlog.user
    updateBlog(newBlog)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='titleAndAuthor'>
        {blog.title} {blog.author} <button onClick={() => {setShowDetail(!showDetail)}}>{showDetail ? 'hide' : 'show'}</button>
      </div>
      <div style={displayStyle} className='url'>
        {blog.url}
      </div>
      <div style={displayStyle} className='likes'>
        likes {blog.likes} <button onClick={increaseLike}>like</button>
      </div>
      <div style={displayStyle} className='username'>
        {blog.user.username}
      </div>
      <div style={removeButtonDisplayStyle} className='remove'>
        <button onClick={handleRemoveBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeable: PropTypes.bool.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog

// author: "wwy"
// id: "632087d9a9cdea29a5debe60"
// likes: 0
// title: "toggleable"
// url: "localhost"
// user: {username: 'root', name: 'root', id: '63173e22a8ac72fa2b0ceda8'}
