import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Porudzbine spec', () => {
    beforeEach(() => {
    })
    after(() => {
        //logout(cy)
    })

    it('Postavljanje porudzbine', () => {
        
        loginKorisnik(cy, 1);
        cy.visit('http://localhost:3000/akcije');
        cy.get('#pretraga').type("AAPL");
        cy.get('#search').click();
        cy.get('tbody tr:nth-child(1) #kupi').click();

        cy.get('#racunId').click();
        cy.get('[data-testid="racun-0"]').click();

        cy.get('input[name="kolicina"]').type('2');
        cy.get('input[name="limit"]').type('100');

        cy.get('input[type="checkbox"]').eq(0).check();
        cy.get('input[type="checkbox"]').eq(1).check();

        cy.get('button#kupi').click();
        logout(cy);


        loginKorisnik(cy, 2);
        cy.visit('http://localhost:3000/akcije');
        cy.get('#pretraga').type("AAPL");
        cy.get('#search').click();
        cy.get('tbody tr:nth-child(1) #kupi').click();

        cy.get('#racunId').click();
        cy.get('[data-testid="racun-0"]').click();

        cy.get('input[name="kolicina"]').type('2');
        cy.get('input[name="limit"]').type('100');

        cy.get('input[type="checkbox"]').eq(0).check();
        cy.get('input[type="checkbox"]').eq(1).check();

        cy.get('button#kupi').click();

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
        cy.get("#dodajKarticuDugme").click();
        cy.get("#ticker").type("AAPL");
        cy.get("#quantity").type("1");
        cy.get("#limit").type("100");
        cy.get("#action").type("BUY");
        cy.get("#create").click();

        logout(cy);

        loginKorisnik(cy, 1);

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
        cy.get("#dodajKarticuDugme").click();
        cy.get("#ticker").type("AAPL");
        cy.get("#quantity").type("1");
        cy.get("#limit").type("90");
        cy.get("#action").type("SELL");
        cy.get("#create").click();

        logout(cy);

        loginAdmin(cy);

        cy.visit("http://localhost:3000/listaPorudzbina");
        cy.get('[data-testid="orderaccept-0"]').click();
        cy.get('[data-testid="orderaccept-1"]').click();

        logout(cy);

        loginKorisnik(cy, 1);

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
    })

    it('Postavljanje porudzbine bez tickera', () => {
        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
        cy.get("#dodajKarticuDugme").click();
        cy.get("#quantity").type("1");
        cy.get("#limit").type("100");
        cy.get("#action").type("BUY");
        cy.get("#create").click();

        logout(cy);
    })

    it('Postavljanje porudzbine bez quantity', () => {
        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
        cy.get("#dodajKarticuDugme").click();
        cy.get("#ticker").type("AAPL");
        cy.get("#limit").type("100");
        cy.get("#action").type("BUY");
        cy.get("#create").click();

        logout(cy);
    })

    it('Postavljanje porudzbine bez actiona', () => {
        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
        cy.get("#dodajKarticuDugme").click();
        cy.get("#ticker").type("AAPL");
        cy.get("#quantity").type("1");
        cy.get("#limit").type("100");
        cy.get("#create").click();

        logout(cy);
    })

    it('Odbijanje porudzbine', () => {
        
        loginKorisnik(cy, 1);
        cy.visit('http://localhost:3000/akcije');
        cy.get('#pretraga').type("AAPL");
        cy.get('#search').click();
        cy.get('tbody tr:nth-child(1) #kupi').click();

        cy.get('#racunId').click();
        cy.get('[data-testid="racun-0"]').click();

        cy.get('input[name="kolicina"]').type('2');
        cy.get('input[name="limit"]').type('100');

        cy.get('input[type="checkbox"]').eq(0).check();
        cy.get('input[type="checkbox"]').eq(1).check();

        cy.get('button#kupi').click();

        cy.visit("http://localhost:3000/listaPorudzbinaKorisnici");
        cy.get("#dodajKarticuDugme").click();
        cy.get("#ticker").type("AAPL");
        cy.get("#quantity").type("1");
        cy.get("#limit").type("90");
        cy.get("#action").type("SELL");
        cy.get("#create").click();

        logout(cy);

        loginAdmin(cy);

        cy.visit("http://localhost:3000/listaPorudzbina");
        cy.get('[data-testid="orderaccept-1"]').click();

        logout(cy);
    })
})