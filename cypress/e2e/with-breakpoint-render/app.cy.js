/* global describe cy before it  */
describe('Component breakpoint render', () => {
  before(() => {
    cy.visit('with-breakpoint-render')
  })

  it('has a breakpoint component', () => {
    cy.get('mock-breakpoint-render')
      .should('exist')
  })

  function resize (to) {
    describe('resize', () => {
      before(() => {
        cy.viewport(to.width, to.height)
      })

      it(`renders ${to.expecting}`, () => {
        cy.get('mock-breakpoint-render')
          .should('have.text', to.expecting)
      })
    })
  }

  [
    { width: 350, height: 700, expecting: 'Breakpoint render mobile' },
    { width: 780, height: 700, expecting: 'Breakpoint render tablet' },
    { width: 1300, height: 700, expecting: 'Breakpoint render desktop' }
  ].forEach(e => resize(e))
})
