import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Korisnici spec', () => {
  beforeEach(() => {
    loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('Admin dodavanje korisnika', () => {
    cy.visit("http://localhost:3000/listaKorisnika");

    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-04-21';
    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();
    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika greska no name', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const prezime = 'Tomic';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-04-21';
    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();

    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika no surname', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-04-21';
    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();

    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika no jmbg', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const datumRodjenja = '2001-04-21';
    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();

    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika no date', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const jmbg = '2104001710106';

    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('#PolId').click();

    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika no pol', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-04-21';
    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);


    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika no adress', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-04-21';

    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();
    cy.contains('Musko').click({ force: true });

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })

  it('Admin dodavanje korisnika no email', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-04-21';
    const adresa = '123 Main St, City';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();
    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();


  })


  it('Admin dodavanje lose jmbg i esec', () => {
    cy.visit("http://localhost:3000/listaKorisnika");
    cy.get('#dodajKorisnikaDugme').click();


    const ime = 'Bogdan';
    const prezime = 'Tomic';
    const jmbg = '2104001710106';
    const datumRodjenja = '2001-05-22';
    const adresa = '123 Main St, City';
    const email = 'john.doe@example.com';
    const brojTelefona = '1234567890';

    cy.get('input[name="ime"]').type(ime);
    cy.get('input[name="prezime"]').type(prezime);
    cy.get('input[name="jmbg"]').type(jmbg);
    cy.get('input[name="date"]').type(datumRodjenja);
    cy.get('#PolId').click();
    cy.contains('Musko').click({ force: true });

    cy.get('input[name="adresa"]').type(adresa);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="brojTelefona"]').type(brojTelefona);

    cy.get('button').contains('Kreiraj').click();
  })
})