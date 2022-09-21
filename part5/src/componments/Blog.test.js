import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: '全栈公开课',
  author: '赫尔辛基',
  url: 'https://fullstackopen.com',
  likes: 0,
  user: {
    username: 'kilig',
    name: 'wy'
  }
}

describe('test renders', () => {
  test('renders title and author', () => {
    render(<Blog blog={blog}/>)

    const element = screen.getByText('全栈公开课 赫尔辛基')
    expect(element).toBeDefined()
  })

  test('renders url and likes', () => {
    const { container } = render(<Blog blog={blog} />)
    const urlDiv = container.querySelector('.url')
    const likesDiv = container.querySelector('.likes')
    expect(urlDiv).toHaveStyle('display: none')
    expect(likesDiv).toHaveStyle('display: none')
  })
})

describe('user-event', () => {
  test('clicking the show button to show blog details', async () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText(blog.url)).toHaveStyle('display: none')
    expect(screen.getByText(`likes ${blog.likes}`)).toHaveStyle('display: none')

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    expect(screen.getByText(blog.url)).toHaveStyle('display: block')
    expect(screen.getByText(`likes ${blog.likes}`)).toHaveStyle('display: block')
  })

  test('double click like button', async () => {
    const mockHandler = jest.fn( () => {})

    render(<Blog blog={blog} removeable={false} updateBlog={mockHandler} removeBlog={mockHandler} />)

    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
