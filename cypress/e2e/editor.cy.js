describe('Site Editor', () => {
  beforeEach(() => {
    // Se connecter avant chaque test
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should create a new site', () => {
    cy.get('[data-testid="new-site-button"]').click();
    cy.get('[data-testid="template-selector"]').should('be.visible');
    cy.get('[data-testid="business-template"]').click();
    cy.get('[data-testid="use-template-button"]').click();
    cy.url().should('include', '/editor');
  });

  it('should add a new section', () => {
    cy.visit('/editor/123');
    cy.get('[data-testid="add-section-button"]').click();
    cy.get('[data-testid="section-hero"]').click();
    cy.get('[data-testid="editor-canvas"]').children().should('have.length.gt', 0);
  });

  it('should edit section content', () => {
    cy.visit('/editor/123');
    cy.get('[data-testid="section-content"]').first().click();
    cy.get('[data-testid="edit-title-input"]').clear().type('New Title');
    cy.get('[data-testid="save-button"]').click();
    cy.get('[data-testid="section-content"]').first().should('contain', 'New Title');
  });

  it('should reorder sections', () => {
    cy.visit('/editor/123');
    cy.get('[data-testid="section-item"]').first().as('firstSection');
    cy.get('[data-testid="section-item"]').last().as('lastSection');
    
    // Drag and drop simulation
    cy.get('@firstSection')
      .move({ to: '@lastSection' });
    
    cy.get('[data-testid="save-button"]').click();
  });

  it('should delete a section', () => {
    cy.visit('/editor/123');
    const initialCount = cy.get('[data-testid="section-item"]').length;
    cy.get('[data-testid="delete-section-button"]').first().click();
    cy.get('[data-testid="confirm-delete-button"]').click();
    cy.get('[data-testid="section-item"]').should('have.length', initialCount - 1);
  });

  it('should preview the site', () => {
    cy.visit('/editor/123');
    cy.get('[data-testid="preview-button"]').click();
    cy.get('[data-testid="preview-mode"]').should('be.visible');
    cy.get('[data-testid="exit-preview-button"]').click();
    cy.get('[data-testid="preview-mode"]').should('not.exist');
  });

  it('should publish the site', () => {
    cy.visit('/editor/123');
    cy.get('[data-testid="publish-button"]').click();
    cy.get('[data-testid="publish-modal"]').should('be.visible');
    cy.get('[data-testid="confirm-publish-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
