import { loginAdmin, loginKorisnik2, logout } from "../util/util"

describe('Kartice spec', () => {
    beforeEach(() => {

        //Dodaj kartice
        loginAdmin(cy);
        cy.wait(200);
        cy.get('tbody > tr').first().click();
        cy.wait(2000);

        var first18Chars = "";
        cy.get('#RacuniTabela').should('exist').then(() => {

            cy.get('#RacuniTabela tr:first-child').invoke('text').then((text) => {
                // text sadrži vrednost iz prve kolone prvog reda
                // ovde možeš izvršiti dalje provere ili akcije sa ovom vrednošću
                first18Chars = text.substring(0, 18);
                cy.log('Prvih 18 karaktera teksta:', first18Chars);
            });

        });

        cy.wait(200);

        cy.visit('http://localhost:3000/kartice');
        cy.wait(1000);

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

                cy.wait(1000);
                cy.visit('http://localhost:3000/kartice');
                cy.get("#dodajKarticuDugme").click();
                cy.get("#brojRacunaInputt").type(first18Chars);
                cy.get("#buttonKreiraj").click();
                cy.wait(1000);
                logout(cy);
                cy.wait(2000);

            });
    })
    it('Rad sa karticama blokiraj korisnik', () => {

        //Deo za dodavanje

        loginKorisnik2(cy);
        cy.wait(1000);
        cy.visit('http://localhost:3000/kartice');
        cy.wait(1000);

        cy.get('tbody > tr').first().click();
        cy.wait(2000);
        cy.contains('button', 'Blokiraj').click();
        cy.wait(1000);
    })

    it('Rad sa karticama blokiraj admin', () => {

        //Deo za dodavanje

        loginAdmin(cy);
        cy.wait(2000);
        cy.visit('http://localhost:3000/kartice');
        cy.wait(1000);

        cy.get('tbody > tr').first().click();
        cy.wait(2000);
        cy.contains('button', 'Blokiraj').click();
        cy.wait(1000);
    })

    it('Rad sa karticama aktiviraj deaktiviraj', () => {

        //Deo za dodavanje

        loginAdmin(cy);
        cy.wait(2000);
        cy.visit('http://localhost:3000/kartice');
        cy.wait(1000);

        cy.get('tbody > tr').first().click();
        cy.wait(2000);
        cy.contains('button', 'Deaktiviraj').click();
        cy.wait(1000);
        cy.contains('button', 'OK').click();
        cy.wait(1000);
        cy.contains('button', 'Aktiviraj').click();
        cy.wait(1000);
    })
})
