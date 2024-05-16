import { loginKorisnik } from "../util/util";

describe("Menjacnica spec", () => {
  beforeEach(() => {
    loginKorisnik(cy);
  });
  after(() => { });
  it("Menjacnica main page", () => {

    cy.visit("http://localhost:3000/menjacnica");

    cy.get("#iznosTextField").type("1");
    cy.get("#saRacunaTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#naRacunTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();

    cy.get("#potvrdiButton").click();
  });

  it("Menjacnica greska bez unosa textfield", () => {

    cy.visit("http://localhost:3000/menjacnica");

    cy.get("#saRacunaTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#naRacunTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();

  });

  it("Menjacnica greska bez prvog racuna", () => {

    cy.visit("http://localhost:3000/menjacnica");

    cy.get("#iznosTextField").type("1");
    cy.get("#naRacunTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();

  });

  it("Menjacnica greska bez drugog racuna", () => {

    cy.visit("http://localhost:3000/menjacnica");

    cy.get("#iznosTextField").type("1");
    cy.get("#saRacunaTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#nastaviButton").click();

  });

  it("Menjacnica unet tekst kao broj", () => {

    cy.visit("http://localhost:3000/menjacnica");

    cy.get("#iznosTextField").type("Varam ti zenu");
    cy.get("#saRacunaTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#naRacunTextField").click();

    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();

  });

});
