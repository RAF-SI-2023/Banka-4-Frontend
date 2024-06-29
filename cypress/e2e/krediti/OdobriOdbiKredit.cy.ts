import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Kredit spec', () => {
  beforeEach(() => {
    //loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('Odobri prvi kredit', () => {

    loginKorisnik(cy);

    cy.visit('http://localhost:3000/listaKredita')

    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije

    // Izaberi opciju "Gotovinski"
    cy.get('[role="option"]').contains('Gotovinski').click()
    // Popuni ostala polja forme
    cy.get('input[name="amount"]').type('10000')
    cy.get('input[name="loanPurpose"]').type('Kupovina automobila')
    cy.get('input[name="salary"]').type('50000')
    cy.get('input[name="permanentEmployee"]').check()
    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();




    logout(cy)

    loginAdmin(cy);


    cy.visit('http://localhost:3000/listaKredita')
    cy.get('[id="Odobri"]').first().click();

    logout(cy)

  })

  it('Odbij prvi kredit', () => {
    loginKorisnik(cy);

    cy.visit('http://localhost:3000/listaKredita')

    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije

    // Izaberi opciju "Gotovinski"
    cy.get('[role="option"]').contains('Gotovinski').click()
    // Popuni ostala polja forme
    cy.get('input[name="amount"]').type('10000')
    cy.get('input[name="loanPurpose"]').type('Kupovina automobila')
    cy.get('input[name="salary"]').type('50000')
    cy.get('input[name="permanentEmployee"]').check()
    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();




    logout(cy)


    loginAdmin(cy);


    cy.visit('http://localhost:3000/listaKredita')
    cy.get('[id="Odbij"]').first().click();


  })
})