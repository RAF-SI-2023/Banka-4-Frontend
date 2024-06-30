import { loginAdmin, loginKorisnik, logout } from "../util/util"

describe('Kartice spec', () => {
    beforeEach(() => {

        //Dodaj kartice
        loginAdmin(cy);

        cy.visit("http://localhost:3000/listaKorisnika");
        cy.get('tbody > tr').first().click();


        var first18Chars = "";
        cy.get('#RacuniTabela').should('exist').then(() => {

            cy.get('#RacuniTabela tr:first-child').invoke('text').then((text) => {
                // text sadrži vrednost iz prve kolone prvog reda
                // ovde možeš izvršiti dalje provere ili akcije sa ovom vrednošću
                first18Chars = text.substring(0, 18);
                cy.log('Prvih 18 karaktera teksta:', first18Chars);
            });

        });



        cy.visit('http://localhost:3000/kartice');


        cy.get('table')
            .find('tbody')
            .children('tr')
            .then(rows => {
                let initialRowCountUser;
                if (rows.length === 1 && rows.eq(0).find('td').length === 1) {
                    initialRowCountUser = 0;
                } else {
                    initialRowCountUser = rows.length;
                }


                cy.visit('http://localhost:3000/kartice');
                cy.get("#dodajKarticuDugme").click();
                cy.get("#brojRacunaInputt").type(first18Chars);
                cy.get("#buttonKreiraj").click();

                logout(cy);


            });
    })
    it('Rad sa karticama blokiraj korisnik', () => {

        //Deo za dodavanje

        loginKorisnik(cy, 2);

        cy.visit('http://localhost:3000/kartice');

        cy.get('tbody > tr').children().should("have.length.above", 3)
        cy.get('tbody > tr').first().click();

        cy.contains('button', 'Blokiraj').click();

    })

    it('Rad sa karticama blokiraj admin', () => {

        //Deo za dodavanje

        loginAdmin(cy);

        cy.visit('http://localhost:3000/kartice');

        cy.get('tbody > tr').children().should("have.length.above", 3)

        cy.get('tbody > tr').first().click();

        cy.contains('button', 'Blokiraj').click();

    })

    it('Rad sa karticama aktiviraj deaktiviraj', () => {

        //Deo za dodavanje

        loginAdmin(cy);

        cy.visit('http://localhost:3000/kartice');

        cy.get('tbody > tr').children().should("have.length.above", 3)

        cy.get('tbody > tr').first().click();

        cy.contains('button', 'Deaktiviraj').click();

        cy.contains('button', 'Aktiviraj').click();

    })
})
