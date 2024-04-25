import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Provera firme spec', () => {
  beforeEach(() => {
    loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })
  
  it('Admin dodavanje firme', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

   
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })

  it('Admin dodavanje firme no naziv', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })
 
  it('Admin dodavanje firme no broj telefona', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })

  it('Admin dodavanje firme no faks', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })

  it('Admin dodavanje firme', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })

  it('Admin dodavanje firme  no maticni', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })

  it('Admin dodavanje firme no sifradelatnost', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="registarskiBroj"]').type('123456789');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })

  it('Admin dodavanje firme no registarskiBroj', () => {
   
    cy.wait(2000);

    cy.visit('http://localhost:3000/listaFirmi');
    cy.wait(2000);

  

    cy.contains('button', 'Dodaj Firmu').click();
    cy.wait(2000);

    
        cy.get('input[name="nazivPreduzeca"]').type('TribalCamping');
        cy.get('input[name="brojTelefona"]').type('123456789');
        cy.get('input[name="brojFaksa"]').type('987654321');
        cy.get('input[name="pib"]').type('1234567890123');
        cy.get('input[name="maticniBroj"]').type('123456789');
        cy.get('input[name="sifraDelatnosti"]').type('123456');
    
        cy.get('button').contains('Kreiraj').click();
    
        // Assert success message or any other behavior upon successful submission
        cy.wait(2000);
      
  })


})