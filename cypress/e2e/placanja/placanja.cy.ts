import { loginKorisnik, logout } from "../util/util"
import { novoPlacanje, prenos, primaociPlacanja } from "./util";

describe('Placanja spec', () => {
  beforeEach(() => {
    loginKorisnik(cy);
  })

  it('Prenos dobri podaci', () => {
    prenos(cy)
    cy.get("#iznos").type("1")
    cy.get("#submitbuttontransferform").click()
    cy.visit('http://localhost:3000/verifikacija')
    cy.get("button").last().click()
    cy.get("input").last().invoke('val').then((value: any) => {
      if (!value) {
        return;
      }
      cy.visit('http://localhost:3000/placanja');

      cy.get("input").last().type(value.toString());

      cy.get("button").last().click()

      //cy.get(".swal2-title").should('have.text', 'Uspeh');
    });
  })

  it('Prenos los iznos', () => {
    prenos(cy)
    cy.get("#submitbuttontransferform").click()
    cy.get('#iznos')
      .parent()
      .parent()
      .children().last()
      .should('have.text', 'Morate uneti iznos.');
  })

  it('Prenos los otp', () => {
    prenos(cy)
    cy.get("#iznos").type("1")
    cy.get("#submitbuttontransferform").click()
    cy.visit('http://localhost:3000/verifikacija')
    cy.get("button").last().click()
    cy.get("input").last().invoke('val').then((value: any) => {
      if (!value) {
        return;
      }
      cy.visit('http://localhost:3000/placanja');

      cy.get("input").last().type((value == "123456") ? "111111" : "123456");

      cy.get("button").last().click()

      // cy.get('#resultfromswal').should('have.text', 'Pogrešan kod');
    });
  })

  it('Novo placanje dobri podaci', () => {
    novoPlacanje(cy)
    cy.get("#iznos").type("1")
    cy.get("#racunPrimaoca").type("265000000810260304")
    cy.get("#pozivNaBroj").type("1")
    cy.get("#submitbuttonpaymentform").click()
    cy.visit('http://localhost:3000/verifikacija')
    cy.get("button").last().click()
    cy.get("input").last().invoke('val').then((value: any) => {
      if (!value) {
        return;
      }
      cy.visit('http://localhost:3000/placanja');

      cy.get("input").last().type(value.toString());

      cy.get("button").last().click()

      // cy.get(".swal2-title").should('have.text', 'Uspeh');
    });

  })

  it('Novo placanje los iznos', () => {
    novoPlacanje(cy)
    cy.get("#racunPrimaoca").type("265000000810260304")
    cy.get("#pozivNaBroj").type("1")
    cy.get("#submitbuttonpaymentform").click()
    cy.get('#iznos')
      .parent()
      .parent()
      .children().last()
      .should('have.text', 'Morate uneti iznos.');
  })

  it('Novo placanje los racun', () => {
    novoPlacanje(cy)
    cy.get("#iznos").type("1")
    cy.get("#racunPrimaoca").type("26500000081026030")
    cy.get("#pozivNaBroj").type("1")
    cy.get("#submitbuttonpaymentform").click()
    cy.get('#racunPrimaoca')
      .parent()
      .parent()
      .children().last()
      .should('have.text', 'Račun primaoca mora imati tačno 18 cifara.');
  })

  it('Novo placanje los otp', () => {
    novoPlacanje(cy)
    cy.get("#iznos").type("1")
    cy.get("#racunPrimaoca").type("265000000810260304")
    cy.get("#pozivNaBroj").type("1")
    cy.get("#submitbuttonpaymentform").click()
    cy.visit('http://localhost:3000/verifikacija')
    cy.get("button").last().click()

    cy.get("input").last().invoke('val').then((value: any) => {
      if (!value) {
        return;
      }
      cy.visit('http://localhost:3000/placanja');

      cy.get("input").last().type((value == "123456") ? "111111" : "123456");

      cy.get("button").last().click()

      // cy.get('#resultfromswal').should('have.text', 'Pogrešan kod');
    });
  })

  it('Rad sa primaocima', () => {
    primaociPlacanja(cy)

    // Dodaj primaoca
    let initialRowCount: any;
    cy.get('#root > div > div.MuiBox-root.css-0')
      .find('table')
      .find('tbody')
      .children('tr')
      .then(rows => {
        if (rows.length === 1 && rows.eq(0).find('td').length === 1) {
          initialRowCount = 0;
        } else {
          initialRowCount = rows.length;
        }

        cy.get("#dugmeDodajPrimaoca").click();
        cy.get("#nazivPrimaoca").type("Najdzel" + (initialRowCount + 1));
        cy.get("#brojRacunaPrimaoca").type("265000000810260304");
        cy.get(".swal2-actions").children().get("button.swal2-confirm.swal2-styled").click();

        cy.reload()
        primaociPlacanja(cy);

        /*cy.get('#root > div > div.MuiBox-root.css-0')
          .find('table')
          .find('tbody')
          .children('tr')
          .should(rows => {
            expect(rows.length).to.eq(initialRowCount + 1);
          });*/

        // Editujem 0tog
        cy.get("#primalacEdit0").click();
        cy.get("#brojRacunaPrimaoca").clear();
        cy.get("#brojRacunaPrimaoca").type("265000000810260305");
        cy.get(".swal2-actions").children().get("button.swal2-confirm.swal2-styled").click();

        cy.get('#root > div > div.MuiBox-root.css-0')
          .find('table')
          .find('tbody')
          .children('tr').first()
          .children('td').eq(0)
          .should('have.text', '265000000810260305');

        cy.reload()
        primaociPlacanja(cy);

        for (let i = 0; i <= initialRowCount; i++) {
          cy.get("#primalacDelete0").click();
        }

        cy.get('#root > div > div.MuiBox-root.css-0')
          .find('table')
          .find('tbody')
          .children('tr')
          .should(rows => {
            expect(rows.length).to.eq(1);
          });
      });
  })
})