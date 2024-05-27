export function resetAndGo(cy: Cypress.cy) {

    cy.visit('http://localhost:3000/placanja')

}

export function novoPlacanje(cy: Cypress.cy) {
    resetAndGo(cy);
    cy.get("#dropdownMenuPlacanja").click()
    cy.get("#dropdownMenuPlacanja1").click()
}
export function prenos(cy: Cypress.cy) {
    resetAndGo(cy);
    cy.get("#dropdownMenuPlacanja").click()
    cy.get("#dropdownMenuPlacanja2").click()
}
export function primaociPlacanja(cy: Cypress.cy) {
    resetAndGo(cy);
    cy.get("#dropdownMenuPlacanja").click()
    cy.get("#dropdownMenuPlacanja3").click()
}
export function pregledPlacanja(cy: Cypress.cy) {
    resetAndGo(cy);
    cy.get("#dropdownMenuPlacanja").click()
    cy.get("#dropdownMenuPlacanja4").click()
}