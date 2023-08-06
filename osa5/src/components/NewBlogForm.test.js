import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from "./newBlogForm"

describe('newBlogForm component tests', () => {
  test('blogform', async () => {
    const postBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm postBlog={postBlog}/>)

    const title = container.querySelector("input[name='title']")
    const author = container.querySelector("input[name='author']")
    const url = container.querySelector("input[name='url']")
    const createButton = screen.getByText('Create new blog')

    await user.type(title, 'title')
    await user.type(author, 'author')
    await user.type(url, 'url')
    await user.click(createButton)

    expect(postBlog.mock.calls).toHaveLength(1)
    expect(postBlog.mock.calls[0][0].title).toBe('title')
    expect(postBlog.mock.calls[0][0].author).toBe('author')
    expect(postBlog.mock.calls[0][0].url).toBe('url')
  })
})