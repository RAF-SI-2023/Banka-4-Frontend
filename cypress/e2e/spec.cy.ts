describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('body > div.MuiDialog-root.MuiModal-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div > p')
    cy.get('#exitPosionPill').click()
    cy.get("#email").type("pera@gmail.rs")
    cy.get("#password").type("123")
    cy.get("#root > main > form > button").click()
  })
})