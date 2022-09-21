import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm /> testing', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write here blog title')
    const authorInput = screen.getByPlaceholderText('write here blog author')
    const urlInput = screen.getByPlaceholderText('write here blog url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'testing blog title…')
    await user.type(authorInput, 'testing blog author…')
    await user.type(urlInput, 'testing blog url…')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog title…')
    expect(createBlog.mock.calls[0][0].author).toBe('testing blog author…')
    expect(createBlog.mock.calls[0][0].url).toBe('testing blog url…')
  })
})
