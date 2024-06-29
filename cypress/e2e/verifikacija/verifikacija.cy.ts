import { loginKorisnik, logout } from "../util/util"

describe('Verifikacija spec', () => {
  beforeEach(() => {
    loginKorisnik(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('posalji mail', () => {
    cy.visit('http://localhost:3000/verifikacija');

    cy.get('#generisiVerKod').click();

    cy.get('#outlined-read-only-input').should('exist');
  })
})