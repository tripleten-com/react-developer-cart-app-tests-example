describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open cart page by default', function() {
    cy.contains('Shopping cart');
  });

  it('should open delivery page after continue button click', function() {
    cy.get('button').contains('Continue to shipping').click();
    cy.contains('Shipping');
  });

  it('should open agreement page after continue button click', function() {
    cy.contains('Standard shipping').click();
    cy.get('button').contains('Continue to confirm').click();
    cy.contains('Confirm order');
  });
});
