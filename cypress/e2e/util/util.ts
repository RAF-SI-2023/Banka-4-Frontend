export function loginAdmin(cy: Cypress.cy) {
    cy.visit('http://localhost:3000')
    cy.get('body > div.MuiDialog-root.MuiModal-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div > p')
    cy.get('#exitPosionPill').click()
    cy.get("#email").type("pera@gmail.rs")
    cy.get("#password").type("123")
    cy.get("#root > main > form > button").click()
}

export function loginKorisnik(cy: Cypress.cy) {
    cy.visit('http://localhost:3000')
    cy.get('body > div.MuiDialog-root.MuiModal-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div > p')
    cy.get('#exitPosionPill').click()
    cy.get("#email").type("stamenic.petar@gmail.rs")
    cy.get("#password").type("123")
    cy.get("#root > main > form > button").click()
    cy.wait(500)
}

export function loginKorisnik2(cy: Cypress.cy) {
    cy.visit('http://localhost:3000')
    cy.get('body > div.MuiDialog-root.MuiModal-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div > p')
    cy.get('#exitPosionPill').click()
    cy.get("#email").type("pstamenic7721rn@raf.rs")
    cy.get("#password").type("123")
    cy.get("#root > main > form > button").click()
    cy.wait(500)
}

export function logout(cy: Cypress.cy) {
    cy.visit('http://localhost:3000')
    cy.get(".MuiAvatar-img").click()
    cy.get(".MuiList-root.MuiList-padding.MuiMenu-list").children().last().click()
}

