describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Kilig',
      name: 'wy',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('Kilig')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('Kilig logged in')
    })

    it('falis with wrong credentials', () => {
      cy.get('#username').type('wy')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Kilig', password: '123456' })
    })

    it('A blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('#title').type('Kilig\'s Blog')
      cy.get('#author').type('Kilig')
      cy.get('#url').type('https://KiligWYu.com/')
      cy.get('#create-button').click()

      cy.contains('a new blog Kilig\'s Blog by Kilig added')

      cy.request('http://localhost:3003/api/blogs/')
        .should((response) => {
          console.log(response)
          expect(response.body).to.have.length(1)
          expect(response.body[0]).to.have.property('title', 'Kilig\'s Blog')
        })
    })

    describe('and a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({ title: 'Kilig\'s Blog', author: 'Kilig', url: 'https://KiligWYu.com/' })
      })

      it('a blog can be liked', () => {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('a blog can be removed', () => {
        cy.contains('Kilig\'s Blog')
        cy.contains('remove').click()
        cy.contains('Kilig\'s Blog').should('not.exist')
      })
    })

    describe('and several blogs exist', () => {
      beforeEach(() => {
        cy.createBlog({ title: 'Kilig\'s first Blog', author: 'Kilig', url: 'https://KiligWYu.com/' })
        cy.createBlog({ title: 'Kilig\'s second Blog', author: 'Kilig', url: 'https://KiligWYu.com/' })
        cy.createBlog({ title: 'Kilig\'s third Blog', author: 'Kilig', url: 'https://KiligWYu.com/' })
      })

      it.only('sort by likes', () => {
        cy.contains('Kilig\'s first Blog')
          .contains('show')
          .click()
        cy.contains('Kilig\'s first Blog')
          .parent()
          .contains('like')
          .click()
        cy.wait(3000)

        cy.contains('Kilig\'s second Blog')
          .contains('show')
          .click()
        cy.contains('Kilig\'s second Blog')
          .parent()
          .contains('like')
          .as('likeButton')
        cy.get('@likeButton').click()
        cy.wait(3000)
        cy.get('@likeButton').click()
        cy.wait(3000)

        cy.contains('Kilig\'s third Blog')
          .contains('show')
          .click()
        cy.contains('Kilig\'s third Blog')
          .parent()
          .contains('like')
          .as('likeButton')
        cy.get('@likeButton').click()
        cy.wait(3000)
        cy.get('@likeButton').click()
        cy.wait(3000)
        cy.get('@likeButton').click()
        cy.wait(3000)

        cy.get('.blog').eq(0).should('contain', 'Kilig\'s third Blog')
        cy.get('.blog').eq(1).should('contain', 'Kilig\'s second Blog')
        cy.get('.blog').eq(2).should('contain', 'Kilig\'s first Blog')
      })
    })
  })
})
