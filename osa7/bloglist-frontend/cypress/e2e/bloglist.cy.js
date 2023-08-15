describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/')

    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }

    const blog = {
      title: 'dwadwa',
      author: 'fesfes',
      url: 'googol.com',
      likes: 1
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/blogs/', blog)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('dwa')
      cy.get('#password').type('dwa')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create a new Blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#new-blog-button').click()

      cy.get('.blog-list').contains('title author')
    })

    it('A blog can be liked', function() {
      cy.get('.blog-list').get('#view-button').click()
      cy.get('#like-button').click()

      cy.get('.like').contains('2')
    })

    it('User can remove created blog', function() {
      cy.contains('Create a new Blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#new-blog-button').click()

      cy.reload()

      cy.get('.blog').last().find('#view-button').click()
      cy.get('.blog').last().find('#remove-button').click()
      cy.on('window:confirm', () => true)

      cy.contains('title author').should('not.exist')
    })

    it('Only user who added the blog can see remove button', function() {
      cy.contains('log out').click()

      const user = {
        name: 'test2',
        username: 'test2',
        password: 'test2'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.get('#username').type('test2')
      cy.get('#password').type('test2')
      cy.get('#login-button').click()

      cy.get('.blog-list').get('#view-button').click()
      cy.get('#remove-button').should('have.attr', 'style', 'display: none;')
    })

    it('Blogs are sorted by likes', function() {
      const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 2
      }

      cy.request('POST', 'http://localhost:3003/api/blogs/', blog)

      cy.reload()

      cy.get('.blog-list').last().contains('dwadwa fesfes')
    })
  })
})