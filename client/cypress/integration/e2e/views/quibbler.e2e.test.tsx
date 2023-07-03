describe('Not foud page', () => {
  beforeEach(() => {
    cy.visit('/quibbler');
  });

  it('should render the page', () => {
    cy.get('article').should('exist');
  });
});

export {}
