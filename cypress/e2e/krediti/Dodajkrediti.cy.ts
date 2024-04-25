import { loginKorisnik, logout } from "../util/util"


describe('Trazi Krediti spec', () => {
  beforeEach(() => {
    loginKorisnik(cy);
  })
  after(() => {
    //logout(cy)
  })

  it('Novi kredit Radi', () => {

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
  })

  it('Novi Kredit NemaVrste kredita', () => {
    cy.wait(200)
    cy.visit('http://localhost:3000/listaKredita')
    cy.wait(200)
    cy.get("#TraziKredit").click()

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
  })

  it('Novi Kredit nema kolicine', () => {

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
  })

  it('Novi Kredit nema loanPurpose', () => {

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


  })
  it('Novi Kredit nema salary', () => {

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

  })
  it('Novi Kredit nema permanentEmployee', () => {

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

    cy.get('input[name="currentEmploymentPeriod"]').type('5 godina')
    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()
    cy.wait(1000)
    cy.get('[role="option"]').contains('444000000910000033').click()
    cy.get('input[name="branchOffice"]').type('Beograd')
    cy.wait(200)
    cy.get("#kwiknimeUwU").click();

    cy.wait(500)

  })
  it('Novi Kredit nema currentEmploymentPeriod', () => {

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

    cy.get('input[name="loanTerm"]').type('60')
    cy.get('#bankAccountNumber').click()
    cy.wait(1000)
    cy.get('[role="option"]').contains('444000000910000033').click()
    cy.get('input[name="branchOffice"]').type('Beograd')
    cy.wait(200)
    cy.get("#kwiknimeUwU").click();

    cy.wait(500)


  })
  it('Novi Kredit nema loanTerm', () => {

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

    cy.get('#bankAccountNumber').click()
    cy.wait(1000)
    cy.get('[role="option"]').contains('444000000910000033').click()
    cy.get('input[name="branchOffice"]').type('Beograd')
    cy.wait(200)
    cy.get("#kwiknimeUwU").click();

    cy.wait(500)


  })
  it('Novi Kredit nema bankAccountNumber', () => {

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

    cy.get('input[name="branchOffice"]').type('Beograd')
    cy.wait(200)
    cy.get("#kwiknimeUwU").click();

    cy.wait(500)


  })
  it('Novi Kredit nema branchOffice', () => {

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

    cy.wait(200)
    cy.get("#kwiknimeUwU").click();


    cy.wait(500)


  })
})