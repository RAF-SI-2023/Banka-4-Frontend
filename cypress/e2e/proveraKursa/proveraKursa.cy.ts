import { loginKorisnik, logout } from "../util/util"

describe('Provera kursa spec', () => {
  beforeEach(() => {
    loginKorisnik(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('Unos cifre i promena valute', () => {
    cy.get("#conversionRateTf").type("123")
    cy.get("#conversionCurrencySelectFrom").click()
    cy.get("#rateCurrencyItemFromBRL").click()
    cy.get("#conversionCurrencySelectTo").click()

    cy.get("#rateCurrencyItemToHKD").click()
    cy.get("#rateValue").invoke('text').then((text) => {
      const rate = parseFloat(text);
      expect(rate).to.be.gt(0);
    });

  })
  it('Testiranje inputa na slovnim karakterima', () => {
    cy.get("#conversionRateTf").type("abc!@#");
    cy.get("#conversionCurrencySelectFrom").click();
    cy.get("#rateCurrencyItemFromBRL").click();
    cy.get("#conversionCurrencySelectTo").click();
    cy.get("#rateCurrencyItemToHKD").click();
    cy.get("#rateValue").invoke('text').then((text) => {
      const rate = parseFloat(text);
      if (!isNaN(rate)) {
        expect(rate).to.be.eq(0);
      } else {
        expect(text.trim()).to.be.empty;
      }
    });

  });

})