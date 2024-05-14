import { getApiUrl } from "utils/apiUrl"
import { UserRoutes } from "utils/types"

export function loginAdmin(cy: Cypress.cy) {
    cy.visit('http://localhost:3000')
    cy.get('body > div.MuiDialog-root.MuiModal-root.css-zw3mfo-MuiModal-root-MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container > div > div > p')
    cy.get('#exitPosionPill').click()
    cy.get("#email").type("pera@gmail.rs")
    cy.get("#password").type("123")
    cy.get("#root > main > form > button").click()
    cy.get('#root > div.sc-qZrbh.liNQxn > div.sc-kFCroH.pFNq > div').should('have.text', 'Lista Korisnika')
}

export function loginKorisnik(cy: Cypress.cy, korisnik?: number) {
    cy.request({
        method: 'POST',
        url: `${getApiUrl(UserRoutes.user_login)}${UserRoutes.user_login}`,
        body: korisnik === 2 ? 
        { username: "pstamenic7721rn@raf.rs", password: "123" } :
        { username: "stamenic.petar@gmail.rs", password: "123" }
    }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body
        localStorage.setItem('si_jwt', token);
    });
}


export function logout(cy: Cypress.cy) {
    cy.visit('http://localhost:3000')
    cy.get(".MuiAvatar-img").click()
    cy.get(".MuiList-root.MuiList-padding.MuiMenu-list").children().last().click()
}

