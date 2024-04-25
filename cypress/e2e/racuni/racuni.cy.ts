import { loginAdmin } from "../util/util"

describe('Provera racuna', () => {
  beforeEach(() => {
    loginAdmin(cy);
  })
  after(() => {
    //logout(cy)
  })
  it('pravi racun Tekuci', () => {

    cy.wait(2000)
    cy.get('table tbody tr:first-child td:first-child').click();


        cy.wait(2000)
        cy.contains('button', "Dodaj racun").click();


        cy.wait(2000)

        cy.get('#mui-component-select-Tip').click();

        cy.get('[role="option"]').contains('Tekuci').click()


        cy.wait(2000)

        cy.get('#mui-component-select-Vrsta').click();

        cy.get('[role="option"]').contains('Studentski').click()

        
        cy.contains('button', "Pretraga Korisnika").click();

        cy.wait(2000)
        
        cy.contains('button', "Kreiraj").click();

    })


    it('pravi racun Devizni', () => {

      cy.wait(2000)
      cy.get('table tbody tr:first-child td:first-child').click();
  
  
          cy.wait(2000)
          cy.contains('button', "Dodaj racun").click();
  
  
          cy.wait(2000)
  
          cy.get('#mui-component-select-Tip').click();
  
          cy.get('[role="option"]').contains('Devizni').click()
  
  
          cy.wait(2000)

          cy.get('input[type="checkbox"]').check();
  
          
          cy.contains('button', "Pretraga Korisnika").click();
  
          cy.wait(2000)
          
          cy.contains('button', "Kreiraj").click();
  
      })


      it('pravi racun Devizni bez checkboxova', () => {

        cy.wait(2000)
        cy.get('table tbody tr:first-child td:first-child').click();
    
    
            cy.wait(2000)
            cy.contains('button', "Dodaj racun").click();
    
    
            cy.wait(2000)
    
            cy.get('#mui-component-select-Tip').click();
    
            cy.get('[role="option"]').contains('Devizni').click()
            
            cy.contains('button', "Pretraga Korisnika").click();
    
            cy.wait(2000)
            
            cy.contains('button', "Kreiraj").click();
    
        })


        it('pravi racun Tekuci bez vrste', () => {

          cy.wait(2000)
          cy.get('table tbody tr:first-child td:first-child').click();
      
      
              cy.wait(2000)
              cy.contains('button', "Dodaj racun").click();
      
      
              cy.wait(2000)
      
              cy.get('#mui-component-select-Tip').click();
      
              cy.get('[role="option"]').contains('Tekuci').click()
      
              
              cy.contains('button', "Pretraga Korisnika").click();
      
              cy.wait(2000)
              
              cy.contains('button', "Kreiraj").click();
      
          })
})