import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let component
  const blog = {
    title: "title",
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      username: 'username',
      name: 'name'
    }
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} likeBlog={mockHandler}/>)
  })

  test('renders title', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
  })

  test('view/hide button works', () => {
    const button = screen.getByText('view')
    fireEvent.click(button)

    const viewedBlog = component.container.querySelector('.blogStats')
    expect(viewedBlog).toBeInTheDocument
  })

  test('liked twice', () => {
    const button = screen.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})