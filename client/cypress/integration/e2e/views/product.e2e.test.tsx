describe('Product page', () => {
  beforeEach(() => {
    cy.visit('/products/131');
  });

  it('should display product name', () => {
    cy.get('[data-cy="title"]')
      .should('be.visible')
      .should('contain.text', 'chaton');
  });

  it('should display product description', () => {
    cy.get('[data-cy="description"]')
      .should('be.visible')
      .should('contain.text', 'NE PAS SUPPRIMER');
  });

  it('should display product price', () => {
    cy.get('[data-cy="price"]')
      .should('be.visible')
      .should('contain.text', '4000');
  });

  it('should display similar products', () => {
    cy.get('[data-cy="similar-products"]').should('be.visible');
  });

  it('should increment price', () => {
    cy.get('[data-cy="increment"]').click();
    cy.get('[data-cy="price"]')
      .should('contain.text', '8000')
  });
});

export {};
