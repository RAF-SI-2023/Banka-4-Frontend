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
    cy.wait(200)
    cy.visit('http://localhost:3000/listaKredita')
    cy.wait(200)
    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije
    cy.wait(1000)
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
    cy.wait(1000)
    cy.get('[role="option"]').contains('444000000910000033').click()
    cy.get('input[name="branchOffice"]').type('Beograd')
    cy.wait(200)
    cy.get("#kwiknimeUwU").click();

    cy.wait(500)

    cy.wait(200)
    logout(cy)
    cy.wait(2000)
    loginAdmin(cy);
    cy.wait(2000)

    cy.visit('http://localhost:3000/listaKredita')
    cy.wait(2000) // Sačekajte 200 milisekundi (prilagodite vreme čekanja po potrebi)
    cy.get('[id="Odobri"]').first().click();

    logout(cy)
    cy.wait(2000)
  })

  it('Odbij prvi kredit', () => {
    loginKorisnik(cy);
    cy.wait(200)
    cy.visit('http://localhost:3000/listaKredita')
    cy.wait(200)
    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije
    cy.wait(1000)
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
    cy.wait(1000)
    cy.get('[role="option"]').contains('444000000910000033').click()
    cy.get('input[name="branchOffice"]').type('Beograd')
    cy.wait(200)
    cy.get("#kwiknimeUwU").click();

    cy.wait(500)

    cy.wait(200)
    logout(cy)

    cy.wait(2000)
    loginAdmin(cy);
    cy.wait(2000)

    cy.visit('http://localhost:3000/listaKredita')
    cy.wait(2000) // Sačekajte 200 milisekundi (prilagodite vreme čekanja po potrebi)
    cy.get('[id="Odbij"]').first().click();


  })
})