import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Provera firme spec', () => {
  beforeEach(() => {
    loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })

  it('Admin dodavanje firme', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="sifraDelatnosti"]').type('123456');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Admin dodavanje firme no naziv', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="sifraDelatnosti"]').type('123456');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission

  })

  it('Admin dodavanje firme no broj telefona', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="sifraDelatnosti"]').type('123456');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Admin dodavanje firme no faks', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="sifraDelatnosti"]').type('123456');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Admin dodavanje firme', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="sifraDelatnosti"]').type('123456');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Admin dodavanje firme  no maticni', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="sifraDelatnosti"]').type('123456');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Admin dodavanje firme no sifradelatnost', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="registarskiBroj"]').type('123456789');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Admin dodavanje firme no registarskiBroj', () => {
    cy.visit('http://localhost:3000/listaFirmi');

    cy.contains('button', 'Dodaj Firmu').click();

    cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="brojFaksa"]').type('987654321');
    cy.get('input[name="pib"]').type('1234567890123');
    cy.get('input[name="maticniBroj"]').type('123456789');
    cy.get('input[name="sifraDelatnosti"]').type('123456');

    cy.get('button').contains('Kreiraj').click();

    // Assert success message or any other behavior upon successful submission
  })

  it('Dodavanje pravnog racuna firmi', () => {
    cy.visit('http://localhost:3000/listaFirmi');
    cy.get('[data-testid="firma-1"]').click();
    cy.visit('http://localhost:3000/listaFirmi');
    cy.get('[data-testid="firma-1"]').click();
    cy.get("#dodaj").click();
    cy.get("#tip").click();
    cy.get("#pravni").click();
    cy.get("#kreiraj").click();
  })

  it('Dodavanje marznog racuna firmi', () => {
    cy.visit('http://localhost:3000/listaFirmi');
    cy.get('[data-testid="firma-1"]').click();
    cy.visit('http://localhost:3000/listaFirmi');
    cy.get('[data-testid="firma-1"]').click();
    cy.get("#dodaj").click();
    cy.get("#tip").click();
    cy.get("#marzni").click();
    cy.get("#kreiraj").click();
  })
})