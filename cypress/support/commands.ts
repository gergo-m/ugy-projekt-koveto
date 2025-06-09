/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
/* declare global {
  namespace Cypress {
    interface Chainable { */
        /**
       * Selects an Angular Material Select option
       * @param selector CSS selector for mat-select
       * @param optionText Text content of desired mat-option
       * @example cy.matSelect('[formControlName="participants"]', 'John Doe')
       */
      // matSelect(selector: string, optionText: string): Chainable<void>;
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'cypress-real-events/support'

// cypress/support/commands.js
/* import { MatSelectHarness } from '@angular/material/select/testing';

Cypress.Commands.add('matSelect', (selector, optionText) => {
  return cy.get(selector).then(async ($select) => {
    // Initialize harness with proper selector
    const harness = await MatSelectHarness.with({ selector })();
    
    // Open the select programmatically
    await harness.open();
    
    // Get options from overlay container
    const options = await harness.getOptions({ text: optionText });
    
    if (options.length === 0) {
      throw new Error(`Option "${optionText}" not found`);
    }
    
    await options[0].click();
  });
}); */
