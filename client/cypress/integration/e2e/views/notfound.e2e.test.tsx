import { local_api_uri } from '../../../../src/constants';

describe('Not foud page', () => {
  beforeEach(() => {
    cy.visit('/not-found');
  });

  describe('Rendering', () => {
    it('should render the image', () => {
      cy.get('img').should('exist');
      cy.get('img').should(
        'have.attr',
        'src',
        '/static/media/404.d7c2060d85ca0935b438a9a247cb2f83.svg'
      );
    });

    it('should render the error', () => {
      cy.get('h1').should('exist');
      cy.get('h1').should('have.text', 'Mince ! Vous vous êtes perdus dans l’Allée des Embrumes');
    });

    it('should render the link', () => {
      cy.get('a').should('exist');
      cy.get('a').should('have.text', 'Revenir sur vos pas');
      cy.get('a').should('have.attr', 'href', '/');
    });
  });

  describe('Controls', () => {
    it('should redirect to the home page', () => {
      cy.get('a').click();
      cy.url().should('equal', `${local_api_uri}/`);
    });
  });
});
