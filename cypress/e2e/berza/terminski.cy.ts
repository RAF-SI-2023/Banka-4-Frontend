import { loginAdmin2 } from "../util/util"

describe('Terminski ugovori spec', () => {
    beforeEach(() => {
        loginAdmin2(cy);
        cy.visit("http://localhost:3000/contracts?type=Agriculture");
        
    })
    after(() => {
        //logout(cy)
    })

    it('Kupovanje terminskog ugovora', () => {
        cy.visit("http://localhost:3000/contracts?type=Agriculture");
        cy.get('[data-testid="racun-0"]').click();
    })

    it('Kupovanje terminskog ugovora bez racuna', () => {
        //TODO implement
    })
})