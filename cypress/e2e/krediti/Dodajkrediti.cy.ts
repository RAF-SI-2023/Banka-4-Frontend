import { loginKorisnik, logout } from "../util/util"

describe('Trazi Krediti spec', () => {
  beforeEach(() => {
    loginKorisnik(cy);
  })
  after(() => {
    //logout(cy)
  })

  it('Novi kredit Radi', () => {
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


  })

  it('Novi Kredit NemaVrste kredita', () => {

    cy.visit('http://localhost:3000/listaKredita')

    cy.get("#TraziKredit").click()

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


  })

  it('Novi Kredit nema kolicine', () => {


    cy.visit('http://localhost:3000/listaKredita')

    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije

    // Izaberi opciju "Gotovinski"
    cy.get('[role="option"]').contains('Gotovinski').click()
    // Popuni ostala polja forme

    cy.get('input[name="loanPurpose"]').type('Kupovina automobila')
    cy.get('input[name="salary"]').type('50000')
    cy.get('input[name="permanentEmployee"]').check()
    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();


  })

  it('Novi Kredit nema loanPurpose', () => {


    cy.visit('http://localhost:3000/listaKredita')

    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije

    // Izaberi opciju "Gotovinski"
    cy.get('[role="option"]').contains('Gotovinski').click()
    // Popuni ostala polja forme
    cy.get('input[name="amount"]').type('10000')

    cy.get('input[name="salary"]').type('50000')
    cy.get('input[name="permanentEmployee"]').check()
    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();




  })
  it('Novi Kredit nema salary', () => {


    cy.visit('http://localhost:3000/listaKredita')

    cy.get("#TraziKredit").click()

    cy.get('#vrstaKredita').click()
    // Sačekaj da se prikažu opcije

    // Izaberi opciju "Gotovinski"
    cy.get('[role="option"]').contains('Gotovinski').click()
    // Popuni ostala polja forme
    cy.get('input[name="amount"]').type('10000')
    cy.get('input[name="loanPurpose"]').type('Kupovina automobila')

    cy.get('input[name="permanentEmployee"]').check()
    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();



  })
  it('Novi Kredit nema permanentEmployee', () => {


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

    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();



  })
  it('Novi Kredit nema currentEmploymentPeriod', () => {


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

    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();




  })
  it('Novi Kredit nema loanTerm', () => {


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

    cy.get('#bankAccountNumber').click()

    cy.get('[role="option"]').first().click()
    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();




  })
  it('Novi Kredit nema bankAccountNumber', () => {


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

    cy.get('input[name="branchOffice"]').type('Beograd')

    cy.get("#kwiknimeUwU").click();




  })
  it('Novi Kredit nema branchOffice', () => {


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


    cy.get("#kwiknimeUwU").click();





  })
})