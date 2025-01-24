describe('Blog Management', () => {
  beforeEach(() => {
    // Se connecter avant chaque test
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should create a new blog post', () => {
    cy.get('[data-testid="new-post-button"]').click();
    cy.get('[data-testid="post-title"]').type('Test Blog Post');
    cy.get('.ql-editor').type('This is a test blog post content');
    cy.get('[data-testid="save-draft-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should edit an existing blog post', () => {
    cy.visit('/blog/posts');
    cy.get('[data-testid="post-item"]').first().click();
    cy.get('[data-testid="post-title"]').clear().type('Updated Blog Post');
    cy.get('.ql-editor').clear().type('Updated content');
    cy.get('[data-testid="save-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should add categories and tags', () => {
    cy.visit('/blog/posts/new');
    cy.get('[data-testid="category-input"]').type('Technology{enter}');
    cy.get('[data-testid="tag-input"]').type('React{enter}');
    cy.get('[data-testid="categories-list"]').should('contain', 'Technology');
    cy.get('[data-testid="tags-list"]').should('contain', 'React');
  });

  it('should preview blog post', () => {
    cy.visit('/blog/posts/edit/123');
    cy.get('[data-testid="preview-button"]').click();
    cy.get('[data-testid="preview-mode"]').should('be.visible');
    cy.get('[data-testid="post-preview-title"]').should('be.visible');
    cy.get('[data-testid="post-preview-content"]').should('be.visible');
  });

  it('should publish blog post', () => {
    cy.visit('/blog/posts/edit/123');
    cy.get('[data-testid="publish-button"]').click();
    cy.get('[data-testid="publish-modal"]').should('be.visible');
    cy.get('[data-testid="confirm-publish-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
    cy.get('[data-testid="post-status"]').should('contain', 'Published');
  });

  it('should manage comments', () => {
    cy.visit('/blog/posts/123');
    cy.get('[data-testid="comment-input"]').type('This is a test comment');
    cy.get('[data-testid="submit-comment"]').click();
    cy.get('[data-testid="comments-list"]').should('contain', 'This is a test comment');
    
    // Supprimer un commentaire
    cy.get('[data-testid="delete-comment"]').first().click();
    cy.get('[data-testid="confirm-delete"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should filter posts by category', () => {
    cy.visit('/blog/posts');
    cy.get('[data-testid="category-filter"]').click();
    cy.get('[data-testid="category-option"]').contains('Technology').click();
    cy.get('[data-testid="post-item"]').should('have.length.gt', 0);
  });

  it('should search posts', () => {
    cy.visit('/blog/posts');
    cy.get('[data-testid="search-input"]').type('test{enter}');
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="post-item"]').should('have.length.gt', 0);
  });

  it('should handle draft autosave', () => {
    cy.visit('/blog/posts/new');
    cy.get('[data-testid="post-title"]').type('Autosave Test');
    cy.get('.ql-editor').type('This content should be autosaved');
    
    // Attendre l'autosave
    cy.wait(2000);
    
    // Recharger la page
    cy.reload();
    
    // Vérifier que le contenu a été sauvegardé
    cy.get('[data-testid="post-title"]').should('have.value', 'Autosave Test');
    cy.get('.ql-editor').should('contain', 'This content should be autosaved');
  });
});
