/// <reference types="Cypress" />



describe('navigating the page', () => {

  it('should load to today`s view', () => {
    cy.clock(new Date(2000, 10, 20).getTime());
    cy.visit('/').location('pathname').should('equal', '/2000-11-20');
  });

});

describe('during leap years', () => {

  it('should work on Feb 28', () => {
    cy.clock(new Date(2020, 1, 28).getTime());
    cy.visit('/').location('pathname').should('equal', '/2020-02-28');
  });

  it('should work on Feb 29', () => {
    cy.clock(new Date(2020, 1, 29).getTime());
    cy.visit('/').location('pathname').should('equal', '/2020-02-29');
  });

  it('should work on Mar 1', () => {
    cy.clock(new Date(2020, 1, 30).getTime());
    cy.visit('/').location('pathname').should('equal', '/2020-03-01');
  });

});

describe('outside leap years', () => {

  it('should work on Feb 28', () => {
    cy.clock(new Date(2017, 1, 28).getTime());
    cy.visit('/').location('pathname').should('equal', '/2017-02-28');
  });

  it('should work on Mar 1', () => {
    cy.clock(new Date(2017, 1, 29).getTime());
    cy.visit('/').location('pathname').should('equal', '/2017-03-01');
  });

  it('should work on Mar 2', () => {
    cy.clock(new Date(2017, 1, 30).getTime());
    cy.visit('/').location('pathname').should('equal', '/2017-03-02');
  });


});
