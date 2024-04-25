import { loginKorisnik } from "../util/util";

describe("Menjacnica spec", () => {
  beforeEach(() => {
    loginKorisnik(cy);
  });
  after(() => { });
  it("Menjacnica main page", () => {
    cy.wait(200);
    cy.visit("http://localhost:3000/menjacnica");
    cy.wait(200);
    cy.get("#iznosTextField").type("1");
    cy.get("#saRacunaTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#naRacunTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();
    cy.wait(200);
    cy.get("#potvrdiButton").click();
  });

  it("Menjacnica greska bez unosa textfield", () => {
    cy.wait(200);
    cy.visit("http://localhost:3000/menjacnica");
    cy.wait(200);
    cy.get("#saRacunaTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#naRacunTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();
    cy.wait(1000);
  });

  it("Menjacnica greska bez prvog racuna", () => {
    cy.wait(200);
    cy.visit("http://localhost:3000/menjacnica");
    cy.wait(200);
    cy.get("#iznosTextField").type("1");
    cy.get("#naRacunTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();
    cy.wait(1000);
  });

  it("Menjacnica greska bez drugog racuna", () => {
    cy.wait(200);
    cy.visit("http://localhost:3000/menjacnica");
    cy.wait(200);
    cy.get("#iznosTextField").type("1");
    cy.get("#saRacunaTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#nastaviButton").click();
    cy.wait(1000);
  });

  it("Menjacnica unet tekst kao broj", () => {
    cy.wait(200);
    cy.visit("http://localhost:3000/menjacnica");
    cy.wait(200);
    cy.get("#iznosTextField").type("Varam ti zenu");
    cy.get("#saRacunaTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();

    cy.get("#naRacunTextField").click();
    cy.wait(1000);
    cy.get('[role="option"]').contains("444000000910000033").click();
    cy.get("#nastaviButton").click();
    cy.wait(1000);
  });

});
