/// <reference types="Cypress" />



const today = new Date(1970, 0, 1);


describe('navigating the page', () => {

  it('should *try* to load today`s bookings', () => {
    cy.clock(today.getTime());
    cy.visit('/');
    cy.contains('Sorry, no bookings available for the selected day');
  });

  it('should open the new booking panel', () => {
    cy.contains('Create New Booking').click();
    cy.url().should('include', 'new');

    cy.get('.details-view');
    cy.get('input[name=firstName]').should('be.focused');
  });

});
