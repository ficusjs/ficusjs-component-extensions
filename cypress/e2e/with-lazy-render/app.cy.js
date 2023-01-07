/* global describe cy before it  */
describe('Component lazy render', () => {
  beforeEach(() => {
    cy.visit('with-lazy-render')
  })

  it('has two lazy components', () => {
    cy.get('mock-lazy-empty')
      .should('exist')
    cy.get('mock-lazy-loader')
      .should('exist')
  })

  describe('scrolling down to reveal components', () => {
    beforeEach(() => {
      cy.scrollTo(0, 2000)
    })

    it('has two lazy components', () => {
      cy.get('mock-lazy-empty span')
        .should('exist')
        .and('have.text', 'Lazy rendered component with no initial content')
      cy.get('mock-lazy-loader span')
        .should('exist')
        .and('have.text', 'Lazy rendered component with placeholder')
    })
  })
})
