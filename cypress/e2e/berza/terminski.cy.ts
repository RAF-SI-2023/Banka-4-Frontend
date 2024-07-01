import { kupiTerminski, loginAdmin2 } from "../util/util"

describe('Terminski ugovori spec', () => {
    beforeEach(() => {
        loginAdmin2(cy);
    })
    after(() => {
        //logout(cy)
    })

    it('Kupovanje terminskog ugovora', () => {
        // cy.visit("http://localhost:3000/contracts?type=Agriculture");
        // for (let i = 0; i < 5; i++) {
        //     kupiTerminski(cy, i);
        // }

        // cy.visit("http://localhost:3000/listaPorudzbina");

        // cy.get(`[data-testid="odobri-0"]`).click();
        // cy.get(`[data-testid="odbij-1"]`).click();
    })

    it('Kupovanje terminskog ugovora bez racuna', () => {
        cy.visit("http://localhost:3000/contracts?type=Agriculture");
        cy.get(`[data-testid="termbuy-6"]`).click();
        cy.get("#kupi").click();
    })
})