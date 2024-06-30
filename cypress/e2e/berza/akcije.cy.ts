import { loginAdmin } from "../util/util"

describe('Akcije spec', () => {
    beforeEach(() => {
        loginAdmin(cy);
        cy.visit('http://localhost:3000/akcije');
        cy.get('#pretraga').type("AAPL");
        cy.get('#search').click();
        cy.get('tbody tr:nth-child(1) #kupi').click();
    })
    after(() => {
        //logout(cy)
    })
    it('Kupovanje akcije', () => {
        // cy.get('#racunId').click();
        // cy.get('[data-testid="racun-0"]').click();

        // cy.get('input[name="kolicina"]').type('10');
        // cy.get('input[name="limit"]').type('100');
        // cy.get('input[name="stop"]').type('90');

        // cy.get('input[type="checkbox"]').eq(0).check();
        // cy.get('input[type="checkbox"]').eq(1).check();

        // cy.get('button#kupi').click();
    });

    it('Kupovanje akcije bez biranja racuna', () => {
        // cy.get('input[name="kolicina"]').type('10');
        // cy.get('input[name="limit"]').type('100');
        // cy.get('input[name="stop"]').type('90');

        // cy.get('input[type="checkbox"]').eq(0).check();
        // cy.get('input[type="checkbox"]').eq(1).check();

        // cy.get('button#kupi').click();
    });

    it('Kupovanje akcije bez biranja kolicine', () => {
        // cy.get('#racunId').click();
        // cy.get('[data-testid="racun-0"]').click();

        // cy.get('input[name="limit"]').type('100');
        // cy.get('input[name="stop"]').type('90');

        // cy.get('input[type="checkbox"]').eq(0).check();
        // cy.get('input[type="checkbox"]').eq(1).check();

        // cy.get('button#kupi').click();
    });

    it('Kupovanje akcije bez biranja limita', () => {
        // cy.get('#racunId').click();
        // cy.get('[data-testid="racun-0"]').click();

        // cy.get('input[name="kolicina"]').type('10');
        // cy.get('input[name="stop"]').type('90');

        // cy.get('input[type="checkbox"]').eq(0).check();
        // cy.get('input[type="checkbox"]').eq(1).check();

        // cy.get('button#kupi').click();
    });

    it('Kupovanje akcije bez biranja stopa', () => {
        // cy.get('#racunId').click();
        // cy.get('[data-testid="racun-0"]').click();

        // cy.get('input[name="kolicina"]').type('10');
        // cy.get('input[name="limit"]').type('100');

        // cy.get('input[type="checkbox"]').eq(0).check();
        // cy.get('input[type="checkbox"]').eq(1).check();

        // cy.get('button#kupi').click();
    });
})