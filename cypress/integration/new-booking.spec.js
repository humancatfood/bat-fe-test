/// <reference types="Cypress" />



const today = new Date(1970, 0, 1);


describe('New Booking', () => {

  it('should *try* to load today`s bookings', () => {
    cy.clock(today.getTime());
    cy.visit('/');
    cy.contains('Sorry, no bookings available for the selected day');
  });

  it('should open and close the new booking panel', () => {
    cy.contains('Create New Booking').click();
    cy.url().should('include', 'new');
    cy.get('[data-cy="booking-form"]').should('exist');
    cy.get('[data-cy="booking-form__title"]').should('be', 'New Booking');

    cy.get('[data-cy="booking-form__cancel"]').click();
    cy.url().should('not.include', 'new');
    cy.get('[data-cy="booking-form"]').should('not.exist');
  });

  it('has a usable "new booking" form', () => {

    cy.visit('/');
    cy.contains('Create New Booking').click();

    cy.get('[data-cy="booking-form__input--first-name"]').as('first-name')
      .should('be.focused')
      .should('have.value', '')
      .type('Hans')
      .should('have.value', 'Hans')
      .tab();

    cy.get('[data-cy="booking-form__input--last-name"]').as('last-name')
      .should('be.focused')
      .type('Maulwurf')
      .should('have.value', 'Maulwurf')
      .tab();

    cy.get('[data-cy="booking-form__input--time"]').as('time')
      .should('be.focused')
      .type('00:00')
      .should('have.value', '00:00')
      .tab();

    cy.get('[data-cy="booking-form__input--party-size"]').as('party-size')
      .should('be.focused')
      .type('1')
      .should('have.value', '1')
      .tab();

    cy.get('[data-cy="booking-form__input--notes"]').as('notes')
      .should('be.focused')
      .type('nothing to say about Mr Maulwurf')
      .should('have.value', 'nothing to say about Mr Maulwurf');


    cy.get('[data-cy="booking-form__reset"]').click();

    cy.get('@first-name').should('have.value', '');
    cy.get('@last-name').should('have.value', '');
    cy.get('@time').should('have.value', '');
    cy.get('@party-size').should('have.value', '');
    cy.get('@notes').should('have.value', '');

  });

});
