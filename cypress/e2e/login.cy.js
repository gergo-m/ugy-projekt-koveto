describe('Login page test cases', () => {
  before(() => {
    cy.visit("/");
    cy.get("mat-toolbar > * a[routerlink='/login']").click();
    cy.get("input[type='email']").type("mgergo@example.com");
    cy.get("input[type='password']").type("mgergo123");
    cy.get("button[type='submit']").click();
    cy.get("mat-toolbar > * a[routerlink='/profile']").should("exist");
  });

  it('Create project', () => {
    cy.get("mat-toolbar > * a[routerlink='/projectlist']").click();
    cy.get("button[_ngcontent-ng-c405974663]").realClick();
    cy.get("input[id='mat-input-2']").type("Project One");
    cy.get("textarea[id='mat-input-3']").type("This is a project.");
    cy.get("input[id='mat-input-4']").type("2025-04-25");
    cy.get("input[id='mat-input-5']").type("2025-07-05");
    // cy.get("mat-select[id='mat-select-1']").click({ force: true }).get("mat-option").contains('John Doe').click({ force: true });
    // cy.get("button#add-project-btn").click();
  });
});
