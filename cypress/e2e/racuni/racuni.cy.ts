import { loginAdmin } from "../util/util"

describe('Provera racuna', () => {
  beforeEach(() => {
    loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('pravi racun Tekuci', () => {
    cy.get('table tbody tr:first-child td:first-child').click();

    cy.contains('button', "Dodaj racun").click();

    cy.get('#mui-component-select-Tip').click();
    cy.get('[role="option"]').contains('Tekuci').click()

    cy.get('#mui-component-select-Vrsta').click();
    cy.get('[role="option"]').contains('Studentski').click()

    cy.contains('button', "Pretraga Korisnika").click();

    cy.contains('button', "Kreiraj").click();
  })

  it('pravi racun Devizni', () => {
    cy.get('table tbody tr:first-child td:first-child').click();

    cy.contains('button', "Dodaj racun").click();

    cy.get('#mui-component-select-Tip').click();

    cy.get('[role="option"]').contains('Devizni').click()

    // cy.get('input[type="checkbox"]').check();

    cy.contains('button', "Pretraga Korisnika").click();

    cy.contains('button', "Kreiraj").click();
  })

  it('pravi racun Marzni', () => {
    cy.get('table tbody tr:first-child td:first-child').click();

    cy.contains('button', "Dodaj racun").click();

    cy.get('#mui-component-select-Tip').click();

    cy.get('[role="option"]').contains('Marzni').click()

    // cy.get('input[type="checkbox"]').check();

    cy.contains('button', "Pretraga Korisnika").click();

    cy.contains('button', "Kreiraj").click();
  })

  it('pravi racun Devizni bez checkboxova', () => {
    cy.get('table tbody tr:first-child td:first-child').click();

    cy.contains('button', "Dodaj racun").click();

    cy.get('#mui-component-select-Tip').click();

    cy.get('[role="option"]').contains('Devizni').click()

    cy.contains('button', "Pretraga Korisnika").click();

    cy.contains('button', "Kreiraj").click();
  })

  it('pravi racun Tekuci bez vrste', () => {
    cy.get('table tbody tr:first-child td:first-child').click();

    cy.contains('button', "Dodaj racun").click();

    cy.get('#mui-component-select-Tip').click();

    cy.get('[role="option"]').contains('Tekuci').click()

    cy.contains('button', "Pretraga Korisnika").click();

    cy.contains('button', "Kreiraj").click();
  })
})