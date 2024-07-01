import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('OTC unutar banke spec', () => {
    beforeEach(() => {
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
        logout(cy);
    })
    after(() => {
    })

    it('OTC ispuni ponudu', () => {
        loginKorisnik(cy, 1);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#dodajponudu").click();
        cy.get("#ticker").click();
        cy.get('[data-testid="ticker-0"]').click();
        cy.get("#amount").type("1");
        cy.get("#submit").click();
        cy.contains("OK").click();

        logout(cy);

        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#postaviponudu-0").click();
        cy.get("#price").type("10");
        cy.get("#ponudi").click();
        cy.contains("OK").click();

        logout(cy);

        loginKorisnik(cy, 1);
        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#mojeponude").click();
        cy.get("#prihvati-0").click();
        cy.get("#opis").type("Jaje");
        cy.get("#accept").click();

        logout(cy);

        loginAdmin(cy);
        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#bankaponude").click();
        cy.get("#prihvati-0").click();
        cy.get("#opis").type("Jaje");
        cy.get("#accept").click();

        logout(cy);


        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#obradjeneponude").click();

        logout(cy);
    })

    it('OTC odbij ponudu korisnik', () => {
        loginKorisnik(cy, 1);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#dodajponudu").click();
        cy.get("#ticker").click();
        cy.get('[data-testid="ticker-0"]').click();
        cy.get("#amount").type("1");
        cy.get("#submit").click();
        cy.contains("OK").click();

        logout(cy);

        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#postaviponudu-0").click();
        cy.get("#price").type("10");
        cy.get("#ponudi").click();
        cy.contains("OK").click();

        logout(cy);

        loginKorisnik(cy, 1);
        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#mojeponude").click();
        cy.get("#odbij-0").click();
        cy.get("#razlog").type("Jaje");
        cy.get("#reject").click();

        logout(cy);
    })

    it('OTC odbij ponudu kao banka', () => {
        loginKorisnik(cy, 1);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#dodajponudu").click();
        cy.get("#ticker").click();
        cy.get('[data-testid="ticker-0"]').click();
        cy.get("#amount").type("1");
        cy.get("#submit").click();
        cy.contains("OK").click();

        logout(cy);

        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#postaviponudu-0").click();
        cy.get("#price").type("10");
        cy.get("#ponudi").click();
        cy.contains("OK").click();

        logout(cy);

        loginAdmin(cy);
        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#bankaponude").click();
        cy.get("#odbij-0").click();
        cy.get("#razlog").type("Jaje");
        cy.get("#reject").click();

        logout(cy);

        loginKorisnik(cy, 2);

        cy.visit("http://localhost:3000/otckorisnik");
        cy.get("#ponude").click();
        cy.get("#obradjeneponude").click();

        logout(cy);
    })
})