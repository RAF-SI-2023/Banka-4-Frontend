import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Provera zaposlenog spec', () => {
  beforeEach(() => {
    loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('Admin dodavanje zaposlenog', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    cy.get('input[name="ime"]').type('Marko');
    cy.get('input[name="prezime"]').type('Markovic');
    cy.get('input[name="username"]').type('marko123');
    cy.get('input[name="jmbg"]').type('1234567890123');
    cy.get('input[name="password"]').type('lozinka123');
    cy.get('input[name="saltPassword"]').type('lozinka123');
    cy.get('input[name="date"]').type('2000-01-01');
    cy.get('#PolId').click();
    cy.contains('Musko').click({ force: true });
    cy.get('input[name="adresa"]').type('Adresa 123');
    cy.get('input[name="email"]').type('marko@example.com');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="pozicija"]').type('Radnik');
    cy.get('input[name="departman"]').type('IT');

    // Opciono: Označavanje dozvola
    cy.get('input[type="checkbox"]').check();

    cy.get('button').contains('Kreiraj').click();



  })

  it('Admin dodavanje zaposlenog no name', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });



    cy.get('input[name="prezime"]').type('Markovic');
    cy.get('input[name="username"]').type('marko123');
    cy.get('input[name="jmbg"]').type('1234567890123');
    cy.get('input[name="password"]').type('lozinka123');
    cy.get('input[name="saltPassword"]').type('lozinka123');
    cy.get('input[name="date"]').type('2000-01-01');
    cy.get('#PolId').click();
    cy.contains('Musko').click({ force: true });
    cy.get('input[name="adresa"]').type('Adresa 123');
    cy.get('input[name="email"]').type('marko@example.com');
    cy.get('input[name="brojTelefona"]').type('123456789');
    cy.get('input[name="pozicija"]').type('Radnik');
    cy.get('input[name="departman"]').type('IT');

    // Opciono: Označavanje dozvola
    cy.get('input[type="checkbox"]').check();

    cy.get('button').contains('Kreiraj').click();




  })

  it('Admin dodavanje zaposlenog no suername', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no username', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#lista-zaposlenih-tab').click();


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');

      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no jmbg', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');

      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no password', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');

      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no datum', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data no date', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');

      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no pol', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data no Pol', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');

      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no adresa', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data no adresa', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');

      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no email', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');

      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no pozicija', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');

      cy.get('input[name="pozicija"]').type('Radnik');
      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog no department', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data no radnik', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');

      cy.get('input[name="departman"]').type('IT');

      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })

  it('Admin dodavanje zaposlenog', () => {



    cy.visit('http://localhost:3000/listaZaposlenih');




    cy.get('#dodaj-zaposlenog-tab').click({ force: true });


    it('should submit form with valid data', () => {

      cy.get('input[name="ime"]').type('Marko');
      cy.get('input[name="prezime"]').type('Markovic');
      cy.get('input[name="username"]').type('marko123');
      cy.get('input[name="jmbg"]').type('1234567890123');
      cy.get('input[name="password"]').type('lozinka123');
      cy.get('input[name="saltPassword"]').type('lozinka123');
      cy.get('input[name="date"]').type('2000-01-01');
      cy.get('select[name="Pol"]').select('Musko');
      cy.get('input[name="adresa"]').type('Adresa 123');
      cy.get('input[name="email"]').type('marko@example.com');
      cy.get('input[name="brojTelefona"]').type('123456789');
      cy.get('input[name="pozicija"]').type('Radnik');


      // Opciono: Označavanje dozvola
      cy.get('input[type="checkbox"]').check();

      cy.get('button').contains('Kreiraj').click();


    });

  })
})



